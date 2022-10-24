import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
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

export type DetailedProduct = Product & Readonly<{
  description: string
}>

export const useProductsInCategory = (store: ProductStore, cateogryId: string): Query<ReadonlyArray<Product>> =>
  useQuery<ReadonlyArray<Product>>(['products', cateogryId], () => store.inCategory(cateogryId))

export const useProduct = (store: ProductStore, sku: string): Query<DetailedProduct | undefined> =>
  useQuery<DetailedProduct | undefined>(['products', sku], () => store.bySku(sku))
