import moment from 'moment'

export default function orderTimer(
  createdAt,
  finishedAt,
  future_time,
  status_id,
  order_title
) {
  if (
    status_id === import.meta.env.VITE_NEW_STATUS_ID &&
    order_title === 'operator_accepted_timer'
  ) {
    return '--:--:--'
  } else if (status_id === import.meta.env.VITE_FUTURE_STATUS_ID) {
    // Convert the future_time to a Moment.js object in the "Asia/Tashkent" timezone
    const futureMoment = moment(future_time)

    // Get the current time in the local timezone
    const currentMoment = moment()

    // Calculate the difference in time
    const duration = moment.duration(futureMoment.diff(currentMoment))

    // Subtract the future_order_time from the duration
    const finalDuration = duration.subtract(0, 'minutes')

    // Now, you can access the difference in hours, minutes, etc.
    const hours = formatDuration(finalDuration.hours())
    const minutes = formatDuration(finalDuration.minutes())
    const seconds = formatDuration(finalDuration.seconds())

    return `${hours}:${minutes}:${seconds}`
  } else if (
    status_id === import.meta.env.VITE_OPERATOR_CANCELED_STATUS_ID ||
    status_id === import.meta.env.VITE_SERVER_CANCELED_STATUS_ID ||
    status_id === import.meta.env.VITE_FINISHED_STATUS_ID
  ) {
    let finished = moment(finishedAt)
    let created = moment(createdAt)
    let diff_s = finished.diff(created, 'seconds')
    let differenceForFinished = moment
      .utc(moment.duration(diff_s, 'seconds').asMilliseconds())
      .format('HH:mm:ss')

    return differenceForFinished
  } else {
    const start = moment(createdAt)
    const end = moment(finishedAt || undefined)
    const range = end.diff(start)
    const formattedRange = moment.utc(range).format('HH:mm:ss')
    return formattedRange
  }
}

function formatDuration(duration) {
  return duration.toString().padStart(2, '0')
}
