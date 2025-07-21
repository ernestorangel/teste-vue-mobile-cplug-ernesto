<template>
  <div class="home-menu">
    <div class="home-title">Olá, seja bem-vindo!</div>
    <button class="button-primary" @click="newSale">
      <Icon shape="plus" size="sm" color="#ffffff" />
      Criar Venda
    </button>
    <button class="button-secondary" @click="seeSales">
      <Icon shape="list" size="sm" color="#ffffff" />
      Listar Vendas
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Icon from '../components/Icon.vue';
const router = useRouter();
function newSale() {
  router.push('/products');
}
function seeSales() {
  router.push('/history');
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

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .home-title {
    font-size: 1.5rem;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .home-title {
    font-size: 2rem;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  /* Medium devices (landscape tablets, 768px and up) */
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  /* Large devices (laptops/desktops, 992px and up) */
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  /* Extra large devices (large laptops and desktops, 1200px and up) */
}
</style>
