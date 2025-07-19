<template>
    <div class="home-menu">
        <div class="home-title">Olá, seja bem-vindo!</div>
        <button class="button-primary" @click="newSale">Criar Venda</button>
        <button class="button-secondary" @click="seeSales">Listar Vendas</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function newSale() {
    router.push('/products')
}
function seeSales() {
    router.push('/history')
}
</script>

<style scoped>
.home-menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.home-title {
    font-size: 2rem;

}
</style>