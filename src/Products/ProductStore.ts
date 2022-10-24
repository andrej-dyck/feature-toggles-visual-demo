import { Currency } from './Currency'

export interface ProductStore {
  inCategory(categoryId: string): Promise<ReadonlyArray<Product>>
}

export type Product = Readonly<{
  sku: string
  title: string
  description: string
  price: Currency
}>
