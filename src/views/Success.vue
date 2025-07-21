<template>
  <div class="success-page-container">
    <div class="sale-success-message">Venda #{{ saleId }} finalizada!</div>
    <div class="sale-success-datetime-container">
      <div>{{ saleDateFormatted }}</div>
      &nbsp;as&nbsp;
      <div>{{ saleTimeFormatted }}</div>
    </div>
    <div class="sale-details-container">
      <div class="sale-details-header">Itens</div>
      <div class="sale-items-container">
        <CheckoutItem
          v-for="item in saleItems"
          :key="item.productId"
          :productId="item.productId"
          :quantity="item.quantity"
          :price="item.price"
          :name="item.name"
        />
      </div>
      <div class="sale-details-summary">
        <div>
          <div class="sale-details-summary-title">Subtotal</div>
          <div class="sale-details-summary-info">{{ saleTotalFormatted }}</div>
        </div>
        <div>
          <div class="sale-details-summary-title">Cupom</div>
          <div class="sale-details-summary-info">{{ saleCoupon }}</div>
        </div>
        <div>
          <div class="sale-details-summary-title">Desconto</div>
          <div class="sale-details-summary-info">{{ saleDiscountFormatted }}</div>
        </div>
        <div>
          <div class="sale-details-summary-title">Total</div>
          <div class="sale-details-summary-info">{{ saleNetTotalFormatted }}</div>
        </div>
      </div>
    </div>
    <div class="sale-success-actions">
      <button @click="backToHome" class="button-secondary">Voltar Home</button>
      <button @click="newSale" class="button-primary">Nova Venda</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutItem from '../components/CheckoutItem.vue';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useSalesStore } from '../store/modules/sales';
import {
  formatToCustomDateString,
  formatToCustomTimeString,
  formatMoneyFromNumber,
} from '../utils/helpers';

const router = useRouter();
const route = useRoute();

const saleId = computed(() => {
  return Number(route.params?.saleId);
});

const saleDetails = computed(() => {
  if (saleId.value) return useSalesStore().getSale(saleId.value);
  else return undefined;
});

const saleDate = computed(() => {
  return saleDetails.value?.date;
});

const saleDateFormatted = computed(() => {
  return formatToCustomDateString(saleDate.value);
});

const saleTimeFormatted = computed(() => {
  return formatToCustomTimeString(saleDate.value);
});

const saleItems = computed(() => {
  return saleDetails.value?.items || [];
});

const saleTotal = computed(() => {
  return saleDetails.value?.total || 0;
});

const saleTotalFormatted = computed(() => {
  return formatMoneyFromNumber(saleTotal.value);
});

const saleNetTotal = computed(() => {
  return saleDetails.value?.netTotal || 0;
});

const saleNetTotalFormatted = computed(() => {
  return formatMoneyFromNumber(saleNetTotal.value);
});

const saleDiscount = computed(() => {
  return saleDetails.value?.discount || 0;
});

const saleDiscountFormatted = computed(() => {
  return formatMoneyFromNumber(saleDiscount.value);
});

const saleCoupon = computed(() => {
  return saleDetails.value?.coupon || '-';
});

function backToHome() {
  router.push('/home');
}

function newSale() {
  router.push('/products');
}
</script>

<style scoped>
.success-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  gap: 20px;
}

.sale-success-message {
  font-size: 2rem;
}

.sale-success-datetime-container {
  display: flex;
  font-size: 0.8rem;
}

.sale-details-header {
  padding: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--foreground-color);
  border-bottom: 1px solid var(--border-color);
}

.sale-details-container {
  width: 90%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  background-color: var(--foreground-color);
  border-radius: 8px;
  margin-bottom: 60px;
}

.sale-items-container {
  max-height: 50vh;
  overflow-y: auto;
}

.sale-details-summary {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid var(--border-color);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  flex-wrap: wrap;
  gap: 20px;
}

.sale-details-summary-title {
  color: var(--text-color);
}

.sale-details-summary-info {
  color: var(--highlight-color);
  font-weight: 600;
}

.sale-success-actions {
  width: 90%;
  max-width: 920px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  position: static;
  padding: 20px;
  border-top: none;
  background-color: transparent;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .success-page-container {
    padding: 24px 0;
    gap: 12px;
  }
  .sale-success-message {
    font-size: 1.5rem;
  }
  .sale-success-datetime-container {
    font-size: 0.8rem;
  }
  .sale-details-container {
    width: 100%;
    margin-bottom: 60px;
  }
  .sale-details-summary {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
  .sale-success-actions {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px;
    border-top: 1px solid var(--border-color);
    background-color: var(--foreground-color);
    width: 100%;
    max-width: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .success-page-container {
    padding: 40px 0;
    gap: 20px;
  }
  .sale-success-message {
    font-size: 2rem;
  }
  .sale-success-datetime-container {
    font-size: 1rem;
  }
  .sale-details-container {
    width: 90%;
    margin-bottom: 60px;
  }
  .sale-success-actions {
    position: static;
    border-top: none;
    background-color: transparent;
    width: 90%;
    max-width: 920px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  /* Medium devices (landscape tablets, 768px and up) */
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  /* Large devices (laptops/desktops, 992px and up) */
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  /* Extra large devices (large laptops and desktops, 1200px and up) */
}
</style>
