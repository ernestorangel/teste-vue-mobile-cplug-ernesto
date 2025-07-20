<template>
    <div class="success-page-container">
        <div class="sale-success-message">
            Venda #{{ saleId }} finalizada!
        </div>
        <div class="sale-success-datetime-container">
            <div>{{ formatToCustomDateString(saleDate) }}</div>
            &nbsp;as&nbsp;
            <div>{{ formatToCustomTimeString(saleDate) }}</div>
        </div>
        <div class="sale-details-container">
            <div class="sale-details-header">
                <div>Itens</div>
            </div>
            <div class="sale-items-container">
                <CheckoutItem
                    v-for="item in saleItems"
                    :productId="item.productId"
                    :quantity="item.quantity"
                    :price="item.price"
                    :name="item.name"
                />
            </div>
            <div class="sale-details-summary">
                <div>Total</div>
                <div>{{ formatMoneyFromNumber(saleTotal) }}</div>
            </div>
        </div>
        <div class="sale-success-actions">
            <button
                @click="backToHome"
                class="button-secondary"
            >
                Voltar Home
            </button>
            <button
                @click="newSale"
                class="button-primary"
            >
                Nova Venda
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CheckoutItem from '../components/CheckoutItem.vue';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useSalesStore } from '../store/modules/sales';
import { formatToCustomDateString, formatToCustomTimeString, formatMoneyFromNumber } from '../utils/helpers';

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    gap: 20px;
}
.sale-success-message {
    font-size: 2rem;
}
.sale-success-datetime-container {
    display: flex;
}
.sale-details-header {
    padding: 20px;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--second-blue-light);
}
.sale-details-container {
    width: 90%;
    max-width: 920px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid var(--second-blue-light);
    background-color: var(--second-blue-main);
    border-radius: 8px;
}
.sale-items-container {
    max-height: 50vh;
    overflow-y: auto;
}
.sale-details-summary {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-top: 1px solid var(--second-blue-light);
}
.sale-success-actions {
    width: 90%;
    max-width: 920px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
}
</style>