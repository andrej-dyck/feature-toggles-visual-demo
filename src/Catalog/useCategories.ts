import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { CatalogStore, Category } from './CatalogStore'

export const useCategories = (store: CatalogStore): Query<ReadonlyArray<Category>> =>
  useQuery<ReadonlyArray<Category>>(['categories'], () => store.allCategories())
