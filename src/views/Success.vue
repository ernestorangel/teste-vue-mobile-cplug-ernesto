<template>
    <div class="success-page-container">
        <div class="sale-success-message">Venda finalizada!</div>
        <div class="sale-details-container">
            <div>{{ saleId }}</div>
            <div>{{ saleDate }}</div>
            <div class="sale-items-container">
                <div v-for="item in saleItems">
                    <div>{{ item.productId }}</div>
                    <div>{{ item.name }}</div>
                    <div>{{ item.price }}</div>
                    <div>{{ item.quantity }}</div>
                </div>
            </div>
            <div>{{ saleTotal }}</div>
        </div>
        <div class="sale-success-actions">
            <button
                @click="newSale"
                class="button-primary"
            >
                Nova Venda
            </button>
            <button
                @click="backToHome"
                class="button-secondary"
            >
                Voltar Home
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useSalesStore } from '../store/modules/sales';

const router = useRouter()
const route = useRoute()

const saleId = computed(() => {
    return Number(route.params?.saleId)
})

const saleDetails = computed(() => {
    if (saleId.value) return useSalesStore().getSale(saleId.value)
})

const saleDate = computed(() => {
    return saleDetails.value?.date
})

const saleItems = computed(() => {
    return saleDetails.value?.items || []
})

const saleTotal = computed(() => {
    return saleDetails.value?.total
})

function backToHome() {
    router.push('/home')
}

function newSale() {
    router.push('/products')
}
</script>

<style scoped>
.success-page-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.sale-success-message {
    font-size: 2rem;
}
.sale-details-container {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(47, 47, 47);
    padding: 10px;
    border-radius: 8px;
}
.sale-success-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>