<template>
  <div class="product-grid-header">
    <div class="product-grid-header-title-container">
      <button data-testid="back-btn" @click="backToHome" class="button-secondary">Voltar</button>
      <div class="product-grid-header-title">Produtos</div>
    </div>
    <div class="product-grid-search">
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
  console.log('search: ', search.value);
  if (search.value === '') searchProduct();
}

function searchProduct() {
  useProductsStore().search(search.value);
}

function backToHome() {
  router.push('/home');
  useCartStore().deleteAll();
}
</script>

<style scoped>
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
  border-top: 1px solid var(--second-blue-light);
  border-left: 1px solid var(--second-blue-light);
  border-bottom: 1px solid var(--second-blue-light);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: var(--second-blue-dark);
}
.product-search-button {
  display: flex;
  align-items: center;
  height: 100%;
  border: 0;
  box-shadow: 0;
  padding: 0 10px;
  background-color: var(--second-blue-dark);
  border-right: 1px solid var(--second-blue-light);
  border-top: 1px solid var(--second-blue-light);
  border-bottom: 1px solid var(--second-blue-light);
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
  background-color: var(--second-blue-dark);
  border-right: 1px solid var(--second-blue-light);
  border-top: 1px solid var(--second-blue-light);
  border-bottom: 1px solid var(--second-blue-light);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: not-allowed;
}
</style>
