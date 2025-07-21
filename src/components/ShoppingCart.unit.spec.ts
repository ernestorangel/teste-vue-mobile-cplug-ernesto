import ShoppingCart from './ShoppingCart.vue';
//import { useCartStore } from '../store/modules/cart';
import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';

describe('ShoppingCart (Unit)', () => {
  it('Should mount component', () => {
    const pinia = createPinia();

    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.vm).toBeDefined();
  });
});
