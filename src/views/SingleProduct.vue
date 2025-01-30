<script setup>
import { useShoesStore } from "@/stores/shoesStore";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SingleShimmerEffect from "@/components/elements/SingleShimmerEffect.vue";
import SearchBar from "@/components/elements/SearchBar.vue";

const route = useRoute();
const shoesStore = useShoesStore();
const shoes = ref("");
const loading = ref(false);
const displayImage = ref("");
const params = computed(() => route.params.id);

const addToCart = () => {
  shoesStore.addToCart(shoes.value);
};

const calculateMRP = () => {
  let mrp = shoes.value.price / (1 - shoes.value.discountPercentage / 100);
  return mrp.toFixed(2);
};

const formateDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(date));
};

watch(params, () => {
  getShoes();
});

const getShoes = async () => {
  if (!params.value) return;
  loading.value = true;
  const response = await axios.get(`https://dummyjson.com/products/${params.value}`);
  shoes.value = response.data;
  displayImage.value = shoes.value.images?.[0];
  loading.value = false;
};

getShoes();
</script>

<template>
  <div>
    <SearchBar />
    <SingleShimmerEffect v-if="loading" />
    <div v-else class="flex justify-center items-center flex-wrap">
      <div>
        <div
          class="grid-center border border-gray-200 mx-3 cursor-pointer"
          v-for="img in shoes?.images ?? []"
          :key="img"
          @click="displayImage = img"
        >
          <img :src="img" :alt="shoes.title" class="w-24 h-24" />
        </div>
      </div>
      <div class="grid-center border border-gray-200">
        <img :src="displayImage" :alt="shoes.title" class="w-96 h-96" />
      </div>
      <div :key="shoes.id" class="px-4 border border-red-100 rounded-sm w-fit h-96 m-10">
        <div class="p-2">
          <h1 class="font-bold text-4xl line-clamp-1">{{ shoes.title }}</h1>
          <p class="mb-5">
            ( {{ shoes.brand }} )
            <span class="text-gray-600">{{ shoes.category }}</span>
          </p>
          <p class="mb-2">
            <span
              v-for="tag in shoes.tags"
              :key="tag"
              class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset"
              >{{ tag }}</span
            >
          </p>
          <h4 class="font-bold text-2xl">
            Price:
            <span class="text-red-700 px-3"> - {{ shoes.discountPercentage }}% </span>
            ₹ {{ shoes.price }} /-
          </h4>
          <p class="text-lg text-gray-700 mb-3">
            M.R.P.: <span class="line-through">₹ {{ calculateMRP() }} /-</span>
          </p>
          <p class="mb-5 text-xl text-gray-900">Inclusive of all taxes</p>
          <div v-if="shoesStore.itemQuantity(shoes)" class="flex items-center space-x-2">
            <button @click="shoesStore.removeFromCart(shoes)" class="cartBtn">-</button>
            <p class="px-2">{{ shoesStore.itemQuantity(shoes) }}</p>
            <button
              @click="shoesStore.addToCart(shoes)"
              :disabled="shoes.minimumOrderQuantity == shoesStore.itemQuantity(shoes)"
              class="cartBtn"
            >
              +
            </button>
          </div>
          <button v-else class="addToCart" @click="addToCart()">Add To Cart</button>
          <p
            v-if="shoes.minimumOrderQuantity == shoesStore.itemQuantity(shoes)"
            class="mt-2 text-red-600 font-bold"
          >
            You can only add up to {{ shoes.minimumOrderQuantity }} shoes. No more stock
            available.
          </p>
        </div>
      </div>
      <div class="flex justify-start items-start w-full">
        <div class="flex-1 border border-gray-200 m-5 p-5">
          <p class="pt-4">
            <span class="text-xl font-bold">Description</span>
            <span class="mx-2">{{ shoes.description }}</span>
          </p>
          <p class="pt-4">
            <span class="text-xl font-bold">Shipping Information</span>
            <span class="mx-2">{{ shoes.shippingInformation }}</span>
          </p>
          <p class="pt-4">
            <span class="text-xl font-bold">Warranty Information</span>
            <span class="mx-2">{{ shoes.warrantyInformation }}</span>
          </p>
          <p class="pt-4">
            <span class="text-xl font-bold">Return Policy</span>
            <span class="mx-2">{{ shoes.returnPolicy }}</span>
          </p>
        </div>
        <div class="flex-1 border border-gray-200 m-5 p-5">
          <h2 class="text-3xl">Top reviews</h2>
          <div
            v-for="review in shoes.reviews"
            :key="review.date"
            class="border border-gray-200 m-5 p-5"
          >
            <div class="flex justify-start items-center">
              <img
                src="https://m.media-amazon.com/images/S/amazon-avatars-global/default.png"
                alt="Customers"
                class="w-12"
              />
              <h4>
                <span class="mx-3 font-bold text-2xl">{{ review.reviewerName }}</span>
                <span class="text-gray-600">{{ formateDate(review.date) }}</span>
              </h4>
            </div>
            <p class="pt-5">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
