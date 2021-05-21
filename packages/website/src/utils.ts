export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem)
    return previous
  }, {} as Record<K, T[]>)

export const formatTimestamp = (c: number) =>
  new Date(c * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

export const formatMoney = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  })
  return formatter.format(amount / 100)
}

export const formatSeconds = (secNum: number) => {
  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor(secNum / 60) % 60
  const seconds = secNum % 60

  const time = [hours, minutes, seconds]
    .map(v => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':')

  return time.startsWith('0') ? time.substring(1) : time
}

export const anchorize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')
