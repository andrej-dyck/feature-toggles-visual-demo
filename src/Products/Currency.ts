import { never } from '../api/never'

export type Currency = Readonly<{ value: number, code: 'EUR' }>

export const ZERO: Currency = { value: 0, code: 'EUR' }

export const formatCurrency = (c: Currency, locale = 'de-DE') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: c.code }).format(c.value)

export const plus = (c1: Currency, c2: Currency) => ({
  value: c1.value + c2.value,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  code: c1.code === c2.code ? c1.code : never('multiple currencies not supported')
})

export const applyDiscount = (price: Currency, discount: { inPercent: number }) => ({
  value: price.value * Math.max(1 - discount.inPercent / 100, 0),
  code: price.code
})
