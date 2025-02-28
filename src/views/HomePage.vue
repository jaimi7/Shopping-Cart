<script setup>
  import { ArrowPathIcon, NoSymbolIcon } from "@heroicons/vue/24/solid";
  import AddToCart from "@/components/element/AddToCart.vue";
  import Axios from "@/plugin/axios";
  import api from "@/plugin/apis";
  import swal from "@/plugin/sweetalert";
  import { ref, onMounted, computed } from "vue";
  import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from "vue-router";
  import toast from '@/plugin/toast'

  const router = useRouter();
  const authStore = useAuthStore()

  const products = ref([]);
  const product = ref(null)
  const isLoading = ref(false);
  const cart = ref([])
  const search = ref()

  const searchedProducts = computed(() => {
    if (search.value) return products.value.filter((e) => e.title.toLowerCase().includes(search.value.toLowerCase()));
    return products.value
  })
  const isLogin = computed(() => authStore.userData?.token ? true : false);

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

  const addToCart = (val) => {
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
    } else mangeToCart(val, true)
  };

  const mangeToCart = async (val, isIncreasing) => {
    val.isAdding = true

    const payload = {
      productId: val._id,
      quantity: 1,
      isIncreasing: isIncreasing
    }

    await Axios.post(api.addCart, payload)
      .then(({ data }) => {
        let res = data.data
        cart.value = res.items.map(e => {
          return { productId: e.productId._id, _id: e._id, quantity: e.quantity }
        }) ?? []
        authStore.setCartValue(cart.value?.length ?? 0)
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message)
      }).finally(() => {
        val.isAdding = false
      })
  }

  const getCart = async () => {
    await Axios.get(api.getCart)
      .then(({ data }) => {
        cart.value = data.data.items.map(e => {
          return { productId: e.productId._id, _id: e._id, quantity: e.quantity }
        }) ?? []
        authStore.setCartValue(cart.value?.length ?? 0)
      })
      .catch((er) => {
        console.error(er?.response?.data?.message)
      })
  }

  const openSidebar = (i) => {
    product.value = i
    document.getElementById('sidebar').classList.add('open')
    document.getElementById('overlay').classList.add('active')
  }

  const closeSidebar = () => {
    product.value = null
    setTimeout(() => {
      document.getElementById('sidebar').classList.remove('open')
      document.getElementById('overlay').classList.remove('active')
    }, 200)
  }

  onMounted(() => {
    getProducts();
    getCart();
  });
</script>

<template>
  <main>
    <h1 class="auth-title text-center my-2 sm:my-3 md:my-5">Products</h1>
    <div class="px-5 sm:w-2/3 m-auto">
      <input type="search" v-model="search" class="input" placeholder="Search Your Product">
    </div>
    <div v-if="isLoading" class="no-data">
      <ArrowPathIcon class="loading-btn" /> Loading...
    </div>
    <div v-else-if="searchedProducts.length" class="flex items-center justify-evenly flex-wrap">
      <div v-for="i in searchedProducts" :key="i._id"
        class="rounded-lg w-40 sm:w-64 md:w-72 lg:w-80 mx-2 sm:mx-3 md:mx-5 my-3 sm:my-6 md:my-10 shadow-xl border border-yellow-100 p-2 sm:p-3 md:p-5">
        <img :src="i.image" :alt="i.title"
          class="rounded-lg w-full h-52 sm:h-64 md:h-80 lg:h-96 object-contain cursor-pointer"
          @click="openSidebar(i)" />
        <div class="pt-2 sm:pt-3 md:pt-5">
          <h2 class="text-gray-800 font-semibold ellipsis-2 cursor-pointer text-sm md:text-base"
            @click="openSidebar(i)">
            {{ i.title }}
          </h2>
          <p class="flex items-center justify-between text-xs sm:text-sm md:text-base font-semibold flex-wrap">
            <span class="text-green-600">{{ i.category }}</span>
            <span class="text-blue-700">₹ {{ i.price }}/-</span>
          </p>
          <p class="text-xs sm:text-sm text-gray-600 my-1 sm:my-2 md:my-3 w-full ellipsis-3">
            {{ i.description }}
          </p>
          <AddToCart v-if="cart?.find((e) => e.productId == i._id)"
            :value="cart?.find((e) => e.productId == i._id)?.quantity ?? 0" :isLoading="i.isAdding"
            @removeProduct="mangeToCart(i, false)" @addProduct="mangeToCart(i, true)" />
          <button v-else :disabled="i.isAdding" class="icon-btn" @click="addToCart(i)">
            <ArrowPathIcon v-if="i.isAdding" /> Add To Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <NoSymbolIcon class="loading-btn" /> No Product Available
    </div>

    <div class="block sm:hidden overlay" id="overlay" @click="closeSidebar()"></div>
    <div class="sidebar p-5 shadow-xl" id="sidebar" @click="closeSidebar()">
      <!-- {{ product }} -->
      <h3 class="text-yellow-700 font-bold text-base sm:text-2xl">{{ product?.title }}</h3>
      <p class="flex items-center justify-between text-xs sm:text-sm md:text-base font-semibold flex-wrap">
        <span class="text-green-600">{{ product?.category }}</span>
        <span class="text-blue-700">₹ {{ product?.price }}/-</span>
      </p>

      <img :src="product?.image" :alt="product?.title"
        class="border border-yellow-100 my-2 sm:my-3 md:my-5 rounded-lg w-full h-52 sm:h-64 md:h-80 lg:h-96 object-contain cursor-pointer">

      <p class="text-xs sm:text-sm text-gray-600 my-1 sm:my-2 md:my-3 w-full">
        {{ product?.description }}
      </p>
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

  .sidebar {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100%;
    background: #fff;
    transition: 0.3s;
  }

  .sidebar.open {
    box-shadow: 0px 0px 12px 0px #999;
    right: 0;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: none;
  }

  .overlay.active {
    display: block;
  }

  @media screen and (max-width: 640px) {
    .sidebar {
      right: -200px;
      width: 200px;
      max-width: 100vw;
    }
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      right: -300px;
      width: 300px;
    }
  }
</style>
