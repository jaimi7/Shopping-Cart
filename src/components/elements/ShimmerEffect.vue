<template>
  <div class="flex-center flex-wrap">
    <div
      v-for="i in 3"
      :key="i"
      class="p-4 border border-gray-200 rounded-sm w-80 m-5"
    >
      <div class="w-full h-48 bg-gray-200"></div>
      <div class="space-y-4">
        <h4 class="bg-gray-200 mt-4 py-4 px-14 rounded-md animate-pulse"></h4>
        <h4 class="bg-gray-200 mb-2 h-8 w-16 rounded-md animate-pulse"></h4>
        <button class="bg-gray-200 mb-2 py-4 px-14 rounded-md animate-pulse"></button>
      </div>
    </div>
  </div>
</template>
