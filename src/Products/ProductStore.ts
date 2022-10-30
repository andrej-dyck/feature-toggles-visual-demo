import { Currency } from './Currency'

export interface ProductStore {
  inCategory(categoryId: string): Promise<ReadonlyArray<Product>>
  bySku(sku: string): Promise<DetailedProduct | undefined>
}

export type Product = Readonly<{
  sku: string
  title: string
  price: Currency
}>

export const productImgSrc = (p: Product) => ({
  medium: () => `/images/products/${p.sku}B.jpg`,
  large: () => `/images/products/${p.sku}A.jpg`
})

export type DetailedProduct = Product & Readonly<{
  description: string
}>

export * from './useProductStore'
