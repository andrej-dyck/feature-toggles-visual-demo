import { CatalogStore, Category } from '../Catalog/CatalogStore'

export class FakeCatalogStore implements CatalogStore {
  constructor(
    private readonly fakeDelayInMs = 200,
    private readonly categories = categoryStubs
  ) {}

  allCategories(): Promise<ReadonlyArray<Category>> {
    return new Promise(
      resolve => setTimeout(() => resolve(this.categories), this.fakeDelayInMs)
    )
  }

  categoryById(categoryId: string): Promise<Category | undefined> {
    return new Promise(
      resolve => setTimeout(() => resolve(
        this.categories.find(c => c.id === categoryId)
      ), this.fakeDelayInMs/2)
    )
  }
}

const categoryStubs: ReadonlyArray<Category> = [{
  id: 'mens-outerwear',
  title: 'Men\'s Outerwear',
}, {
  id: 'ladies-outerwear',
  title: 'Lady\'s Outerwear',
}, {
  id: 'mens-tshirts',
  title: 'Men\'s T-Shirts',
}, {
  id: 'ladies-tshirts',
  title: 'Lady\'s T-Shirts',
}] as const
