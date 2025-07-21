<template>
  <div class="app-content">
    <Alert />
    <router-view v-slot="{ Component, route }">
      <Transition mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Alert from './components/Alert.vue';
</script>

<style>
.app-content {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
