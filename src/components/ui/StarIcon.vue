<script setup lang="ts">
/** Estrela de quatro pontas: o ícone da marca */
withDefaults(defineProps<{ size?: number | string }>(), { size: '100%' })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 0C12.8 7.2 16.8 11.2 24 12C16.8 12.8 12.8 16.8 12 24C11.2 16.8 7.2 12.8 0 12C7.2 11.2 11.2 7.2 12 0Z"
      fill="currentColor"
    />
  </svg>
</template>
