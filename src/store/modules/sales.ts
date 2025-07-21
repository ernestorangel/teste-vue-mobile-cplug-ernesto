import { defineStore } from 'pinia';
import type { Sale, CartItem } from '../../types';
import { ref } from 'vue';
import { useAlertStore } from './alert';
import { getNewSaleId, getTotalFromCartItems, getCurrentDate } from '../../utils/helpers';

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sale[]>([]);

  function getSale(saleId: number) {
    return sales.value.find((sale) => sale.id === saleId);
  }

  function createSale(items: CartItem[]) {
    const saleId = getNewSaleId(sales.value);
    const newSale: Sale = {
      id: saleId,
      items: items,
      total: getTotalFromCartItems(items),
      date: getCurrentDate(),
      status: 'completed',
    };
    sales.value.push(newSale);
    useAlertStore().showAlert('success', 'Venda criada.');
    return saleId;
  }

  return { sales, getSale, createSale };
});
