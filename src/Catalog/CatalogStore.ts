import { useQuery } from '@tanstack/react-query';
import { Query } from '../api/Query'

export interface CatalogStore {
  allCategories(): Promise<ReadonlyArray<Category>>
  categoryById(categoryId: string): Promise<Category | undefined>
}

export type Category = Readonly<{ categoryId: string; title: string }>

export const useCategories = (store: CatalogStore): Query<ReadonlyArray<Category>> =>
  useQuery(['categories'], () => store.allCategories())

export const useCategoryById = (store: CatalogStore, categoryId: string): Query<Category | undefined> =>
  useQuery(['categories', categoryId], () => store.categoryById(categoryId))
