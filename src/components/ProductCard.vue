<template>
  <div class="product-card-container">
    <div class="product-card-image-container">
      <img
        data-testid="product-img"
        :src="finalSrc"
        :alt="props.description"
        loading="lazy"
        class="product-card-image"
      />
    </div>
    <div class="product-card-info">
      <div class="product-card-name" v-html="highlight(props.name)"></div>
      <div>
        <div class="product-card-info-title">Descrição</div>
        <div
          :title="props.description"
          v-html="highlight(props.description)"
          class="product-card-description"
        ></div>
      </div>
      <div>
        <div class="product-card-info-title">Categoria</div>
        <div v-html="highlight(props.category)"></div>
      </div>
      <div>
        <div class="product-card-info-title">Valor unitário</div>
        <div class="product-card-price">
          {{ productPrice }}
        </div>
      </div>
    </div>
    <div class="product-card-actions">
      <button data-testid="add-to-cart-btn" @click="addToCart" class="add-to-cart-button">
        Adicionar ao carrinho
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/modules/cart';
import { formatMoneyFromNumber } from '../utils/helpers';
import { ref, computed, onMounted } from 'vue';
import fallbackImg from '../assets/images/img-fallback.png';

const props = defineProps([
  'id',
  'name',
  'price',
  'image',
  'description',
  'category',
  'searchTerm',
]);

const finalSrc = ref(fallbackImg);

const productPrice = computed(() => {
  return formatMoneyFromNumber(props.price);
});

onMounted(() => {
  const img = new Image();
  img.src = props.image;
  img.onload = () => {
    finalSrc.value = props.image;
  };
  img.onerror = () => {
    finalSrc.value = fallbackImg;
  };
});

function addToCart() {
  useCartStore().addItem({
    productId: props.id,
    quantity: 1,
    price: props.price,
    name: props.name,
  });
}

function highlight(text: string) {
  if (!props.searchTerm) return text;
  const regex = new RegExp(`(${props.searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
</script>

<style scoped>
.product-card-container {
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  /* border: 1px solid var(--second-blue-light); */
  background-color: var(--foreground-color);
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}
.product-card-image-container {
  width: 100%;
  min-height: 180px;
  overflow: hidden;
  place-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.product-card-image {
  width: 100%;
  height: 100%;
}
.product-card-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 24px;
}
.product-card-name {
  font-size: 1.2rem;
  font-weight: 600;
}
.product-card-info-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-faded-color);
}
.product-card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color: gray;
  /* text-align: justify; */
}
.product-card-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--blue-main);
}
.product-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 24px 24px 24px;
}
.product-card-button {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
}
.product-card-button:hover {
  background-color: rgb(94, 94, 94);
}
.add-to-cart-button {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--foreground-color);
  border: 1px solid var(--border-color);
  font-size: 1rem;
  cursor: pointer;
  transition: ease-in-out;
  transition-duration: 0.15s;
}
.add-to-cart-button:hover {
  background-color: var(--background-color);
}
</style>
