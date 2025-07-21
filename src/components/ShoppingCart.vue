<template>
  <div class="cart-container">
    <div class="cart-header-container">
      <div class="cart-header-title">Carrinho</div>
      <button v-if="cart.length" class="button-text-cancel" @click="clearCart">Limpar</button>
    </div>
    <div class="cart-content-container">
      <TransitionGroup>
        <CartItem
          v-for="item in cart"
          :key="item.productId"
          :productId="item.productId"
          :quantity="item.quantity"
          :price="item.price"
          :name="item.name"
        />
      </TransitionGroup>
    </div>
    <div class="cart-actions-container">
      <div class="cart-summary">
        <div class="cart-summary-title">Total</div>
        <div class="cart-summary-total">
          {{ cartTotal }}
        </div>
      </div>
      <div class="cart-actions">
        <button
          @click="checkout"
          :class="[
            {
              'button-primary': cart.length,
              'button-primary-disabled': !cart.length,
            },
          ]"
          :disabled="!cart.length"
        >
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '../components/CartItem.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/modules/cart';
import { useSalesStore } from '../store/modules/sales';
import { computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';
import { useAlertStore } from '../store/modules/alert';
import { useProductsStore } from '../store/modules/products';

const router = useRouter();

const cart = computed(() => {
  return useCartStore().items || [];
});

const cartTotal = computed(() => {
  return formatMoneyFromNumber(useCartStore().getTotal());
});

function checkout() {
  const saleId = useSalesStore().createSale(cart.value);
  if (saleId) router.push(`success/${saleId}`);
  useCartStore().deleteAll();
  useProductsStore().search('');
}

function clearCart() {
  useCartStore().deleteAll();
  useAlertStore().showAlert('error', 'Seu carrinho está vazio');
}
</script>

<style scoped>
.cart-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-color);
}
.cart-header-container {
  min-height: 60px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
}
.cart-header-title {
  font-size: 1.2rem;
  font-weight: 600;
}
.cart-content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--background-color);
}
.cart-actions-container {
  height: 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  background-color: var(--foreground-color);
}
.cart-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0px;
}
.cart-summary-title {
  font-size: 0.8rem;
  font-weight: 400;
}
.cart-summary-total {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--highlight-color);
}
.cart-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
