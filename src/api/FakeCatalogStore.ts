import { CatalogStore, Category } from '../Catalog/CatalogStore'

export class FakeCatalogStore implements CatalogStore {
  constructor(
    private readonly fakeDelayInMs = 200,
    private readonly categories = categoryStubs
  ) {}

  allCategories(): Promise<readonly Category[]> {
    return new Promise(
      resolve => setTimeout(() => resolve(this.categories), this.fakeDelayInMs)
    )
  }

  categoryById(categoryId: string): Promise<Category | undefined> {
    return new Promise(
      resolve => setTimeout(
        () => resolve(this.categories.find(c => c.categoryId === categoryId)),
        this.fakeDelayInMs / 2
      )
    )
  }
}

const categoryStubs: readonly Category[] = [{
  categoryId: 'mens-outerwear',
  title: 'Men\'s Outerwear',
}, {
  categoryId: 'ladies-outerwear',
  title: 'Lady\'s Outerwear',
}, {
  categoryId: 'mens-tshirts',
  title: 'Men\'s T-Shirts',
}, {
  categoryId: 'ladies-tshirts',
  title: 'Lady\'s T-Shirts',
}] as const
