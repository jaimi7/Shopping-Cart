<script setup>
  import { ArrowPathIcon, NoSymbolIcon } from "@heroicons/vue/24/solid";
  import HeaderComp from "@/components/layout/HeaderComp.vue";
  import AddToCart from "@/components/element/AddToCart.vue";
  import Axios from "@/plugin/axios";
  import api from "@/plugin/apis";
  import swal from "@/plugin/sweetalert";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const products = ref([]);
  const isLoading = ref(false);
  const isLogin = ref(false);

  const getProducts = async () => {
    isLoading.value = true;

    await Axios.get(api.getProducts)
      .then(({ data }) => {
        products.value =
          data?.data?.map((e) => {
            return { ...e, isAdding: false };
          }) ?? [];
      })
      .catch((er) => {
        console.error(er?.response?.data?.message);
      }).finally(() => {
        isLoading.value = false;
      });
  };

  const addMenuToCart = (val) => {
    if (!isLogin.value) {
      swal
        .fire({
          title: "No Access Granted",
          text: "First You Should Sig Up Or Login To System.",
          icon: "warning",
          showCancelButton: false,
        })
        .then((result) => {
          if (result.isConfirmed) router.push("/signup");
        });
    }
    console.log(val);
  };

  onMounted(() => {
    getProducts();
  });
</script>

<template>
  <main>
    <HeaderComp />

    <div v-if="isLoading" class="no-data">
      <ArrowPathIcon class="loading-btn" /> Loading...
    </div>
    <div v-else-if="products.length" class="flex items-center justify-evenly flex-wrap">
      <div v-for="i in products" :key="i._id"
        class="rounded-lg w-40 sm:w-64 md:w-72 lg:w-80 mx-2 sm:mx-3 md:mx-5 my-3 sm:my-6 md:my-10 shadow-xl border border-slate-100">
        <img :src="i.image" :alt="i.title"
          class="rounded-lg w-full h-52 sm:h-64 md:h-80 lg:h-96 object-contain cursor-pointer"
          @click="router.push(`/product/${i._id}`)" />
        <div class="p-2 sm:p-3 md:p-5">
          <h2 class="text-gray-800 font-semibold ellipsis-2 cursor-pointer text-sm md:text-base"
            @click="router.push(`/product/${i._id}`)">
            {{ i.title }}
          </h2>
          <p class="flex items-center justify-between text-xs sm:text-sm md:text-base font-semibold">
            <span class="text-green-600">{{ i.category }}</span>
            <span class="text-blue-700">₹ {{ i.price }}/-</span>
          </p>
          <p class="text-xs sm:text-sm text-gray-600 my-1 sm:my-2 md:my-3 w-full ellipsis-3">
            {{ i.description }}
          </p>

          <AddToCart v-if="i.cart" :value="0" :isLoading="i.isAdding" />
          <button v-else :disabled="i.isAdding" class="icon-btn" @click="addMenuToCart(i)">
            <ArrowPathIcon v-if="i.isAdding" /> Add To Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <NoSymbolIcon class="loading-btn" /> No Product Available
    </div>
  </main>
</template>

<style scoped>
  .ellipsis-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .ellipsis-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
