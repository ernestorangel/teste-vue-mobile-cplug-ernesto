import { defineStore } from 'pinia';
import type { Coupon } from '../../types';
import { ref } from 'vue';

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref<Coupon[]>([
    {
      name: '10OFF',
      discount: 0.1,
      isActive: true,
    },
    {
      name: '20OFF',
      discount: 0.2,
      isActive: true,
    },
    {
      name: '50OFF',
      discount: 0.5,
      isActive: false,
    },
  ]);

  function getCoupon(name: string) {
    return coupons.value.find((coupon: Coupon) => coupon.name.toUpperCase() === name.toUpperCase());
  }

  function isCouponActive(name: string) {
    const coupon = getCoupon(name);
    if (coupon) return coupon.isActive;
    return Boolean(coupon);
  }

  return { coupons, getCoupon, isCouponActive };
});
