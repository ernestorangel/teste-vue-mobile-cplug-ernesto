import { defineStore } from 'pinia'
import type { Product } from '../../types'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([
        {
            id: 1,
            name: 'Produto 1',
            price: 19.9,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 1'
        },
        {
            id: 2,
            name: 'Produto 2',
            price: 39.9,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 2'
        },
        {
            id: 3,
            name: 'Produto 3',
            price: 22.5,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 3'
        }
    ])
    return { products }
})