<script setup lang="ts">
import { contact, whatsappHref } from '@/data/profile'
import type { IconName } from '@/types'
import BaseIcon from '../ui/BaseIcon.vue'

const links: { label: string; href: string; icon: IconName }[] = [
  { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: contact.github, icon: 'github' },
  { label: 'WhatsApp', href: whatsappHref, icon: 'whatsapp' },
]
</script>

<template>
  <nav class="rail" aria-label="Redes sociais">
    <a
      v-for="l in links"
      :key="l.label"
      :href="l.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${l.label} (abre em nova aba)`"
    >
      <BaseIcon :name="l.icon" />
    </a>
  </nav>
</template>

<style scoped>
.rail {
  position: fixed;
  left: 16px;
  bottom: 40px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rail a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text);
  background: color-mix(in oklab, var(--rose) 22%, transparent);
  border: 1px solid color-mix(in oklab, var(--accent) 22%, transparent);
  transition:
    transform 0.2s ease-out,
    color 0.2s ease-out,
    background-color 0.2s ease-out,
    border-color 0.2s ease-out;
}
.rail a:hover {
  transform: translateY(-2px);
  color: var(--accent-text);
  background: color-mix(in oklab, var(--rose) 55%, transparent);
  border-color: color-mix(in oklab, var(--accent) 45%, transparent);
}
@media (max-width: 767px) {
  .rail {
    display: none;
  }
}
</style>
