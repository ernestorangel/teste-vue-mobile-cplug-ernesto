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
        },
        {
            id: 4,
            name: 'Produto 4',
            price: 17.5,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 2'
        },
        {
            id: 5,
            name: 'Produto 5',
            price: 92.2,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 1'
        },
        {
            id: 6,
            name: 'Produto 6',
            price: 34.5,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 2'
        },
        {
            id: 7,
            name: 'Produto 7',
            price: 74.6,
            image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec luctus purus. Pellentesque malesuada erat at lectus accumsan feugiat. Suspendisse mollis eget lorem in tincidunt. Etiam eu eros hendrerit, tincidunt felis volutpat, ornare eros.',
            category: 'Category 1'
        }
    ])
    return { products }
})