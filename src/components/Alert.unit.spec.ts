import Alert from './Alert.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAlertStore } from '../store/modules/alert';

describe('Alert (Unit)', () => {
  it('Should mount component', () => {
    const pinia = createPinia();
    const wrapper = mount(Alert, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it('Should call removeAlert @ store on click', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const alertStore = useAlertStore();

    // Adiciona um alerta manualmente
    alertStore.alerts.push({
      id: '1',
      severity: 'success',
      message: 'Test alert',
    });

    const wrapper = mount(Alert, {
      global: {
        plugins: [pinia],
      },
    });

    const removeAlertSpy = vi.spyOn(alertStore, 'removeAlert');

    await wrapper.find('[data-testid="alert-close-btn"]').trigger('click');

    expect(removeAlertSpy).toHaveBeenCalledTimes(1);
  });
});
