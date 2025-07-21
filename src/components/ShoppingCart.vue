<template>
  <div class="cart-container">
    <div class="cart-header-container">
      <div class="cart-header-title">Carrinho</div>
      <button
        v-if="cart.length"
        class="button-text-cancel"
        @click="clearCart"
        data-testid="clear-cart-btn"
      >
        Limpar
      </button>
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
      <div v-show="cart.length" class="cart-actions-coupon-container">
        <Transition>
          <button
            v-if="!isCouponInputVisible"
            @click="isCouponInputVisible = true"
            class="cart-actions-coupon-show-btn"
          >
            Inserir cupom
          </button>
          <div v-else class="cart-actions-coupon-field-container">
            <div v-if="!appliedCoupon" class="cart-actions-coupon-field">
              <input
                v-model="coupon"
                placeholder="Digite o código"
                class="cart-actions-coupon-input"
              />
              <button @click="checkAndApplyCoupon" class="cart-actions-coupon-btn">Aplicar</button>
            </div>
            <div v-else>
              <div class="cart-actions-discount-container">
                <div class="cart-actions-discount-title">Desconto</div>
                <div class="cart-actions-discount-value">- {{ cartDiscountFormatted }}</div>
              </div>
            </div>
            <button @click="clearCoupon" class="cart-actions-coupon-cancel-btn">x</button>
          </div>
        </Transition>
      </div>
      <div class="cart-actions-summary-container">
        <div class="cart-summary">
          <div class="cart-summary-title">Total</div>
          <div class="cart-summary-total">
            {{ cartNetTotalFormatted }}
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
            data-testid="checkout-btn"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '../components/CartItem.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/modules/cart';
import { useSalesStore } from '../store/modules/sales';
import { ref, computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';
import { useAlertStore } from '../store/modules/alert';
import { useProductsStore } from '../store/modules/products';
import { useCouponStore } from '../store/modules/coupon';

const router = useRouter();

const cartStore = useCartStore();
const salesStore = useSalesStore();
const productsStore = useProductsStore();
const couponStore = useCouponStore();
const alertStore = useAlertStore();

const coupon = ref(undefined);

const isCouponInputVisible = ref(false);

const cart = computed(() => {
  return cartStore.items || [];
});

const appliedCoupon = computed(() => {
  return cartStore.coupon;
});

const cartDiscount = computed(() => {
  return cartStore.discount || 0;
});

const cartDiscountFormatted = computed(() => {
  return formatMoneyFromNumber(cartDiscount.value);
});

const cartTotal = computed(() => {
  return cartStore.total || 0;
});

// const cartTotalFormatted = computed(() => {
//   return formatMoneyFromNumber(cartTotal.value);
// });

const cartNetTotal = computed(() => {
  return cartStore.netTotal || 0;
});

const cartNetTotalFormatted = computed(() => {
  return formatMoneyFromNumber(cartNetTotal.value);
});

function checkAndApplyCoupon() {
  if (!coupon.value) {
    alertStore.showAlert('error', 'Cupom vazio.');
    return;
  }
  if (!couponStore.isCouponActive(coupon.value)) {
    alertStore.showAlert('error', 'Cupom inválido.');
    return;
  }
  cartStore.applyCoupon(coupon.value);
}

function clearCoupon() {
  if (appliedCoupon.value) cartStore.removeCoupon();
  coupon.value = undefined;
  isCouponInputVisible.value = false;
}

function checkout() {
  const saleId = salesStore.createSale(
    cart.value,
    cartTotal.value,
    cartNetTotal.value,
    cartDiscount.value,
    appliedCoupon.value
  );
  if (saleId) router.push(`success/${saleId}`);
  resetPageData();
}

function clearCart() {
  cartStore.deleteAll();
  alertStore.showAlert('error', 'Seu carrinho está vazio');
}
function resetPageData() {
  cartStore.deleteAll();
  productsStore.search('');
  clearCoupon();
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
  width: 100%;
  display: flex;
  flex-direction: column;
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
.cart-actions-coupon-container {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}
.cart-actions-coupon-show-btn {
  background-color: transparent;
  color: var(--text-faded-color);
  cursor: pointer;
}
.cart-actions-coupon-show-btn:hover {
  color: var(--text-color);
}
.cart-actions-coupon-field-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.cart-actions-coupon-cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 0;
  box-shadow: 0;
  padding: 0 10px;
  background-color: transparent;
  color: var(--text-faded-color);
  cursor: pointer;
  transition: ease-in-out;
  transition-duration: 0.15s;
}
.cart-actions-coupon-cancel-btn:hover {
  color: var(--error-color);
}
.cart-actions-coupon-field {
  display: flex;
  height: 100%;
  width: 100%;
}
.cart-actions-coupon-input {
  width: 100%;
  padding: 10px;
  outline: none;
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: var(--background-color);
}
.cart-actions-coupon-btn {
  display: flex;
  align-items: center;
  height: 100%;
  border: 0;
  box-shadow: 0;
  padding: 0 10px;
  background-color: var(--background-color);
  border-right: 1px solid var(--border-color);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  color: var(--text-faded-color);
  cursor: pointer;
  transition: ease-in-out;
  transition-duration: 0.15s;
}
.cart-actions-coupon-btn:hover {
  color: var(--text-color);
}
.cart-actions-discount-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.cart-actions-discount-title {
  white-space: nowrap;
  font-size: 0.8rem;
  color: var(--text-faded-color);
}
.cart-actions-discount-value {
  white-space: nowrap;
  font-size: 1rem;
  color: var(--text-faded-color);
}
.cart-actions-summary-container {
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
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
