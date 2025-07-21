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
