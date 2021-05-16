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
