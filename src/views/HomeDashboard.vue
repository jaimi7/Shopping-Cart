<script setup>
import { ref, watchEffect } from "vue";
import { useShoesStore } from "@/stores/shoesStore";
import ShimmerEffect from "@/components/elements/ShimmerEffect.vue";
import SearchBar from "@/components/elements/SearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const shoes = ref([]);
const shoesStore = useShoesStore();

const addToCart = (s) => {
  shoesStore.addToCart(s);
};

const searchingShoes = (shoes) => {
  router.push({ name: "shoes", params: { id: shoes.id } });
};

const calculateMRP = (price,discountPercentage) => {
  let mrp = price / (1 - discountPercentage / 100);
  return mrp.toFixed(2);
};

watchEffect(() => {
  shoesStore.getShoes();
});

watchEffect(() => {
  loading.value = shoesStore.loading;
  shoes.value = shoesStore.shoes;
});
</script>

<template>
  <div>
    <SearchBar />
    <ShimmerEffect v-if="loading" />
    <div v-else class="flex-center flex-wrap">
      <div
        v-for="s in shoes"
        :key="s.id"
        class="px-4 border border-red-100 rounded-sm w-80 m-10"
      >
        <div class="grid-center cursor-pointer" @click="searchingShoes(s)">
          <img :src="s.images?.[0]" :alt="s.title" class="w-64 h-64" />
        </div>
        <div class="space-y-3 py-3">
          <h1 class="font-bold line-clamp-1">{{ s.title }}</h1>

          <h4 class="font-bold">
            Price:
            <span class="text-red-700 px-3"> - {{ s.discountPercentage }}% </span>
            ₹ {{ s.price }} /-
          </h4>
          <span class="text-sm text-gray-700 mb-5">
            M.R.P.: <span class="line-through">₹ {{ calculateMRP(s.price,s.discountPercentage) }} /-</span>
          </span>
          <div v-if="shoesStore.itemQuantity(s)" class="flex items-center space-x-2">
            <button
              @click="shoesStore.removeFromCart(s)"
              class="cartBtn"
            >
              -
            </button>
            <p class="px-2">{{ shoesStore.itemQuantity(s) }}</p>
            <button
              @click="shoesStore.addToCart(s)"
              :disabled="s.minimumOrderQuantity == shoesStore.itemQuantity(s)"
              class="cartBtn"
            >
              +
            </button>
          </div>
          <button
            v-else
            class="addToCart block"
            @click="addToCart(s)"
          >
            Add To Cart
          </button>
          <p
            v-if="s.minimumOrderQuantity == shoesStore.itemQuantity(s)"
            class="text-red-600 font-bold text-sm"
          >
            No more stock available.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
