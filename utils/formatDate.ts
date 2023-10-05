export const formatDate = (
  time: string,
  type: 'onlyTime' | 'fullDate' = 'onlyTime'
) => {
  const date = new Date(time)

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  }

  if (type === 'fullDate') {
    options.second = '2-digit'
  }

  const clock = date.toLocaleTimeString([], options)

  if (type === 'onlyTime') {
    return `${clock}`
  }

  if (type === 'fullDate') {
    const year = date.toLocaleString('default', { year: 'numeric' })
    const month = date.toLocaleString('default', { month: '2-digit' })
    const day = date.toLocaleString('default', { day: '2-digit' })

    return `${year}/${month}/${day} ${clock}`
  }
}
