<template>
    <div class="history-page-container">
        <div class="history-title">Veja seu histórico!</div>
        <div class="sales-list-container">
            <div
                v-for="sale in salesHistory"
                class="sale-list-item-container"
            >
                {{ sale }}
            </div>
        </div>
        <button class="button-primary" @click="backToHome">Voltar Home</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSalesStore } from '../store/modules/sales';
import { computed } from 'vue';

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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.history-title {
    font-size: 2rem;
}
.sales-list-container {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid rgb(67, 67, 67);
    background-color: rgb(47, 47, 47);
    padding: 10px;
    border-radius: 8px;
}
</style>