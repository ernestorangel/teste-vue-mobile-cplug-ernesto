<template>
  <div class="sale-item-container">
    <div class="sale-item-header">
      <div class="sale-item-header-left">
        <div class="sale-item-header-left-info">
          <div class="sale-item-header-left-info-title">Venda</div>
          <div class="sale-item-header-left-info-value">#{{ props.id }}</div>
        </div>
        <div class="sale-item-header-left-info">
          <div class="sale-item-header-left-info-title">Data</div>
          <div class="sale-item-header-left-info-value">{{ saleDate }}</div>
        </div>
      </div>
      <div class="sale-item-header-right">
        <div class="sale-item-header-right-info">
          <div class="sale-item-header-right-info-title">Subtotal</div>
          <div class="sale-item-header-right-info-value">{{ saleTotal }}</div>
        </div>
        <div class="sale-item-header-right-info">
          <div class="sale-item-header-right-info-title">Cupom</div>
          <div class="sale-item-header-right-info-value">{{ saleCoupon }}</div>
        </div>
        <div class="sale-item-header-right-info">
          <div class="sale-item-header-right-info-title">Desconto</div>
          <div class="sale-item-header-right-info-value">{{ saleDiscount }}</div>
        </div>
        <div class="sale-item-header-right-info">
          <div class="sale-item-header-right-info-title">Total</div>
          <div class="sale-item-header-right-info-value">{{ saleNetTotal }}</div>
        </div>
      </div>
    </div>
    <div>
      <CheckoutItem
        v-for="item in props.items"
        :key="item.productId"
        :productId="item.productId"
        :quantity="item.quantity"
        :price="item.price"
        :name="item.name"
        :condensed="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CheckoutItem from './CheckoutItem.vue';
import { formatToCustomDateString, formatMoneyFromNumber } from '../utils/helpers';

const props = defineProps([
  'id',
  'items',
  'total',
  'date',
  'status',
  'discount',
  'netTotal',
  'coupon',
]);

const saleDate = computed(() => {
  return formatToCustomDateString(props.date);
});

const saleTotal = computed(() => {
  return formatMoneyFromNumber(props.total);
});

const saleDiscount = computed(() => {
  return formatMoneyFromNumber(props.discount);
});

const saleNetTotal = computed(() => {
  return formatMoneyFromNumber(props.netTotal);
});

const saleCoupon = computed(() => {
  return props.coupon || '-';
});
</script>

<style scoped>
.sale-item-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--foreground-color);
  transition: ease-in-out;
  transition-duration: 0.5s;
  /* padding-bottom: 20px; */
  overflow: hidden;
}

.sale-item-header {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--foreground-color);
}

.sale-item-header-left {
  display: flex;
  gap: 20px;
}

.sale-item-header-left-info {
  display: flex;
  flex-direction: column;
}

.sale-item-header-left-info-title {
  color: var(--text-faded-color);
}

.sale-item-header-left-info-value {
  color: var(--text-color);
}

.sale-item-header-right {
  display: flex;
  gap: 20px;
}

.sale-item-header-right-info {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.sale-item-header-right-info-title {
  color: var(--text-faded-color);
}

.sale-item-header-right-info-value {
  font-weight: 600;
  color: var(--highlight-color);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .sale-item-header {
    gap: 20px;
  }
  .sale-item-header-left {
    flex-direction: column;
  }
  .sale-item-header-right {
    flex-direction: column;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .sale-item-header {
    flex-direction: row;
  }
  .sale-item-header-left-info {
    align-items: start;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  /* Medium devices (landscape tablets, 768px and up) */
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  /* Medium devices (landscape tablets, 768px and up) */
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  /* Medium devices (landscape tablets, 768px and up) */
}
</style>
