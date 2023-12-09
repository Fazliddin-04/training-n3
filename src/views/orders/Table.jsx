import { useState } from 'react'
import orderTimer from '@/helpers/orderTimer'
import moment from 'moment'
import { useSelector } from 'react-redux'
import useColumns from './useColumns'
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from '@/components/CTable'
import { useOrderList } from '@/services/orderService'

const limit = 10

function OrdersTable() {
  const filtersData = useSelector((state) => state.filters)
  const lateTimeData = useSelector((state) => state.lateTime)

  const [currentPage, setCurrentPage] = useState(1)
  const [sort_by, setSortby] = useState('')

  const { data, isLoading } = useOrderList({
    params: {
      branch_ids:
        filtersData?.branches?.length > 0
          ? String(filtersData?.branches?.map((el) => el?.value))
          : null,
      courier_id: filtersData?.courier_id?.value ?? '',
      status_ids:
        filtersData?.statuses?.length > 0
          ? String(filtersData?.statuses?.map((el) => el?.value))
          : filtersData?.tab,
      delivery_type: filtersData?.delivery_type?.value,
      payment_type: filtersData?.payment_method?.value ?? '',
      external_order_id: filtersData?.external_order_id,
      sort_by: sort_by,
      page: currentPage,
      start_date: filtersData?.dateRange?.start_date,
      end_date: filtersData?.dateRange?.end_date,
      customer_id: filtersData?.customer_id?.value,
    },
    props: {
      enabled: true,
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
      onError: (err) => console.log(err),
    },
  })

  const handleTableRowColor = (elm) => {
    const OPERATOR_ACCEPTED_AT = Math.round(
      moment
        .duration(
          orderTimer(
            elm?.operator_accepted_at,
            elm?.finished_at?.length
              ? elm.finished_at
              : elm?.status_notes?.find(
                  (status_note) =>
                    status_note?.status_id ===
                    'b5d1aa93-bccd-40bb-ae29-ea5a85a2b1d1'
                )?.created_at,
            elm?.future_time,
            elm?.status_id,
            'operator_accepted_timer'
          )
        )
        .asMinutes()
    )

    if (
      OPERATOR_ACCEPTED_AT >= lateTimeData?.time &&
      elm?.status_id !== import.meta.env.VITE_FUTURE_STATUS_ID
    )
      return lateTimeData?.color ? lateTimeData?.color : undefined

    return ''
  }

  let columns = useColumns({
    limit,
    setSortby,
    currentPage,
  })

  return (
    <CTable
      count={Math.ceil(data?.count / 10) || 1}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={12}
      loader={isLoading}
    >
      <CTableHead>
        <CTableHeadRow>
          {columns.map((elm) => (
            <CTableCell key={elm.key}>{elm.title}</CTableCell>
          ))}
        </CTableHeadRow>
      </CTableHead>
      <CTableBody
        loader={isLoading}
        columnsCount={12}
        dataLength={data?.orders?.length}
      >
        {!isLoading &&
          data?.orders?.map((order, index) => (
            <CTableRow
              key={order.id}
              style={{
                backgroundColor: handleTableRowColor(order),
              }}
            >
              {columns.map((col) => (
                <CTableCell
                  key={col.key + order.id}
                  className={col.key === 'branch' ? 'whitespace-nowrap' : ''}
                >
                  {col.render ? col.render(order, index) : order[col.dataIndex]}
                </CTableCell>
              ))}
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

export default OrdersTable
