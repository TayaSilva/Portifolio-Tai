<script setup lang="ts">
import StationLabel from './StationLabel.vue'

defineProps<{ number: string; title: string; headingId: string }>()
</script>

<template>
  <header class="rv mb-11 flex flex-col gap-3.5">
    <StationLabel :number="number" />
    <h2 :id="headingId" class="g h2">{{ title }}</h2>
    <slot />
  </header>
</template>
