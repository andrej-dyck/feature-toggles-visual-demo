import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { DetailedProduct, Product, ProductStore } from './ProductStore'

export const useProductsInCategory = (store: ProductStore, categoryId: string): Query<readonly Product[]> =>
  useQuery<readonly Product[]>(['products', categoryId], () => store.inCategory(categoryId))

export const useProduct = (store: ProductStore, sku: string): Query<DetailedProduct | undefined> =>
  useQuery<DetailedProduct | undefined>(['products', sku], () => store.bySku(sku))
