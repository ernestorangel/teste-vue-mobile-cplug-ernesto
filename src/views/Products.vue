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
                <button class="button-text-cancel" @click="backToHome">
                    Cancelar
                </button>
                <button
                    class="button-text-cancel"
                    @click="clearCart"
                >
                    Limpar
                </button>
            </div>
            <div class="cart-content-container">
                <CartItem
                    v-for="item in cart"
                    :productId="item.productId"
                    :quantity="item.quantity"
                    :price="item.price"
                    :name="item.name"
                >
                    {{ item }}
                </CartItem>
            </div>
            <div class="cart-actions-container">
                <div class="cart-summary">
                    <div class="cart-summary-title">Total</div>
                    <div class="cart-summary-total">{{ cartTotal }}</div>
                </div>
                <div class="cart-actions">
                    <button class="button-primary" @click="finishSale">
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
import { computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';

const router = useRouter();

const products = computed(() => {
    return useProductsStore().products || []
})

const cart = computed(() => {
    return useCartStore().items || []
})

const cartTotal = computed(() => {
    return formatMoneyFromNumber(useCartStore().getTotal())
})

function clearCart() {
    useCartStore().deleteAll()
}

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
    outline: none;
}
#product-search-button {
    border: 0;
    box-shadow: 0;
    padding: 10px;
    background-color: #00aff2;
    border: 1px solid #62d3ff;
    cursor: pointer;
}
#product-search-button:hover {
  transition: ease-in-out;
  transition-duration: 0.15s;
  border: 1px solid #00aff2;
  color: #00aff2;
  background-color: rgb(0, 0, 0);
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
    height: 60px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(84, 84, 84);
}
.cart-content-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    padding: 10px;
}
.cart-actions-container {
    height: 80px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    border-top: 1px solid rgb(84, 84, 84);
}
.cart-summary {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 8px;
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