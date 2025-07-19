<template>
    <div class="product-card-container">
        <div class="product-card-image-container">
            <img :src="props.image" width="100%" />
        </div>
        <div class="product-card-info">
            <div class="product-card-name">
                {{ props.name }}
            </div>
            <div class="product-card-description">
                {{ props.description }}
            </div>
            <div class="product-card-price">
                {{ props.price }}
            </div>
        </div>
        <div class="product-card-actions">
            <button @click="addToCart" class="button-secondary">
                Adicionar ao carrinho
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/modules/cart';
const props = defineProps([
    'id',
    'name',
    'price',
    'image',
    'description'
])
function addToCart() {
    useCartStore().addItem({
        productId: props.id,
        quantity: 1,
        price: props.price,
        name: props.name
    })
}
</script>

<style scoped>
.product-card-container {
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(47, 47, 47);
    padding: 10px;
    border-radius: 8px;
}
.product-card-image-container {
    width: 100%;
    height: 180px;
    overflow: hidden;
    place-items: center;
    border-radius: 6px;
}
.product-card-name {
    font-size: 1.2rem;
    font-weight: 600;
}
.product-card-description {
    font-size: 0.75rem;
    color: gray;
}
.product-card-price {
    font-size: 0.95rem;
}
.product-card-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
}
.product-card-button {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
}
.product-card-button:hover {
    background-color: rgb(94, 94, 94)
}
</style>