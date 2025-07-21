import ShoppingCart from './ShoppingCart.vue';
import { useCartStore } from '../store/modules/cart';
import { useSalesStore } from '../store/modules/sales';
import { createPinia, setActivePinia } from 'pinia';
import setupRouter from '../router';
import { mount } from '@vue/test-utils';
import { expect, describe, it, vi, afterEach } from 'vitest';

describe('ShoppingCart (Unit)', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it('Should mount component', async () => {
    const pinia = createPinia();
    const router = await setupRouter();

    vi.spyOn(router, 'push').mockResolvedValue();

    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it('Should call deleteAll @ cart store on click', async () => {
    const pinia = createPinia();
    const router = await setupRouter();
    setActivePinia(pinia);
    const cart = useCartStore();

    cart.items.push({
      productId: 1,
      name: 'Produto Teste',
      price: 10,
      quantity: 1,
    });

    const deleteAllSpy = vi.spyOn(cart, 'deleteAll');

    vi.spyOn(router, 'push').mockResolvedValue();

    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [pinia, router],
      },
    });

    await wrapper.find('[data-testid="clear-cart-btn"]').trigger('click');

    expect(deleteAllSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call createSale @ sale store on click', async () => {
    const pinia = createPinia();
    const router = await setupRouter();
    setActivePinia(pinia);
    const sales = useSalesStore();
    const cart = useCartStore();

    cart.items.push({
      productId: 1,
      name: 'Produto Teste',
      price: 10,
      quantity: 1,
    });

    const createSaleSpy = vi.spyOn(sales, 'createSale');

    vi.spyOn(router, 'push').mockResolvedValue();

    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [pinia, router],
      },
    });

    await wrapper.find('[data-testid="checkout-btn"]').trigger('click');

    expect(createSaleSpy).toHaveBeenCalledTimes(1);
  });
});
