import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import orderTimer from '@/helpers/orderTimer'
import {
  statusTag,
  deliveryIcon,
  getSourceIcon,
  paymentTypeIconMake,
} from './statuses'
import numberToPrice from '@/helpers/numberToPrice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Timer from './components/Timer'

export default function useColumns({ limit, currentPage, setSortby }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lateTimeData = useSelector((state) => state.lateTime)

  const handleOperatorAcceptedColor = (record) => {
    const ORDER_TIMER_FOR_ACCEPTED = Math.round(
      moment
        .duration(
          orderTimer(
            record?.operator_accepted_at,
            record?.finished_at?.length
              ? record?.finished_at
              : record?.status_notes?.find(
                  (status_note) =>
                    status_note?.status_id ===
                      import.meta.env.VITE_OPERATOR_CANCELED_STATUS_ID ||
                    status_note?.status_id ===
                      import.meta.env.VITE_SERVER_CANCELED_STATUS_ID
                )?.created_at,
            record?.future_time,
            record?.status_id,
            'operator_accepted_timer'
          )
        )
        .asMinutes()
    )

    if (
      record?.free_delevery_time > 0 &&
      ORDER_TIMER_FOR_ACCEPTED >= Number(record?.free_delevery_time)
    ) {
      return 'error'
    }

    return 'primary'
  }

  const columns = useMemo(
    () => [
      {
        title: '№',
        key: 'order-number',
        render: (_, index) => <>{(currentPage - 1) * limit + index + 1}</>,
      },
      {
        title: t('client_name'),
        key: 'name',
        render: (record) => (
          <div>
            <div className="record_client_name">{record?.client_name}</div>
            <a
              href={`tel:${record?.client_phone_number}`}
              className="text-info cursor-pointer block"
            >
              {record?.client_phone_number}
            </a>
          </div>
        ),
      },
      {
        title: t('order_id'),
        key: 'order_id',
        render: (record) => (
          <>
            <div
              className="record_order_id text-center"
              onClick={() => {
                // The code below does the same thing, but with status complete, you cant see and swipe to the details of order
                record?.status_id === 'e665273d-5415-4243-a329-aee410e39465'
                  ? navigate(`/home/orders/${record?.id}?status=completed`)
                  : navigate(`/home/orders/${record?.id}?redirect=true`)
              }}
            >
              {record?.external_order_id}
            </div>
          </>
        ),
      },
      {
        title: t('timer'),
        key: 'timer',
        sorter: true,
        onSort: (order) => {
          setSortby(() => {
            if (order === 'asc') {
              return 'created_at'
            } else if (order === 'desc') {
              return '-created_at'
            }
          })
        },
        render: (record) => {
          return (
            <div className="flex justify-center">
              <div className="w-36">
                <Timer record={record} />
                <div className="text-center text-xs mt-2">
                  {statusTag(record?.status_id, t)}
                </div>
              </div>
            </div>
          )
        },
      },

      {
        title: t('courier'),
        key: 'courier',
        render: (record) => (
          <div>
            {record?.courier.first_name
              ? `${record?.courier.first_name} ${record?.courier.last_name}`
              : '----'}
            <a
              href={`tel:${record?.courier.phone}`}
              className="text-info cursor-pointer block"
            >
              {record?.courier.phone}
            </a>
          </div>
        ),
      },
      {
        title: t('branch'),
        key: 'branch',
        render: (record) => (
          <div>
            {record?.steps[0]?.branch_name}
            <a href={`tel:${record?.steps[0].phone_number}`} className="block">
              {record?.steps[0]?.phone_number}
            </a>
          </div>
        ),
      },
      {
        title: t('operator_accepted_timer'),
        key: 'operator_accepted_timer',
        render: (record) => {
          return (
            <div className="flex justify-center">
              <div className="w-36">
                <Timer
                  record={record}
                  operatorTimer={true}
                  color={
                    lateTimeData?.free_delevery_for_delayed_order &&
                    handleOperatorAcceptedColor(record)
                  }
                />
              </div>
            </div>
          )
        },
      },
      {
        title: t('delivery_type'),
        key: 'delivery_type',
        render: (record) => (
          <div className="flex justify-center items-center flex-col">
            <div
              style={{
                width: 72,
                height: 72,
                border: '1px solid #EEEEEE',
                borderRadius: '50%',
              }}
              className="flex justify-center items-center"
            >
              {deliveryIcon(record?.delivery_type)}
            </div>
            <div className="text-center">
              {Math.round(record?.distance / 10) / 100} {t('km')}
            </div>
          </div>
        ),
      },
      {
        title: t('order_price'),
        key: 'price',
        sorter: true,
        onSort: (order) => {
          setSortby(() => {
            if (order === 'asc') {
              return 'the_number_of_orders'
            } else if (order === 'desc') {
              return '-order_amount'
            }
          })
        },
        render: (record) => (
          <div className="flex items-center justify-center flex-col">
            <div
              style={{
                width: 72,
                height: 72,
                backgroundColor:
                  record?.payment_type !== 'cash' && record?.paid
                    ? '#BBFBD0'
                    : 'transparent',
                border: '1px solid #EEEEEE',
                borderRadius: '50%',
              }}
              className="flex justify-center"
            >
              <img
                className={`w-full ${
                  record?.payment_type === 'cash'
                    ? 'object-cover'
                    : 'object-none'
                }`}
                src={paymentTypeIconMake(record?.payment_type)}
                alt={record?.payment_type}
              />
            </div>
            <div className="text-center">
              {record?.order_amount
                ? numberToPrice(
                    record?.order_amount +
                      (record?.is_delivery_free ? 0 : record?.delivery_price)
                  )
                : '----'}
            </div>
          </div>
        ),
      },
      {
        title: t('client_address'),
        key: 'client_address',
        render: (record) => <div className="w-44">{record?.to_address}</div>,
      },
      {
        title: t('source'),
        key: 'source',
        render: (record) => (
          <div className="flex justify-center">
            <img
              className="w-8"
              src={getSourceIcon(record?.source)}
              alt={record?.source}
            />
          </div>
        ),
      },
      {
        title: t('created_date'),
        key: 'created_at',
        render: (record) =>
          moment(record?.created_at).format('DD.MM.YYYY HH:mm'),
      },
    ],
    [
      t,
      limit,
      navigate,
      setSortby,
      currentPage,
      lateTimeData?.free_delevery_for_delayed_order,
    ]
  )

  return columns
}
