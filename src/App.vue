<template>
  <div >
    <router-view v-slot="{ Component, route }">
      <Transition mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
