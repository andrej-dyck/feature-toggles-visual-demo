export const formatPrice = (price: { value: number, currency: string }) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: price.currency }).format(price.value)
