import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'

export const useShoesStore = defineStore('shoes', () => {
  const shoes = ref([])
  const cart = useStorage('cart', [])
  const loading = ref(false)

  const cartQuantity = computed(() => cart.value?.length)

  const itemQuantity = computed(
    () => (product) => cart.value.find((item) => item.id === product.id)?.quantity
  )

  const productTotal = computed(() =>
    cart.value.reduce((val, item) => val + item.quantity * item.price, 0),
  )

  async function getShoes() {
    loading.value = true
    shoes.value = []
    const response1 = await axios.get('https://dummyjson.com/products/category/womens-shoes')
    response1.data?.products.map((product) => {
      shoes.value.push(product)
    })
    const response2 = await axios.get('https://dummyjson.com/products/category/mens-shoes')
    response2.data?.products.map((product) => {
      shoes.value.push(product)
    })
    loading.value = false
  }

  function addToCart(product) {
    const item = cart.value.find((item) => item.id === product.id)
    if (item) item.quantity++
    else cart.value.push({ ...product, quantity: 1 })
  }

  function removeFromCart(product) {
    const item = cart.value.find((item) => item.id === product.id)
    if (item) {
      if (item.quantity > 1) item.quantity--
      else cart.value = cart.value.filter((item) => item.id !== product.id)
    }
  }

  return {
    shoes,
    cart,
    loading,
    cartQuantity,
    itemQuantity,
    productTotal,
    getShoes,
    addToCart,
    removeFromCart,
  }
})
