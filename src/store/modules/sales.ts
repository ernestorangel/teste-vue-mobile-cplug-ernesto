import { defineStore } from 'pinia';
import type { Sale, CartItem, Coupon } from '../../types';
import { ref } from 'vue';
import { db } from '../../database/dexiedb';
import { useAlertStore } from './alert';
import { getNewSaleId, getCurrentDate } from '../../utils/helpers';

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sale[]>([]);

  async function loadSales() {
    sales.value = await db.sales.toArray();
  }

  async function getSale(saleId: number) {
    await loadSales();
    return sales.value.find((sale) => sale.id === saleId);
  }

  async function createSale(
    items: CartItem[],
    total: number,
    netTotal: number,
    discount: number,
    coupon?: Coupon | undefined
  ) {
    const saleId = getNewSaleId(sales.value);
    const newSale: Sale = {
      id: saleId,
      items: JSON.parse(JSON.stringify(items)),
      total: total,
      date: getCurrentDate(),
      status: 'completed',
      discount: discount,
      netTotal: netTotal,
      coupon: coupon?.name,
    };
    const newSaleId = await db.sales.add(newSale);
    await loadSales();
    useAlertStore().showAlert('success', 'Venda realizada com sucesso');
    return newSaleId;
  }

  return { sales, getSale, createSale, loadSales };
});
