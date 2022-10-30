import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { CatalogStore, Category } from './CatalogStore'

export const useCategories = (store: CatalogStore): Query<ReadonlyArray<Category>> =>
  useQuery(['categories'], () => store.allCategories())

export const useCategoryById = (store: CatalogStore, categoryId: string): Query<Category | undefined> =>
  useQuery(['categories', categoryId], () => store.categoryById(categoryId))
