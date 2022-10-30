export interface CatalogStore {
  allCategories(): Promise<ReadonlyArray<Category>>

  categoryById(categoryId: string): Promise<Category | undefined>
}

export type Category = Readonly<{ categoryId: string; title: string }>

export * from './useCatalogStore'
