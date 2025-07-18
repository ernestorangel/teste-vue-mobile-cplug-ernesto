<template>
    <div class="products-page-container">
        <div class="products-container">
            <div class="product-search-bar">
                <input 
                    id="product-search-input"
                    name="product-search"
                    placeholder="Digite para pesquisar um produto..." 
                />
                <button id="product-search-button">
                    Buscar
                </button>
            </div>
            <div class="products-grid-container">
                <div class="products-grid">
                    <ProductCard
                        v-for="product in products"
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
                <button @click="backToHome">
                    Voltar Home
                </button>
            </div>
            <div class="cart-content-container"></div>
            <div class="cart-actions-container">
                <button @click="finishSale">
                    Finalizar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '../store/modules/products';
import { computed } from 'vue';

const router = useRouter();

const products = computed(() => {
    return useProductsStore().products || []
})

function backToHome() {
    router.push('home')
}

function finishSale() {
    router.push('success')
}
</script>

<style scoped>
#product-search-input {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 1rem;
}
#product-search-button {
    padding: 10px;
    border: 0;
    box-shadow: 0;
}

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
.product-search-bar {
    height: 40px;
    display: flex;
    overflow: hidden;
    border-bottom: 1px solid rgb(84, 84, 84);
}
.products-grid-container {
    height: calc(100% - 40px);
    overflow-y: auto;
}
.products-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}
.cart-container {
    width: 30%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid rgb(84, 84, 84);
}
.cart-header-container {
    height: 40px;
    border-bottom: 1px solid rgb(84, 84, 84);
}
.cart-content-container {
    height: 100%;
    overflow-y: auto;
}
.cart-actions-container {
    height: 40px;
    border-top: 1px solid rgb(84, 84, 84);
}
</style>