<script setup>
import { computed, ref } from "vue";
import { useShoesStore } from "@/stores/shoesStore";
import { useRouter } from "vue-router";

const shoesStore = useShoesStore();
const router = useRouter();
const search = ref("");

const searchedShoes = computed(() => {
  if (!search.value || search.value.length < 2) return [];

  return shoesStore.shoes.filter((e) => e.title.toLowerCase().includes(search.value.toLowerCase()));
});

const searchingShoes = (shoes) => {
  router.push({ name: "shoes", params: { id: shoes.id } });
};
</script>

<template>
  <div class="place-items-center">
    <div class="relative p-5">
      <input
        type="search"
        v-model="search"
        class="w-80 p-3 pl-10 text-gray bg-gray-50 rounded-lg focus:outline-none border border-gray"
        placeholder="Search Shoes ..."
      />
      <ul class="absolute bg-[#eee] m-3 left-2 z-10 w-80 overflow-y-auto max-h-[50vh] scrollbar-hide">
        <li
          class="p-2 hover:bg-gray-300"
          v-for="shoes in searchedShoes"
          :key="shoes.id"
          @click="(search = ''), searchingShoes(shoes)"
        >{{ shoes.title }}</li>
      </ul>
    </div>
  </div>
</template>
