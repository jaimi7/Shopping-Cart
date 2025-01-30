<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useShoesStore } from "@/stores/shoesStore";

const router = useRouter();
const shoesStore = useShoesStore();
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
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-red-800">Home</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-red-800">Men</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-red-800">Women</RouterLink>
      <RouterLink to="/" class="p-5 hover:text-2xl hover:text-red-800">Explore</RouterLink>
    </div>

    <RouterLink to="/cart">
      <div class="w-5.5 h-5.2 rounded-full ml-0.5 text-center bg-red-700">
        <span class="text-white text-sm">{{ shoesStore.cartQuantity }}</span>
      </div>
      <img src="@/assets/img/cart.svg" alt="cart" width="25px" />
    </RouterLink>
  </div>
</template>
