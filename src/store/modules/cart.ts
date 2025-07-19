import { defineStore } from 'pinia'
import type { CartItem } from '../../types'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref<Array<CartItem>>([])

    function getItem(itemId: number) {
        return items.value.find((item) => item.productId === itemId)
    }

    function addItem(item: CartItem) {
        const cartItem = getItem(item.productId)
        if (!cartItem) items.value.push(item)
        else cartItem.quantity++
    }

    function removeItem(itemId: number) {
        items.value = items.value.filter((item) => item.productId !== itemId)
    }

    function getItemQuantity(itemId: number) {
        const item = items.value.find((item) => item.productId === itemId);
        return item?.quantity || 0
    }

    function incrementItemQuantity(itemId: number) {
        const item = getItem(itemId)
        if (item) item.quantity++
    }

    function decrementItemQuantity(itemId: number) {
        const item = getItem(itemId)
        if (item) item.quantity--
    }

    function getTotal() {
        return items.value.reduce((acc: number, item: CartItem) => acc + (item.quantity * item.price), 0)
    }

    function deleteAll() {
        items.value = []
    }

    return { 
        items,
        addItem,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
        getItemQuantity,
        getTotal,
        deleteAll
    }
})