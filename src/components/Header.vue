<template>
  <div class="product-grid-header">
    <div class="product-grid-header-title-container">
      <button data-testid="back-btn" @click="backToHome" class="button-secondary">Início</button>
      <div class="product-grid-header-title">Produtos</div>
    </div>
    <div class="product-grid-search" :class="{ focused: isSearchInputFocused }">
      <input
        v-model="search"
        type="search"
        name="product-search-input"
        placeholder="Digite e aperte 'enter' para pesquisar"
        @focusin="isSearchInputFocused = true"
        @focusout="isSearchInputFocused = false"
        @keydown.enter="isSearchInputFocused ? searchProduct() : ''"
        @input="handleSearchInput"
        class="product-search-input"
        data-testid="search-input"
      />
      <button
        @click="searchProduct"
        :disabled="!search.length"
        :class="[
          {
            'product-search-button': search.length,
            'product-search-button-disabled': !search.length,
          },
        ]"
        data-testid="search-btn"
      >
        <Icon shape="search" size="xs" color="#3c4a57" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/modules/cart';
import { useProductsStore } from '../store/modules/products';
import { ref } from 'vue';
import Icon from './Icon.vue';

const router = useRouter();

const search = ref('');
const isSearchInputFocused = ref(false);

function handleSearchInput() {
  if (search.value === '') searchProduct();
}

function searchProduct() {
  useProductsStore().search(search.value);
}

function backToHome() {
  router.push('/home');
  useCartStore().deleteAll();
  useProductsStore().search('');
}
</script>

<style scoped>
.product-grid-header {
  height: 80px;
  padding: 0 40px;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--foreground-color);
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-search-input {
  height: 100%;
  min-width: 280px;
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
.product-search-button {
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
  cursor: pointer;
  transition: ease-in-out;
  transition-duration: 0.15s;
}
.product-search-button-disabled {
  display: flex;
  align-items: center;
  height: 100%;
  box-shadow: 0;
  padding: 0 10px;
  background-color: var(--background-color);
  border-right: 1px solid var(--border-color);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: not-allowed;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* Extra small devices (phones, 600px and down) */
  .product-grid-header {
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    overflow-x: hidden;
    gap: 20px;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--foreground-color);
  }
  .product-grid-search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-search-input {
    width: 100%;
    min-width: auto;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  /* Small devices (portrait tablets and large phones, 600px and up) */
  .product-grid-header {
    min-width: 120px;
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    align-items: start;
    justify-content: space-between;
    overflow-x: hidden;
    gap: 20px;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--foreground-color);
  }
  .product-grid-search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-search-input {
    width: 100%;
    min-width: auto;
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
