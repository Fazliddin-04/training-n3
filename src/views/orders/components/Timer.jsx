import { useCallback, useEffect, useMemo, useState } from 'react'
import Tag from '@/components/Tag'
import { Icon } from '@iconify/react'
import orderTimer from '@/helpers/orderTimer'
import { useSelector } from 'react-redux'
import moment from 'moment'

// This components is created to keep counting and reducting re-rendering of full table
function Timer({ record, operatorTimer, color, size = 'large', ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)
  const { procces_only_paid } = useSelector((state) => state.auth?.user)

  const isFinished = useMemo(() => {
    return (
      record?.status_id === import.meta.env.VITE_OPERATOR_CANCELED_STATUS_ID ||
      record?.status_id === import.meta.env.VITE_SERVER_CANCELED_STATUS_ID ||
      record?.status_id === import.meta.env.VITE_FINISHED_STATUS_ID
    )
  }, [record?.status_id])

  useEffect(() => {
    if (!isFinished) {
      let interval = null
      interval = setInterval(() => setCount((prev) => ++prev), 1000)
      return () => clearInterval(interval)
    }
  }, [isFinished])

  const handleOperatorAccepted = (record, startTime) => {
    const defaultResult = '-----'

    const startMoment = moment(startTime)
    const acceptedMoment = moment(record?.finished_at)

    if (!startMoment.isValid() || !acceptedMoment.isValid()) {
      return defaultResult // Handle invalid dates
    }

    const diffSeconds = acceptedMoment.diff(startMoment, 'seconds')
    const duration = moment.duration(diffSeconds, 'seconds')

    const differenceFormatted = moment
      .utc(duration.asMilliseconds())
      .format('HH:mm:ss')

    return differenceFormatted !== 'Invalid date'
      ? differenceFormatted
      : defaultResult
  }

  const handleTimeColor = useCallback((record) => {
    // The colors changes only after operator accepted status.
    const ORDER_TIMER = Math.round(
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

    const HANDLE_OPERATOR_ACCEPTED = Math.round(
      moment.duration(handleOperatorAccepted(record)).asMinutes()
    )
    const time =
      record?.status_id === import.meta.env.VITE_FINISHED_STATUS_ID
        ? HANDLE_OPERATOR_ACCEPTED
        : record?.status_id === import.meta.env.VITE_FUTURE_STATUS_ID
        ? 0
        : ORDER_TIMER

    if (time >= 30 && time < 40) {
      return 'warning'
    } else if (time >= 40) {
      return 'error'
    }

    return 'success'
  }, [])

  const ComputeOperatorTimer = useCallback((record, paidTime) => {
    let result
    if (isNaN(new Date(paidTime))) {
      result = '--:--:--'
    } else if (record?.status_id === import.meta.env.VITE_FINISHED_STATUS_ID) {
      result = handleOperatorAccepted(record, paidTime)
    } else {
      result = orderTimer(
        paidTime,
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
    }

    return result
  }, [])

  return (
    <Tag
      color={
        color
          ? color
          : handleTimeColor(
              record,
              operatorTimer ? 'operator_accepted_timer' : ''
            )
      }
      size={size}
      {...props}
    >
      <span className="flex items-center">
        <Icon icon="eva:clock-outline" className="mr-2" />
        {operatorTimer
          ? procces_only_paid
            ? record?.payment_type === 'cash'
              ? ComputeOperatorTimer(record, record?.operator_accepted_at)
              : (record?.payment_type === 'click' ||
                  record?.payment_type === 'epay' ||
                  record?.payment_type === 'payme' ||
                  record?.payment_type === 'apelsin') &&
                record?.paid
              ? ComputeOperatorTimer(record, record?.paid_time)
              : '00:00:00'
            : ComputeOperatorTimer(record, record?.operator_accepted_at)
          : orderTimer(
              record?.created_at,
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
              record?.status_id
            )}
      </span>
    </Tag>
  )
}

export default Timer
