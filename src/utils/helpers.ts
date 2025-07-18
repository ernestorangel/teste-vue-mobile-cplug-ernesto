import type { CartItem, Sale } from "../types"

export function getNewSaleId(sales: Sale[]) {
    return sales.length + 1;
}

export function getTotalFromCartItems(items: CartItem[]) {
    const initialValue = 0
    const accumulator = (acc: number, item: CartItem) => {
        return acc + item.price * item.quantity
    }
    return items.reduce(accumulator, initialValue)
}

export function getCurrentDate() {
    return new Date()
}