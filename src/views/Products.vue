<template>
  <div class="products-page-container">
    <div class="products-container">
      <div class="product-grid-header">
        <div class="product-grid-header-title-container">
          <button @click="backToHome" class="button-secondary">Voltar</button>
          <div class="product-grid-header-title">Produtos</div>
        </div>
        <div class="product-grid-search">
          <input
            v-model="search"
            type="search"
            id="product-search-input"
            name="product-search"
            placeholder="Digite para pesquisar"
            @focusin="isSearchInputFocused = true"
            @focusout="isSearchInputFocused = false"
            @keydown.enter="isSearchInputFocused ? searchProduct() : ''"
            @input="handleSearchInput"
          />
          <button
            @click="searchProduct"
            :disabled="!search.length"
            :class="[
              {
                'product-search-button': cart.length,
                'product-search-button-disabled': !cart.length,
              },
            ]"
          >
            Buscar
          </button>
        </div>
      </div>
      <div class="products-grid-container">
        <div v-if="isProductsEmpty" class="products-grid-empty">Nenhum produto encontrado</div>
        <div v-else class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :id="product.id"
            :name="product.name"
            :price="product.price"
            :image="product.image"
            :description="product.description"
          />
        </div>
      </div>
    </div>
    <div class="cart-container">
      <div class="cart-header-container">
        <div class="cart-header-title">Carrinho</div>
        <button v-if="cart.length" class="button-text-cancel" @click="clearCart">Limpar</button>
      </div>
      <div class="cart-content-container">
        <CartItem
          v-for="item in cart"
          :key="item.productId"
          :productId="item.productId"
          :quantity="item.quantity"
          :price="item.price"
          :name="item.name"
        />
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
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import CartItem from '../components/CartItem.vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '../store/modules/products';
import { useCartStore } from '../store/modules/cart';
import { useSalesStore } from '../store/modules/sales';
import { ref, computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';

const router = useRouter();

const products = ref(useProductsStore().products || []);
const search = ref('');
const isSearchInputFocused = ref(false);

const cart = computed(() => {
  return useCartStore().items || [];
});

const cartTotal = computed(() => {
  return formatMoneyFromNumber(useCartStore().getTotal());
});

const isProductsEmpty = computed(() => {
  return !products.value || !products.value.length;
});

function handleSearchInput() {
  if (search.value === '') searchProduct();
}

function searchProduct() {
  console.log('search: ', search.value);
  const results = useProductsStore().search(search.value);
  console.log('results: ', results);
  products.value = results;
}

function clearCart() {
  useCartStore().deleteAll();
}

function backToHome() {
  router.push('/home');
  clearCart();
}

function checkout() {
  const saleId = useSalesStore().createSale(cart.value);
  if (saleId) router.push(`success/${saleId}`);
  clearCart();
}
</script>

<style scoped>
.products-page-container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.products-container {
  width: 70%;
  height: 100%;
}
.product-grid-header {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--second-blue-light);
  background-color: var(--second-blue-main);
}
.product-grid-header-title-container {
  display: flex;
  align-items: center;
  gap: 20px;
}
.product-grid-header-title {
  font-size: 1.2rem;
  font-weight: 600;
}
.product-grid-search {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#product-search-input {
  min-width: 220px;
  width: 100%;
  padding: 10px;
  outline: none;
  border-top: 1px solid var(--second-blue-light);
  border-left: 1px solid var(--second-blue-light);
  border-bottom: 1px solid var(--second-blue-light);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: var(--second-blue-main);
}
#product-search-input:focus {
  background-color: var(--second-blue-dark);
}
.product-search-button {
  border: 0;
  box-shadow: 0;
  padding: 10px;
  background-color: var(--second-blue-main);
  border: 1px solid var(--second-blue-light);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: pointer;
  transition: ease-in-out;
  transition-duration: 0.15s;
}
.product-search-button:hover {
  background-color: var(--second-blue-light);
}
.product-search-button-disabled {
  border: 0;
  box-shadow: 0;
  padding: 10px;
  background-color: var(--second-blue-main);
  border: 1px solid var(--second-blue-light);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: pointer;
}
.products-grid-container {
  height: calc(100% - 80px);
  overflow-y: auto;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 24px;
}
.products-grid-empty {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #00aff2;
}
.cart-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--neutral-90);
}
.cart-header-container {
  min-height: 60px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--second-blue-dark);
  background-color: var(--second-blue-dark);
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
  background-color: var(--second-blue-dark);
}
.cart-actions-container {
  height: 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--neutral-90);
  background-color: var(--second-blue-light);
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
}
.cart-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
