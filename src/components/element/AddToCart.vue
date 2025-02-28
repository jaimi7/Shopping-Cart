<script setup>
  import { ArrowPathIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'

  const props = defineProps({
    isLoading: Boolean,
    value: Number,
  })

  const emit = defineEmits(['removeProduct', 'addProduct'])
</script>

<template>
  <div class="flex items-center space-x-3">
    <button :disabled="props.isLoading" class="button p-1 md:p-2" @click="emit('removeProduct')">
      <MinusIcon class="w-4 md:w-6" />
    </button>
    <ArrowPathIcon v-if="props.isLoading" class="w-4 md:w-6 text-yellow-700" />
    <span v-else class="font-semibold text-sm sm:text-base md:text-lg p-0 md:p-1.5">
      {{ value }}
    </span>
    <button :disabled="props.isLoading" class="button p-1 md:p-2" @click="emit('addProduct')">
      <PlusIcon class="w-4 md:w-6" />
    </button>
  </div>
</template>
