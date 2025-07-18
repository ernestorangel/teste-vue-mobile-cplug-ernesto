<template>
    <div class="nav-menu">
        <div>Escolha produtos</div>
        <button @click="backToHome">Voltar Home</button>
        <button @click="finishSale">Finalizar</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function backToHome() {
    router.push('home')
}
function finishSale() {
    router.push('success')
}
</script>

<style scoped>
.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>