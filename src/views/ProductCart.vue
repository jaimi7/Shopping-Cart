<script setup>
  import { ArrowPathIcon, NoSymbolIcon, TrashIcon } from "@heroicons/vue/24/solid";
  import AddToCart from "@/components/element/AddToCart.vue";
  import Axios from "@/plugin/axios";
  import api from "@/plugin/apis";
  import { ref, onMounted } from "vue";
  import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from "vue-router";
  import toast from '@/plugin/toast'

  const router = useRouter();
  const authStore = useAuthStore()

  const isLoading = ref(false);
  const cart = ref([])
  const totalAmount = ref(0)

  const mangeToCart = async (val, isIncreasing) => {
    val.isCartLoading = true

    const payload = {
      productId: val.productId._id,
      quantity: 1,
      isIncreasing: isIncreasing
    }

    await Axios.post(api.addCart, payload)
      .then(({ data }) => {
        let res = data.data
        cart.value = res.items.map(e => {
          return { ...e, isDeleting: false, isCartLoading: false }
        }) ?? []
        totalAmount.value = res.totalAmount

        authStore.setCartValue(cart.value?.length ?? 0)
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message)
      }).finally(() => {
        val.isCartLoading = false
      })
  }

  const getCart = async () => {
    isLoading.value = true;

    await Axios.get(api.getCart)
      .then(({ data }) => {
        cart.value = data.data.items.map(e => {
          return { ...e, isDeleting: false, isCartLoading: false }
        }) ?? []
        totalAmount.value = data.data.totalAmount
        authStore.setCartValue(cart.value?.length ?? 0)
      })
      .catch((er) => {
        console.error(er?.response?.data?.message)
      }).finally(() => {
        isLoading.value = false;
      })
  }

  const removeAll = async () => {
    cart.value = []
    authStore.setCartValue(0)
    await Axios.delete(api.deleteCart)
      .then(() => {
        toast.success("Remove All Item From Cart!")
      })
      .catch((er) => {
        console.error(er?.response?.data?.message)
      })
  }

  const deleteCartItem = async (val) => {
    val.isDeleting = true
    await Axios.delete(`${api.deleteCartItem}${val.productId._id}`)
      .then(({ data }) => {
        let res = data.data
        cart.value = res.items.map(e => {
          return { ...e, isDeleting: false, isCartLoading: false }
        }) ?? []
        totalAmount.value = res.totalAmount

        authStore.setCartValue(cart.value?.length ?? 0)
        toast.success(data.message)
      })
      .catch((er) => {
        console.error(er?.response?.data?.message)
      }).finally(() => {
        val.isDeleting = false
      })
  }

  onMounted(() => {
    getCart();
  });
</script>

<template>
  <div>
    <h1 class="auth-title flex items-center justify-evenly mt-1 sm:mt-2 md:mt-3 mb-2 sm:mb-4 md:mb-6">Cart
      <button v-if="!isLoading && cart?.length" class="icon-btn" @click="removeAll()">
        <TrashIcon /> Remove All From Cart
      </button>
    </h1>
    <div v-if="isLoading" class="no-data">
      <ArrowPathIcon class="loading-btn" /> Loading...
    </div>
    <table v-else-if="cart.length" class="m-auto rounded-xl md:w-5/6 lg:w-3/4">
      <tr class="text-sm sm:text-base md:text-lg lg:text-xl font-bold border-b-2 border-gray-600">
        <td class="table-pad"></td>
        <td class="table-pad">Item</td>
        <td class="table-pad hidden sm:block">Price</td>
        <td class="table-pad">Quantity</td>
        <td class="table-pad">Total</td>
      </tr>
      <tr v-for="i in cart" :key="i">
        <td>
          <ArrowPathIcon v-if="i.isDeleting" class="loading-btn text-red-600 cursor-pointer" />
          <TrashIcon v-else class="loading-btn text-red-600 cursor-pointer" @click="deleteCartItem(i)" />
        </td>
        <td class="table-pad flex space-x-1 sm:space-x-2 md:space-x-3 items-center">
          <img :src="i.productId.image" alt="Product Image"
            class="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />
          <div class="mr-2">
            <h3 class="text-xs sm:text-sm md:text-base font-semibold">
              {{ i.productId.title }}
            </h3>
            <p>
              <span class="text-xs md:text-sm text-yellow-700 font-semibold cursor-pointer hover:underline">
                {{ i.productId.category }}
              </span>
              <span class=" text-green-600 text-xs font-bold no-wrap sm:hidden">
                ₹ {{ i.price }} /-
              </span>
            </p>
          </div>
        </td>
        <td
          class="table-pad text-green-600 text-xs sm:text-sm md:text-base lg:text-lg font-bold no-wrap hidden sm:table-cell">
          ₹ {{ i.price }} /-
        </td>
        <td class="table-pad">
          <AddToCart :value="i.quantity" :isLoading="i.isCartLoading" @removeProduct="mangeToCart(i, false)"
            @addProduct="mangeToCart(i, true)" />
        </td>
        <td class="table-pad text-blue-700 text-xs sm:text-sm md:text-base lg:text-lg font-bold no-wrap">₹ {{ i.price *
          i.quantity }} /-</td>
      </tr>
      <tr class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold border-t-2 border-gray-600 bg-yellow-100">
        <td colspan="2" class="table-pad text-end">Total Amount</td>
        <td colspan="3" class="table-pad no-wrap">₹ {{ totalAmount.toFixed(2) }} /-</td>
      </tr>
    </table>
    <div v-else class="no-data">
      <NoSymbolIcon class="loading-btn" />
      <p>
        No Product Available <span class="hover:underline text-yellow-700 cursor-pointer" @click="router.push('/')">
          Back To Home</span>
      </p>
    </div>
  </div>
</template>
