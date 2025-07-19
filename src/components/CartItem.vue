<template>
    <div class="cart-item-container">
        <div class="cart-item-info">
            <div class="cart-item-name">
                {{ props.name }}
            </div>
            <div>
                <div>Valor Unitário: </div>
                <div class="cart-item-price">
                    {{ unitPrice }}
                </div>
            </div>
            <div>
                <div>Valor Total: </div>
                <div class="cart-item-total-price">
                    {{ totalPrice }}
                </div>
            </div>
        </div>
        <div class="cart-item-actions">
            <div class="cart-item-qtd-select-container">
                <button
                    id="cart-item-qtd-increment"
                    class="cart-item-qtd-select-enabled"
                    @click="incrementItemQuantity"
                >
                    +
                </button>
                <div 
                    class="cart-item-qtd-select-quantity"
                >
                    {{ props.quantity }}
                </div>
                <button
                    id="cart-item-qtd-decrement"
                    :class="[{ 
                        'cart-item-qtd-select-enabled': !isDecrementDisabled, 
                        'cart-item-qtd-select-disabled': isDecrementDisabled 
                    }]"
                    :disabled="isDecrementDisabled"
                    @click="decrementItemQuantity"
                >
                    -
                </button>
            </div>
            <button 
                @click="removeFromCart"
                class="button-text-cancel"
            >
                Excluir
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/modules/cart';
import { computed } from 'vue';
import { formatMoneyFromNumber } from '../utils/helpers';

const props = defineProps([
  'productId',
  'quantity',
  'price',
  'name',
])

const isDecrementDisabled = computed(() => {
    return props.quantity <= 1
})

const unitPrice = computed(() => {
    return formatMoneyFromNumber(props.price)
})

const totalPrice = computed(() => { 
    return formatMoneyFromNumber(props.quantity * props.price)
})

function removeFromCart() {
    useCartStore().removeItem(props.productId)
}
function incrementItemQuantity() {
    useCartStore().incrementItemQuantity(props.productId)
}
function decrementItemQuantity() {
    useCartStore().decrementItemQuantity(props.productId)
}
</script>

<style scoped>
.cart-item-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(47, 47, 47);
    border-radius: 8px;
    transition: ease-in-out;
    transition-duration: 5s;
}
.cart-item-info {
    padding: 10px;
}
.cart-item-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px;
    border-left: 1px solid rgb(67, 67, 67);
}
.cart-item-qtd-select-container {
    display: flex;
    flex-direction: row-reverse;
}
.cart-item-qtd-select-enabled {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(53, 53, 53);
    cursor: pointer;
}
.cart-item-qtd-select-enabled:hover {
    background-color: #00aff2;
}
.cart-item-qtd-select-disabled {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(53, 53, 53);
    cursor: not-allowed;
}
#cart-item-qtd-increment {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
#cart-item-qtd-decrement {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.cart-item-qtd-select-quantity {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(67, 67, 67);
    border-bottom: 1px solid rgb(67, 67, 67);
    background-color: rgb(35, 35, 35);
}
</style>