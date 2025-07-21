<template>
  <div class="cart-item-container">
    <div
      :class="[
        {
          'cart-item-info-condensed': props.condensed,
          'cart-item-info': !props.condensed,
        },
      ]"
    >
      <div class="cart-item-name">{{ props.quantity }} x {{ props.name }}</div>
      <div class="cart-item-prices">
        <div class="cart-item-price-container" v-if="!props.condensed">
          <div class="cart-item-price-title">Valor Unitário</div>
          <div class="cart-item-price">
            {{ unitPrice }}
          </div>
        </div>
        <div class="cart-item-total-price-container">
          <div class="cart-item-total-price-title">Valor Total</div>
          <div class="cart-item-total-price">
            {{ totalPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';

const props = defineProps(['productId', 'quantity', 'price', 'name', 'condensed']);

const unitPrice = computed(() => {
  return formatMoneyFromNumber(props.price);
});

const totalPrice = computed(() => {
  return formatMoneyFromNumber(props.quantity * props.price);
});
</script>

<style scoped>
.cart-item-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}
.cart-item-info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}
.cart-item-info-condensed {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  border-bottom: 1px solid var(--border-color);
}
.cart-item-name {
  font-size: 1.2rem;
  font-weight: 600;
}
.cart-item-prices {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.cart-item-price-container {
  color: var(--text-color);
}
.cart-item-total-price-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.cart-item-total-price {
  font-weight: 600;
}
.cart-item-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
  padding: 10px 20px 20px 20px;
}
.cart-item-qtd-select-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ce;
  align-items: center;
}
.cart-item-qtd-select-title {
  font-size: 0.6rem;
  color: var(--text-color);
}
.cart-item-qtd-select-container {
  display: flex;
  flex-direction: row-reverse;
}
.cart-item-qtd-select-enabled {
  min-width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: var(--second-blue-dark);
  cursor: pointer;
}
.cart-item-qtd-select-enabled:hover {
  background-color: var(--second-blue-light);
}
.cart-item-qtd-select-disabled {
  min-width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: var(--second-blue-dark);
  cursor: not-allowed;
}
.cart-item-qtd-select-quantity {
  min-width: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
