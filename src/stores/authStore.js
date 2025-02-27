import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const userData = ref(JSON.parse(localStorage.getItem('logInUser') || '{}'))

  const sessionStore = (user) => sessionStorage.setItem('authUser', JSON.stringify(user))
  const sessionRemove = () => sessionStorage.removeItem('authUser')

  const loginUser = (credentials) => {
    userData.value = credentials
    localStorage.setItem('logInUser', JSON.stringify(userData.value))
  }

  const logOut = () => {
    userData.value = null
    localStorage.removeItem('logInUser')
  }

  return {
    userData,
    sessionStore,
    sessionRemove,
    loginUser,
    logOut,
  }
})
