<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex justify-between items-center m-5 pb-5 border-b-2 border-dotted">
    <div class="flex items-center cursor-pointer" @click="router.push('/')">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />
      <div>
        <h1 class="text-4xl text-red-800 font-bold">NewMe</h1>
        <h2 class="text-base text-red-500 italic">Sneakers</h2>
      </div>
    </div>
    <div class="text-xl text-gray-600 cursor-pointer">
      <RouterLink to="/dashboard" class="p-5 hover:text-2xl hover:text-gray-800">Home</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-gray-800">Men</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-gray-800">Women</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-gray-800">Explore</RouterLink>
    </div>
  </div>
</template>
