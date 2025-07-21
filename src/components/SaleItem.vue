<template>
  <div class="sale-item-container">
    <div class="sale-item-header">
      <div class="sale-item-header-left">
        <div>
          <div>Numero da venda</div>
          <div>#{{ props.id }}</div>
        </div>
        <div>
          <div>Realizada em</div>
          <div>
            <div>{{ saleDate }}</div>
          </div>
        </div>
      </div>
      <div class="sale-item-header-right">
        <div class="sale-item-header-right-info">
          <div>Total</div>
          <div>{{ saleTotal }}</div>
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CheckoutItem from './CheckoutItem.vue';
import { formatToCustomDateString, formatMoneyFromNumber } from '../utils/helpers';

const props = defineProps(['id', 'items', 'total', 'date', 'status']);

const saleDate = computed(() => {
  return formatToCustomDateString(props.date);
});

const saleTotal = computed(() => {
  return formatMoneyFromNumber(props.total);
});
</script>

<style scoped>
.sale-item-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--foreground-color);
  transition: ease-in-out;
  transition-duration: 0.5s;
  padding-bottom: 20px;
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
.sale-item-header-right-info {
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>
