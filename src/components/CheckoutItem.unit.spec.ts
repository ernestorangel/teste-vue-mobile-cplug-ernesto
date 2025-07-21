import CheckoutItem from './CheckoutItem.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';

const item = {
  productId: 1,
  quantity: 1,
  price: 19.9,
  name: 'Produto 1',
};

describe('CheckoutItem (Unit)', () => {
  it('Should mount component', () => {
    const wrapper = mount(CheckoutItem, {
      props: { ...item },
    });
    expect(wrapper.vm).toBeDefined();
  });
});
