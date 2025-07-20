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

export function formatMoneyFromNumber(value: number | undefined) {
    if (!value) return '-'
    return `R$ ${(value || 0.0).toFixed(2)}`
}

export function formatToCustomDateString(date: Date | undefined) {
    if (!date) return '-'
    return date.toLocaleDateString()
}

export function formatToCustomTimeString(date: Date | undefined) {
    if (!date) return '-'
    return date.toLocaleTimeString()
}