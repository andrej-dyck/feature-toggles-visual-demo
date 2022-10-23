import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { Product, ProductStore } from './ProductStore'

export const useProductsInCategory = (store: ProductStore, cateogryId: string): Query<ReadonlyArray<Product>> =>
  useQuery<ReadonlyArray<Product>>(['products', cateogryId], () => store.inCategory(cateogryId))
