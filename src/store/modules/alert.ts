import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Alert } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([]);

  const duration = 3000;

  function createAlert(severity: 'success' | 'error' | 'warn', message: string) {
    const newAlertId = uuidv4();
    const newAlert: Alert = { id: newAlertId, severity, message };
    alerts.value.push(newAlert);
    return newAlertId;
  }

  function removeAlert(alertId: string) {
    alerts.value = alerts.value.filter((alert) => alert.id !== alertId);
  }

  function isAlertListed(alertId: string) {
    return Boolean(alerts.value.some((alert) => alert.id === alertId));
  }

  function showAlert(severity: 'success' | 'error' | 'warn', message: string) {
    const alertId = createAlert(severity, message);
    setTimeout(() => {
      if (isAlertListed(alertId)) removeAlert(alertId);
    }, duration);
  }

  return { alerts, showAlert, removeAlert };
});
