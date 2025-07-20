<template>
    <div class="history-page-container">
        <div class="history-page-header">
            <div class="history-title">
                Histórico de vendas
            </div>
            <button
                @click="backToHome"
                class="button-secondary"
            >
                Início
            </button>
        </div>
        <div class="sales-list-container">
            <div 
                v-if="!salesHistory.length" 
                class="sales-list-empty"
            >
                Nenhuma venda registrada
            </div>
            <SaleItem
                v-for="sale in salesHistory"
                :id="sale.id"
                :items="sale.items"
                :total="sale.total"
                :date="sale.date"
                :status="sale.status"
            />
        </div>
    </div>  
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSalesStore } from '../store/modules/sales';
import { computed } from 'vue';
import SaleItem from '../components/SaleItem.vue';

const router = useRouter();

const salesHistory = computed(() => {
    return useSalesStore().sales || []
})

function backToHome() {
    router.push('/home')
}
</script>

<style scoped>
.history-page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 80px;
}
.history-page-header {
    width: 90%;
    max-width: 920px;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: var(--second-blue-dark);
}
.history-title {
    font-size: 1.5rem;
    font-weight: 800;
}
.sales-list-container {
    width: 90%;
    max-width: 920px;
    display: flex;
    flex-direction: column;
    gap: 40px;
}
.sales-list-empty {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px;
    font-size: 1.2rem;
    color:#00aff2;
}
</style>