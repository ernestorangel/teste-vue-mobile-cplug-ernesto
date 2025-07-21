<template>
  <div v-if="!isCartDrawerOpen" @click="isCartDrawerOpen = true" class="cart-drawer-open-btn">
    <div v-if="cart.length" class="cart-drawer-open-btn-label">{{ cart.length }}</div>
    <Icon shape="cart" size="lg" color="#00aff2" />
  </div>
  <div
    :class="[
      'cart-container',
      {
        'hidden-cart': !isCartDrawerOpen,
      },
    ]"
  >
    <div class="cart-header-container">
      <div @click="isCartDrawerOpen = false" class="cart-drawer-close-btn">Fechar</div>
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
import Icon from './Icon.vue';
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
const isCartDrawerOpen = ref(false);

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
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  opacity: 1;
}
.cart-drawer-open-btn {
  display: none;
}
.cart-drawer-close-btn {
  display: none;
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

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* Extra small devices (phones, 600px and down) */
  .hidden-cart {
    transform: translateX(100vw);
    display: none !important;
  }
  .cart-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border-color);
    z-index: 90;
  }
  .cart-drawer-open-btn {
    display: flex;
    padding: 20px;
    position: absolute;
    bottom: 20px;
    right: 30px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--foreground-color);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      0 1px 2px rgba(0, 0, 0, 0.24);
    z-index: 80;
    cursor: pointer;
  }
  .cart-drawer-open-btn-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 100%;
    background-color: var(--green-dark);
    color: var(--text-color);
  }
  .cart-drawer-open-btn:hover {
    background-color: var(--background-color);
  }
  .cart-drawer-close-btn {
    display: flex;
    cursor: pointer;
    color: var(--text-faded-color);
  }
  .cart-drawer-close-btn:hover {
    color: var(--text-color);
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  /* Small devices (portrait tablets and large phones, 600px and up) */
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
