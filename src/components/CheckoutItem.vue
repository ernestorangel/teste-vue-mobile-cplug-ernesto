<template>
    <div class="cart-item-container">
        <div class="cart-item-info">
            <div class="cart-item-name">
                {{ props.name }}
            </div>
            <div class="cart-item-prices">
                <div class="cart-item-price-container">
                    <div class="cart-item-price-title">
                        Valor Unitário
                    </div>
                    <div class="cart-item-price">
                        {{ unitPrice }}
                    </div>
                </div>
                <div class="cart-item-qtd-select-wrapper">
                    <div class="cart-item-qtd-select-title">
                        Quantidade
                    </div>
                    <div 
                        class="cart-item-qtd-select-quantity"
                    >
                        {{ props.quantity }}
                    </div>
                </div>
                <div class="cart-item-total-price-container">
                    <div class="cart-item-total-price-title">
                        Valor Total
                    </div>
                    <div class="cart-item-total-price">
                        {{ totalPrice }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';

const props = defineProps([
  'productId',
  'quantity',
  'price',
  'name',
])

const unitPrice = computed(() => {
    return formatMoneyFromNumber(props.price)
})

const totalPrice = computed(() => { 
    return formatMoneyFromNumber(props.quantity * props.price)
})
</script>

<style scoped>
.cart-item-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    transition: ease-in-out;
    transition-duration: 5s;
    /* border-bottom: 1px solid var(--second-blue-light); */
    background-color: var(--second-blue-main);
}
.cart-item-info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
}
.cart-item-name {
    font-size: 1.2rem;
    font-weight: 600;
}
.cart-item-prices {
    display: flex;
    justify-content: space-between;
    gap: 10px
}
.cart-item-price-container {
    color: var(--neutral-40);
}
.cart-item-total-price-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
}
.cart-item-total-price {
    font-weight: 600;
}
.cart-item-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    gap: 12px;
    padding: 10px 20px 20px 20px;
}
.cart-item-qtd-select-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}
.cart-item-qtd-select-title {
    font-size: 0.6rem;
    color: var(--neutral-40);
}
.cart-item-qtd-select-container {
    display: flex;
    flex-direction: row-reverse;
}
.cart-item-qtd-select-enabled {
    min-width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--second-blue-dark);
    cursor: pointer;
}
.cart-item-qtd-select-enabled:hover {
    background-color: var(--second-blue-light);
}
.cart-item-qtd-select-disabled {
    min-width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--second-blue-dark);
    cursor: not-allowed;
}
.cart-item-qtd-select-quantity {
    min-width: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>