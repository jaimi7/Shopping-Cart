<script setup>
  import HeaderComp from "@/components/layout/HeaderComp.vue";
  import { ref, watch } from "vue";
  import { RouterView, useRoute } from 'vue-router'

  const route = useRoute()
  const isHideHeader = ref(false)

  watch(route, () => {
    isHideHeader.value = route?.meta?.header !== false
  })
</script>

<template>
  <div>
    <HeaderComp v-if="isHideHeader" />
    <RouterView />
  </div>
</template>
