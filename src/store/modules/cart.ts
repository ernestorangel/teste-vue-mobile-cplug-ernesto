import { defineStore } from 'pinia';
import type { CartItem, Coupon } from '../../types';
import { ref, computed } from 'vue';
import { useAlertStore } from './alert';
import { useCouponStore } from './coupon';

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<CartItem>>([]);
  const coupon = ref<Coupon | undefined>(undefined);

  const total = computed(() => {
    return getTotal();
  });

  const netTotal = computed(() => {
    return getNetTotal();
  });

  const discount = computed(() => {
    return total.value - netTotal.value;
  });

  function getItem(itemId: number) {
    return items.value.find((item) => item.productId === itemId);
  }

  function addItem(item: CartItem) {
    const cartItem = getItem(item.productId);
    if (!cartItem) {
      items.value.push(item);
      useAlertStore().showAlert('success', 'Item adicionado ao carrinho');
    } else cartItem.quantity++;
  }

  function removeItem(itemId: number) {
    items.value = items.value.filter((item) => item.productId !== itemId);
    useAlertStore().showAlert('error', 'Item removido do carrinho');
  }

  function getItemQuantity(itemId: number) {
    const item = items.value.find((item) => item.productId === itemId);
    return item?.quantity || 0;
  }

  function incrementItemQuantity(itemId: number) {
    const item = getItem(itemId);
    if (item) item.quantity++;
  }

  function decrementItemQuantity(itemId: number) {
    const item = getItem(itemId);
    if (item) item.quantity--;
  }

  function getTotal() {
    return items.value.reduce((acc: number, item: CartItem) => acc + item.quantity * item.price, 0);
  }

  function getNetTotal() {
    return total.value - total.value * (coupon.value?.discount || 0);
  }

  function deleteAll() {
    items.value = [];
  }

  function applyCoupon(name: string) {
    console.log('applyCoupon(name): ', name);
    if (!name) return;
    coupon.value = useCouponStore().getCoupon(name);
    useAlertStore().showAlert('success', 'Cupom aplicado.');
  }

  function removeCoupon() {
    coupon.value = undefined;
    useAlertStore().showAlert('error', 'Cupom removido.');
  }

  return {
    items,
    coupon,
    total,
    netTotal,
    discount,
    addItem,
    removeItem,
    incrementItemQuantity,
    decrementItemQuantity,
    getItemQuantity,
    getTotal,
    getNetTotal,
    deleteAll,
    applyCoupon,
    removeCoupon,
  };
});
