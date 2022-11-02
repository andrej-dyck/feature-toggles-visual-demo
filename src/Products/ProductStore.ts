import { images } from '../AppRoutes'
import { applyDiscount, Currency } from './Currency'

export interface ProductStore {
  inCategory(categoryId: string): Promise<readonly Product[]>
  bySku(sku: string): Promise<DetailedProduct | undefined>
}

export type Product = Readonly<{
  sku: string
  title: string
  price: Currency
  discount?: { inPercent: number }
}>

export const productPrice = ({ discount, price }: Pick<Product, 'price' | 'discount'>) =>
  !!discount && discount.inPercent > 0 ? applyDiscount(price, discount) : price

export const hasDiscount = ({ discount }: Pick<Product, 'discount'>) =>
  !!discount && discount.inPercent > 0

export const productImgSrc = (p: Product) => ({
  medium: () => images(`products/${p.sku}B.jpg`),
  large: () => images(`products/${p.sku}A.jpg`)
})

export type DetailedProduct = Product & Readonly<{
  description: string
}>

export * from './useProductStore'
