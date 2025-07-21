import { defineStore } from 'pinia';
import type { Sale, CartItem, Coupon } from '../../types';
import { ref } from 'vue';
import { useAlertStore } from './alert';
import { getNewSaleId, getCurrentDate } from '../../utils/helpers';

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sale[]>([]);

  function getSale(saleId: number) {
    return sales.value.find((sale) => sale.id === saleId);
  }

  function createSale(
    items: CartItem[],
    total: number,
    netTotal: number,
    discount: number,
    coupon?: Coupon | undefined
  ) {
    const saleId = getNewSaleId(sales.value);
    const newSale: Sale = {
      id: saleId,
      items: items,
      total: total,
      date: getCurrentDate(),
      status: 'completed',
      discount: discount,
      netTotal: netTotal,
      coupon: coupon?.name,
    };
    sales.value.push(newSale);
    useAlertStore().showAlert('success', 'Venda realizada com sucesso');
    return saleId;
  }

  return { sales, getSale, createSale };
});
