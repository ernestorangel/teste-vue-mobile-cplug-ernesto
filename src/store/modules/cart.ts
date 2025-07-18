import { defineStore } from 'pinia'
import type { CartItem } from '../../types'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    function addItem(item: CartItem) {
        items.value.push(item)
    }

    function removeItem(itemId: number) {
        items.value = items.value.filter((item) => item.productId !== itemId)
    }

    function updateItemQuantity(productId: number, newQuantity: number) {
        const item = items.value.find((item) => item.productId === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    return { items, addItem, removeItem, updateItemQuantity }
})