<script setup>
  import { ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/solid'
  import { useRouter } from "vue-router";
  import { ref } from 'vue';

  const router = useRouter();
  const isLogin = ref(true)

  const logout = () => { }
</script>

<template>
  <div class="flex justify-between items-center border-b-2 border-dotted h-16 sm:h-20 md:h-24 mx-2 sm:mx-3 md:mx-5">
    <div class="flex items-center cursor-pointer" @click="router.push('/')">
      <img alt="Logo" src="@/assets/img/logo.png" class="w-16 sm:w-20 md:w-24" />
      <div>
        <h1 class="text-xl sm:text-2xl md:text-3xl text-red-800 font-bold">Shopping</h1>
        <h2 class="text-xs sm:text-sm md:text-base text-red-500 italic">With Me</h2>
      </div>
    </div>

    <div v-if="isLogin" class=" flex items-center space-x-3 mr-5">
      <span class="cursor-pointer  text-gray-700 font-semibold hover:text-red-600 text-sm sm:text-base md:text-lg"
        @click="logout()">Logout</span>
      <div class="relative cursor-pointer hover:bg-red-50 rounded-full">
        <ShoppingCartIcon class="w-8 sm:w-10 p-1 md:p-2" />
        <span
          class="absolute py-0.5 sm:py-1 px-1 sm:px-2 text-xs bg-red-500 hover:bg-red-600 rounded-full -top-2 -right-2 text-white">
          10
        </span>
      </div>
    </div>
  </div>
</template>
