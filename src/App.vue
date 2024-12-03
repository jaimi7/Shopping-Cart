<script setup>
import HeaderMenu from './components/layout/HeaderMenu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <HeaderMenu />
  </div>

  <RouterView />
</template>
