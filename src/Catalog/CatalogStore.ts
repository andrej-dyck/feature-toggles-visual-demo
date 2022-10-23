export interface CatalogStore {
  allCategories(): Promise<ReadonlyArray<Category>>
}

export type Category = Readonly<{ id: string; title: string }>

export class FakeCatalogStore implements CatalogStore {
  constructor(private fakeDelayInMs = 500) {}

  async allCategories(): Promise<ReadonlyArray<Category>> {
    return new Promise(
      resolve => setTimeout(() => resolve(categoryStubs), this.fakeDelayInMs)
    )
  }
}

const categoryStubs: Category[] = [
  {
    id: 'mens-outerwear',
    title: 'Men\'s Outerwear',
  },
  {
    id: 'ladies-outerwear',
    title: 'Lady\'s Outerwear',
  },
  {
    id: 'mens-tshirts',
    title: 'Men\'s T-Shirts',
  },
  {
    id: 'ladies-tshirts',
    title: 'Lady\'s T-Shirts',
  }
]

