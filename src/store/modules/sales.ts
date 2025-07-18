import { defineStore } from 'pinia'
import type { Sale, CartItem} from '../../types'
import { ref } from 'vue'
import { getNewSaleId, getTotalFromCartItems, getCurrentDate } from '../../utils/helpers'

export const useSalesStore = defineStore('sales', () => {
    const sales = ref<Sale[]>([])

    function createSale(items: CartItem[]) {
        const newSale: Sale = {
            id: getNewSaleId(sales.value),
            items: items,
            total: getTotalFromCartItems(items),
            date: getCurrentDate(),
            status: 'completed'
        }
        sales.value.push(newSale)
    }

    return { sales, createSale }
})