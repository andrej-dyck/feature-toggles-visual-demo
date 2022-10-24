export interface CatalogStore {
  allCategories(): Promise<ReadonlyArray<Category>>

  categoryById(categoryId: string): Promise<Category | undefined>
}

export type Category = Readonly<{ id: string; title: string }>


