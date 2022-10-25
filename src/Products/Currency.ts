import { never } from '../api/never'

export type Currency = Readonly<{ value: number, code: 'EUR' }>

export const ZERO: Currency = { value: 0, code: 'EUR' }

export const formatCurrency = (c: Currency, locale = 'de-DE') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: c.code }).format(c.value)

export const plus = (c1: Currency, c2: Currency) => ({
  value: c1.value + c2.value,
  code: c1.code === c2.code ? c1.code : never('multiple currencies not supported')
})
