import Button from '@/components/Button'
import Header from '@/components/Header'
import { useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { statusTabList } from '@/constants/statuses'
import TuneIcon from '@mui/icons-material/Tune'
import TabLabel from '@/components/Tab/TabLabel'
import { StyledTab, StyledTabs } from '@/components/StyledTabs/index'
import { filterActions } from '@/store/filters/filters.slice'
import { orderService } from '@/services/orderService'
import { Box, Card } from '@mui/material'
import OrderFilters from './OrderFilters'
import Table from './Table'

export default function Orders() {
  const { t } = useTranslation()

  return (
    <>
      <Header title={t('orders')} />
      <Card style={{ padding: '0px 16px' }}>
        <Filters />
        <Table />
      </Card>
    </>
  )
}

const Filters = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)
  const { t } = useTranslation()
  const [countsByStatuses, setCountsByStatuses] = useState([])

  const getCount = useCallback(() => {
    const formatStatusList = Array.from(
      new Set(
        statusTabList
          .map((elm) => elm?.id?.split(','))
          .reduce((acc, curr) => [...acc, ...curr], [])
          .map((el) => el.trim())
      )
    )
    orderService
      .getOrdersCount({
        status_ids: formatStatusList.join(','),
        start_date: filters?.dateRange?.start_date,
        end_date: filters?.dateRange?.end_date,
        customer_id: filters?.customer_id?.value,
      })
      .then((res) => setCountsByStatuses(res?.orders_count))
      .catch((err) => console.log(err))
  }, [filters?.dateRange, filters?.customer_id])

  useEffect(getCount, [getCount, filters?.dateRange, filters?.customer_id])

  return (
    <Box px={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #ebebeb"
      >
        <StyledTabs
          value={filters?.tab || 1}
          onChange={(_, value) => dispatch(filterActions.setTabId(value))}
          centered={false}
        >
          {statusTabList.map((elm, i) => (
            <StyledTab
              key={elm?.id}
              value={elm?.id}
              label={
                <TabLabel
                  isActive={elm?.id === filters?.tab}
                  count={defineCountByTabs(elm?.id, countsByStatuses)}
                >
                  {t(elm?.label)}
                </TabLabel>
              }
              {...a11yProps(i)}
            />
          ))}
        </StyledTabs>
        <Button
          startIcon={<TuneIcon />}
          variant={filters?.is_open ? 'outlined' : 'contained'}
          onClick={() => dispatch(filterActions.openFilters(!filters?.is_open))}
        >
          {filters?.is_open ? t('close_filter') : t('open_filter')}
        </Button>
      </Box>
      <OrderFilters />
    </Box>
  )
}

// Some tabs includes more than 1 orders statuses. Therefore, we need this function
function defineCountByTabs(id, statuses = []) {
  if (id.length > 400) {
    return 0
  } else {
    const ids = id.split(',')
    if (ids.length > 1) {
      let count = 0
      for (const status of statuses) {
        if (ids.includes(status.status_id)) {
          count += +status.count
        }
      }

      return count
    } else {
      return statuses.find((elm) => id === elm.status_id)?.count ?? 0
    }
  }
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
