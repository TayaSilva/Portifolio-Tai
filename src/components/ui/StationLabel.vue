<script setup lang="ts">
import StarIcon from './StarIcon.vue'

defineProps<{ number: string }>()
</script>

<template>
  <p class="station">
    <StarIcon :size="12" class="text-accent" />
    Estação {{ number }}
  </p>
</template>

<style scoped>
.station {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: var(--accent-text);
}
</style>
