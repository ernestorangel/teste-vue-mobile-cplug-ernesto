<template>
    <div class="nav-menu">
        <div>Veja seu histórico!</div>
        <button @click="backToHome">Voltar Home</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function backToHome() {
    router.push('home')
}
</script>

<style scoped>
.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>