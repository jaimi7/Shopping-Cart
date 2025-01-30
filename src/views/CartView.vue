<script setup>
import { useShoesStore } from "@/stores/shoesStore";

const shoesStore = useShoesStore();

const calculateMRP = (price, discountPercentage) => {
  let mrp = price / (1 - discountPercentage / 100);
  return mrp.toFixed(2);
};
</script>

<template>
  <div>
    <table class="w-full">
      <tbody>
        <tr v-for="s in shoesStore.cart" :key="s.id" class="border">
          <td>
            <img :src="s.images?.[0]" :alt="s.title" class="w-28 h-28 rounded-md" />
          </td>
          <td>{{ s.title }}</td>
          <td class="font-bold">
            <span
              class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-800 ring-1 ring-red-600/20 ring-inset"
              >- {{ s.discountPercentage }}%</span
            >
            <p>Price: ₹ {{ s.price }} /-</p>
            <p class="text-sm text-gray-500 mb-5">
              M.R.P.:
              <span class="line-through"
                >₹ {{ calculateMRP(s.price, s.discountPercentage) }} /-</span
              >
            </p>
          </td>
          <td>Quantity: {{ shoesStore.itemQuantity(s) }}</td>
          <td>
            <div class="flex items-center space-x-2">
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
            <p
              v-if="s.minimumOrderQuantity == shoesStore.itemQuantity(s)"
              class="mt-2 text-red-600 font-bold"
            >
              No more stock available.
            </p>
          </td>
        </tr>
        <tr class="border">
          <td colspan="5" class="place-items-center p-2">
            <h2 v-if="shoesStore.cartQuantity === 0" class="font-bold text-2xl">
              Your Cart Is Empty
              <RouterLink to="/" class="p-5 mb-3 text-xl text-blue-800"
                >(Back to Home)</RouterLink
              >
            </h2>
            <p v-else class="font-bold text-2xl">
              Total: ₹ {{ shoesStore.productTotal.toFixed(2) }} /-
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
