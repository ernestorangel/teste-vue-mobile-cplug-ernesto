import SaleItem from './SaleItem.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';

const sale = {
  id: 1,
  items: [],
  total: 49.9,
  date: new Date(),
  status: 'completed',
};

describe('SaleItem (Unit)', () => {
  it('Should mount component', () => {
    const wrapper = mount(SaleItem, {
      props: { ...sale },
    });
    expect(wrapper.vm).toBeDefined();
  });
});
