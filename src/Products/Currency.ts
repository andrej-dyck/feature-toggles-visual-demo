export type Currency = Readonly<{ value: number, code: 'EUR' }>

export const formatCurrency = (c: Currency, locale = 'de-DE') =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: c.code }).format(c.value)
