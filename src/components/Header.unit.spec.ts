import Header from './Header.vue';
import { createPinia } from 'pinia';
import setupRouter from '../router';
import { useProductsStore } from '../store/modules/products';
import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';

const search = 'fone';

describe('Header (Unit)', () => {
  it('Should mount component', async () => {
    const router = await setupRouter();
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it('Should call store search method when button clicked after typing', async () => {
    const pinia = createPinia();
    const router = await setupRouter();
    const productsStore = useProductsStore(pinia);

    const searchSpy = vi.spyOn(productsStore, 'search');

    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
      },
    });

    await wrapper.find('[data-testid="search-input"]').setValue(search);

    await wrapper.find('[data-testid="search-btn"]').trigger('click');

    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith(search);
  });

  it('Should push /home route on back button click', async () => {
    const router = await setupRouter();

    const routerPushSpy = vi.spyOn(router, 'push');

    const wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-testid="back-btn"]').trigger('click');

    expect(routerPushSpy).toHaveBeenCalledTimes(1);
    expect(routerPushSpy).toHaveBeenCalledWith('/home');
  });
});
