import ProductCard from './ProductCard.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';
import { createPinia } from 'pinia';
import { useCartStore } from '../store/modules/cart';
import fallbackImg from '../assets/images/img-fallback.png';

const product = {
  id: 1,
  name: 'Produto Teste',
  price: 19.9,
  image: 'Produto Teste',
  description: 'Produto Teste',
};

describe('ProductCard (Unit)', () => {
  it('Should mount component', () => {
    const wrapper = mount(ProductCard, {
      props: { ...product },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it('should load fallback image', () => {
    const wrapper = mount(ProductCard, {
      props: { ...product },
    });

    const img = wrapper.find('[data-testid="product-img"]');

    expect(img.attributes('src')).toBe(fallbackImg);
  });

  it('should call add item store function on add to cart button click', async () => {
    const pinia = createPinia();
    const cart = useCartStore(pinia);

    const addItemSpy = vi.spyOn(cart, 'addItem');

    const wrapper = mount(ProductCard, {
      props: { ...product },
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

    expect(addItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should call add item store function with correct value', async () => {
    const pinia = createPinia();
    const cart = useCartStore(pinia);

    const addItemSpy = vi.spyOn(cart, 'addItem');

    const wrapper = mount(ProductCard, {
      props: { ...product },
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

    expect(addItemSpy).toHaveBeenCalledWith({
      productId: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
    });
  });

  it('should add item to cart store on add to cart button click', async () => {
    const pinia = createPinia();
    const cart = useCartStore(pinia);

    const wrapper = mount(ProductCard, {
      props: { ...product },
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

    expect(cart.items.some((item) => item.productId === product.id)).toBe(true);
  });
});
