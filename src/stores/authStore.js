import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const userData = ref(JSON.parse(localStorage.getItem('logInShopper') || '{}'))
  const cart = ref(0)

  const sessionStore = (user) => sessionStorage.setItem('authShopper', JSON.stringify(user))
  const sessionRemove = () => sessionStorage.removeItem('authShopper')

  const loginUser = (credentials) => {
    userData.value = credentials
    localStorage.setItem('logInShopper', JSON.stringify(userData.value))
  }

  const logOut = () => {
    userData.value = null
    localStorage.removeItem('logInShopper')
  }

  const setCartValue = (val) => (cart.value = val)

  return {
    userData,
    cart,
    sessionStore,
    sessionRemove,
    loginUser,
    logOut,
    setCartValue,
  }
})
