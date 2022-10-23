export interface CatalogStore {
  allCategories(): Promise<ReadonlyArray<Category>>

  categoryById(categoryId: string): Promise<Category | undefined>
}

export type Category = Readonly<{ id: string; title: string }>

export class FakeCatalogStore implements CatalogStore {
  constructor(private fakeDelayInMs = 200) {}

  allCategories(): Promise<ReadonlyArray<Category>> {
    return new Promise(
      resolve => setTimeout(() => resolve(categoryStubs), this.fakeDelayInMs)
    )
  }

  categoryById(categoryId: string): Promise<Category | undefined> {
    return this.allCategories().then(
      categories => categories.find(c => c.id === categoryId)
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

