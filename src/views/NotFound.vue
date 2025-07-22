<template>
  <div class="not-found-page-container">
    <div class="not-found-page-message">Pagina não encontrada.</div>
    <button @click="backToHome" class="button-secondary">Início</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function backToHome() {
  router.push('/home');
}
</script>

<style scoped>
.not-found-page-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.not-found-page-message {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
}
</style>
