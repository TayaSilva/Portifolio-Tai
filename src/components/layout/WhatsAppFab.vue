<script setup lang="ts">
import { whatsappHref } from '@/data/profile'
import BaseIcon from '../ui/BaseIcon.vue'
</script>

<template>
  <a
    class="fab metal"
    :href="whatsappHref"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Conversar com Taiane no WhatsApp (abre em nova aba)"
  >
    <BaseIcon name="whatsapp" :size="26" />
  </a>
</template>

<style scoped>
.fab {
  position: fixed;
  right: max(20px, env(safe-area-inset-right));
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: 70;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  animation: fabIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--intro-delay) + 0.3s) both;
}
/* reflexo que atravessa o botão a cada 8s */
.fab::before {
  content: '';
  position: absolute;
  top: -20%;
  bottom: -20%;
  left: -40%;
  width: 30%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.9), transparent);
  transform: translateX(-120%) skewX(-18deg);
  animation: sheen 8s ease-in-out 3s infinite;
  pointer-events: none;
}
@keyframes fabIn {
  from {
    transform: scale(0.4) translateY(24px);
    opacity: 0;
  }
}
@keyframes sheen {
  0%,
  86% {
    transform: translateX(-120%) skewX(-18deg);
  }
  100% {
    transform: translateX(650%) skewX(-18deg);
  }
}
@media (max-width: 767px) {
  .fab {
    width: 56px;
    height: 56px;
  }
}
</style>
