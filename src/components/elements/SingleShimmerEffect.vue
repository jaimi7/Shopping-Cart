<template>
  <div class="flex-center flex-wrap">
    <div>
      <div
        class="m-5 grid-center border border-gray-200 rounded-sm"
        v-for="i in 4"
        :key="i"
      >
        <div class="m-2 w-12 h-12 bg-gray-200"></div>
      </div>
    </div>
    <div class="p-5 border border-gray-200 rounded-sm w-96 m-5">
      <div class="w-full h-80 bg-gray-200"></div>
    </div>
    <div class="p-5 border border-gray-200 rounded-sm w-96 m-5 space-y-5">
      <p class="bg-gray-200 mt-4 py-4 px-14 rounded-md animate-pulse"></p>
      <p class="bg-gray-200 mb-2 h-8 w-16 rounded-md animate-pulse"></p>
      <p class="bg-gray-200 mt-4 py-4 px-14 w-52 rounded-md animate-pulse"></p>
      <p class="bg-gray-200 mb-2 h-8 w-32 rounded-md animate-pulse"></p>
      <button class="bg-gray-200 mb-2 py-4 px-14 rounded-md animate-pulse"></button>
      <p class="bg-gray-200 mt-4 py-4 px-14 w-52 rounded-md animate-pulse"></p>
    </div>
  </div>
</template>
