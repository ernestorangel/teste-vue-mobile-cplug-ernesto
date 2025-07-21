import CartItem from './CartItem.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '../store/modules/cart';

const item = {
  productId: 1,
  quantity: 1,
  price: 19.9,
  name: 'Produto 1',
};

describe('CartItem (Unit)', () => {
  it('Should mount component', () => {
    const wrapper = mount(CartItem, {
      props: { ...item },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it('Should call removeItem @ store on click', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const cart = useCartStore();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia],
      },
    });

    const removeItemSpy = vi.spyOn(cart, 'removeItem');

    await wrapper.find('[data-testid="remove-btn"]').trigger('click');

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call incrementItemQuantity @ store on click', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const cart = useCartStore();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia],
      },
    });

    const incrementItemQuantitySpy = vi.spyOn(cart, 'incrementItemQuantity');

    await wrapper.find('[data-testid="plus-btn"]').trigger('click');

    expect(incrementItemQuantitySpy).toHaveBeenCalledTimes(1);
  });

  it('Should call decrementItemQuantity @ store on click', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const cart = useCartStore();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia],
      },
    });

    const decrementItemQuantitySpy = vi.spyOn(cart, 'decrementItemQuantity');

    await wrapper.find('[data-testid="minus-btn"]').trigger('click');

    expect(decrementItemQuantitySpy).toHaveBeenCalledTimes(1);
  });
});
