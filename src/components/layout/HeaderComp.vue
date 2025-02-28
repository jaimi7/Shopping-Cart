<script setup>
  import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
  import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from "vue-router";
  import { computed } from 'vue';
  import toast from '@/plugin/toast'

  const router = useRouter();
  const authStore = useAuthStore()

  const isLogin = computed(() => authStore.userData?.token ? true : false);

  const logout = () => {
    authStore.logOut()
    toast.success('User Logged Out successfully')
    router.push('/login')
  }
</script>

<template>
  <div class="flex justify-between items-center border-b-2 border-dotted h-16 sm:h-20 md:h-24 mx-2 sm:mx-3 md:mx-5">
    <div class="flex items-center cursor-pointer" @click="router.push('/')">
      <img alt="Logo" src="@/assets/img/logo.png" class="w-16 sm:w-20 md:w-24" />
      <div>
        <h1 class="text-xl sm:text-2xl md:text-3xl text-yellow-800 font-bold">Shopping</h1>
        <h2 class="text-xs sm:text-sm md:text-base text-yellow-500 italic">With Me</h2>
      </div>
    </div>

    <button v-if="!isLogin" class="button" @click="router.push('/signup')">Sign Up</button>

    <div v-if="isLogin" class=" flex items-center space-x-3 mr-5">
      <span class="cursor-pointer  text-gray-700 font-semibold hover:text-yellow-600 text-sm sm:text-base md:text-lg"
        @click="router.push('/')">Home</span>
      <span class="cursor-pointer  text-gray-700 font-semibold hover:text-yellow-600 text-sm sm:text-base md:text-lg"
        @click="logout()">Logout</span>
      <div class="relative cursor-pointer hover:bg-yellow-50 rounded-full" @click="router.push('/cart')">
        <ShoppingCartIcon class="w-8 sm:w-10 p-1 md:p-2" />
        <span
          class="absolute py-0.5 sm:py-1 px-1 sm:px-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded-full -top-2 -right-2 text-white">
          {{ authStore.cart }}
        </span>
      </div>
    </div>
  </div>
</template>
