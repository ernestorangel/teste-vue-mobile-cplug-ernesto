<template>
  <div class="products-page-container">
    <div class="products-container">
      <Header />
      <div class="products-grid-container">
        <Transition>
          <div v-if="isProductsEmpty" class="products-grid-empty">Nenhum produto encontrado</div>
          <div v-else class="products-grid">
            <TransitionGroup>
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :id="product.id"
                :name="product.name"
                :price="product.price"
                :image="product.image"
                :description="product.description"
                :category="product.category"
                :searchTerm="searchTerm"
              />
            </TransitionGroup>
          </div>
        </Transition>
      </div>
    </div>
    <ShoppingCart />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import Header from '../components/Header.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import { useProductsStore } from '../store/modules/products';
import { computed } from 'vue';

const productsStore = useProductsStore();

const products = computed(() => {
  return productsStore.showcaseProducts || [];
});

const isProductsEmpty = computed(() => {
  return !products.value || !products.value.length;
});

const searchTerm = computed(() => {
  return productsStore.searchTerm || undefined;
});
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
  overflow: hidden;
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

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* Extra small devices (phones, 600px and down) */
  .products-page-container {
    width: 100%;
    height: 100%;
  }
  .products-container {
    width: 100%;
    height: 100%;
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
