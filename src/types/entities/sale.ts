import type { CartItem } from "./cartItem"
export interface Sale {
  id: number,
  items: CartItem[],
  total: number,
  date: Date,
  status: 'completed'
}