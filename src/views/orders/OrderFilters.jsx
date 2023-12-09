import { useCallback } from 'react'
import RangePicker from '@/components/DateTimePicker/RangePicker'
import AsyncSelect from '@/components/Select/Async'
import Select, { customStyles } from '@/components/Select'
import { getBranches, getCouriers } from '@/services'
import { useDispatch, useSelector } from 'react-redux'
import { filterStatus, payment_types } from './statuses'
import { useTranslation } from 'react-i18next'
import customerService from '@/services/customer'
import moment from 'moment'
import { filterActions } from '@/store/filters/filters.slice'
import Search from '@/components/Search'

const dateFormat = "YYYY-MM-DD 05:00:00";

const OrderFilters = () => {
  const { t } = useTranslation()
  const {
    branches,
    external_order_id,
    statuses,
    dateRange,
    courier_id,
    customer_id,
    delivery_type,
    payment_method,
    is_open,
  } = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const loadCustomers = useCallback((input, cb) => {
    customerService
      .searchbyPhone({ page: 1, limit: 10, phone: input })
      .then((response) => {
        let aggregatorsRes = response?.customers?.map((customer) => ({
          label: `${customer.name} (${customer.phone})`,
          value: customer.id,
          phone: customer.phone,
        }))
        cb(aggregatorsRes)
      })
      .catch((error) => console.log(error))
  }, [])

  const loadBranches = useCallback((input, cb) => {
    getBranches({ page: 1, limit: 10, search: input })
      .then((response) => {
        let branches = response?.branches?.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }))
        cb(branches)
      })
      .catch((error) => console.log(error))
  }, [])

  const loadCouriers = useCallback((input, cb) => {
    getCouriers({ page: 1, limit: 10, search: input })
      .then((response) => {
        let couriers = response?.couriers?.map((courier) => ({
          label: `${courier.first_name} ${courier.last_name} (${courier.phone})`,
          value: courier.id,
        }))
        cb(couriers)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleRangeChange = useCallback(
    (e) => {
      if (e[0] === null) {
        const CURRENT_DAY = moment().format(dateFormat)
        const YESTERDAY = moment().subtract(1, 'd').format(dateFormat)
        const TOMORROW = moment().add(1, 'd').format(dateFormat)
        const CURRENT_HOUR = moment().hour()

        dispatch(
          filterActions.setDateRange({
            start_date: CURRENT_HOUR < 5 ? YESTERDAY : CURRENT_DAY,
            end_date: CURRENT_HOUR < 5 ? CURRENT_DAY : TOMORROW,
          })
        )
      } else {
        dispatch(
          filterActions.setDateRange({
            start_date: moment(e[0]).format(dateFormat),
            end_date: moment(e[1]).format(dateFormat),
          })
        )
      }
    },
    [dispatch]
  )

  const deliveryOptions = [
    {
      label: t('delivery'),
      value: 'delivery',
    },
    {
      label: t('pickup'),
      value: 'self-pickup',
    },
    {
      label: t('hall'),
      value: 'hall',
    },
    {
      label: t('external'),
      value: 'external',
    },
  ]

  return (
    <div
      style={{
        maxHeight: is_open ? '117px' : '0px',
        overflow: is_open ? 'visible' : 'hidden',
        transition: '150ms ease',
      }}
      className={is_open ? 'mt-2' : ''}
    >
      <div className="flex w-full justify-between">
        <AsyncSelect
          id="customer"
          className="w-1/4 mr-4"
          minWidth="none"
          defaultOptions
          cacheOptions
          isSearchable
          isClearable
          onChange={(elm) => dispatch(filterActions.setCustomerId(elm))}
          value={customer_id}
          loadOptions={loadCustomers}
          placeholder={t('search_phone_number')}
          styles={customStyles({
            control: (base) => ({
              ...base,
              minHeight: '2rem',
              height: '2rem',
              border: '1px solid #E5E9EB',
            }),
            indicatorSeparator: (base) => ({
              ...base,
              height: '1rem',
            }),
          })}
        />
        <AsyncSelect
          id="branch"
          className="w-1/4 mr-4"
          minWidth="none"
          defaultOptions
          cacheOptions
          isSearchable
          isMulti
          isClearable
          onChange={(elm) => {
            dispatch(filterActions.setBranches([...elm]))
          }}
          value={branches}
          loadOptions={loadBranches}
          placeholder={t('select_branch')}
          styles={customStyles({
            control: (base) => ({
              ...base,
              minHeight: '2rem',
              height: '2rem',
              border: '1px solid #E5E9EB',
            }),
            indicatorSeparator: (base) => ({
              ...base,
              height: '1rem',
            }),
            showClearIcons: true,
          })}
        />
        <AsyncSelect
          id="courier"
          className="w-1/4 mr-4"
          minWidth="none"
          defaultOptions
          cacheOptions
          isSearchable
          isClearable
          onChange={(elm) => {
            dispatch(filterActions.setCourierId(elm))
          }}
          value={courier_id}
          loadOptions={loadCouriers}
          placeholder={t('choose_courier')}
          styles={customStyles({
            control: (base) => ({
              ...base,
              minHeight: '2rem',
              height: '2rem',
              border: '1px solid #E5E9EB',
            }),
            indicatorSeparator: (base) => ({
              ...base,
              height: '1rem',
            }),
            showClearIcons: true,
          })}
        />
        <Select
          className="w-1/4"
          isMulti
          isSearchable
          isClearable
          cacheOptions
          value={statuses}
          options={filterStatus}
          onChange={(val) => dispatch(filterActions.setStatuses(val))}
          placeholder={t('choose_status')}
        />
      </div>
      <div className="flex w-full justify-between mt-4">
        <Search
          type="number"
          onChange={({ target: { value } }) => {
            dispatch(filterActions.setExternalOrderId(value))
          }}
          className="w-1/4 mr-4"
          placeholder={t('order_id_search')}
          value={external_order_id}
        />
        <RangePicker
          className="w-1/4 mr-4"
          dateValue={[
            dateRange?.start_date ? moment(dateRange?.start_date) : undefined,
            dateRange?.end_date ? moment(dateRange?.end_date) : undefined,
          ]}
          hideTimePicker
          placeholder={t('order_period')}
          onChange={handleRangeChange}
        />
        <Select
          className="w-1/4 mr-4"
          isSearchable
          isClearable
          cacheOptions
          value={delivery_type}
          options={deliveryOptions}
          onChange={(val) => {
            dispatch(filterActions.setDeliveryType(val))
          }}
          placeholder={t('order_type')}
        />
        <Select
          className="w-1/4"
          isClearable
          cacheOptions
          value={payment_method}
          options={payment_types}
          onChange={(val) => {
            dispatch(filterActions.setPaymentMethod(val))
          }}
          placeholder={t('payment_type')}
        />
      </div>
    </div>
  )
}

export default OrderFilters
