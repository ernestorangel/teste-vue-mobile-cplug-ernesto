<template>
    <div class="home-menu">
        <div>Olá, seja bem-vindo!</div>
        <button @click="newSale">Criar Venda</button>
        <button @click="seeSales">Listar Vendas</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function newSale() {
    router.push('products')
}
function seeSales() {
    router.push('history')
}
</script>

<style scoped>
.home-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>