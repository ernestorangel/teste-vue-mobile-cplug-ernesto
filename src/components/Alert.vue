<template>
  <div class="alert-list-container">
    <TransitionGroup name="alert-fade" tag="div">
      <div v-for="alert in alertStore.alerts" :key="alert.id" class="alert-container">
        <div
          :class="[
            'alert-message',
            {
              'sucess-message': isSuccessMessage(alert.severity),
              'error-message': isErrorMessage(alert.severity),
            },
          ]"
        >
          {{ alert.message }}
        </div>
        <button @click="closeAlert(alert.id)" class="alert-close-button">OK</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '../store/modules/alert';
const alertStore = useAlertStore();
function closeAlert(alertId: string) {
  alertStore.removeAlert(alertId);
}
function isSuccessMessage(severity: string) {
  return severity === 'success';
}
function isErrorMessage(severity: string) {
  return severity === 'error';
}
</script>

<style scoped>
.alert-list-container {
  width: 320px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 90;
}
.alert-container {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  background-color: var(--second-blue-main);
  border: 1px solid var(--second-blue-light);
  border-radius: 6px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  pointer-events: all;
}
.alert-message {
  width: 100%;
  padding: 10px;
  font-size: 0.8rem;
  white-space: nowrap;
  text-overflow: clip;
}
.sucess-message {
  color: var(--green-dark);
}
.error-message {
  color: var(--red-danger-light);
}
.alert-close-button {
  padding: 10px;
  background-color: transparent;
  color: var(--neutral-60);
  cursor: pointer;
}
.alert-close-button:hover {
  color: var(--neutral-30);
}

.alert-fade-enter-active,
.alert-fade-leave-active {
  transition:
    opacity 0.4s,
    transform 0.4s;
}
.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.alert-fade-leave-from,
.alert-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
