export interface ProductStore {
  inCategory(categoryId: string): Promise<ReadonlyArray<Product>>
}

export type Product = Readonly<{
  sku: string
  title: string
  description: string
  price: { value: number, currency: 'EUR' }
}>
