<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '@/composables/useNavigation'
import { sections } from '@/data/profile'
import type { SectionId } from '@/types'
import BaseIcon from '../ui/BaseIcon.vue'
import BrandLogo from '../ui/BrandLogo.vue'
import HeaderSearch from './HeaderSearch.vue'
import ThemeToggle from './ThemeToggle.vue'

const { navigate } = useNavigation()
const searching = ref(false)
const menuOpen = ref(false)
const navItems = sections.filter((s) => s.id !== 'inicio')

function go(id: SectionId) {
  menuOpen.value = false
  navigate(id)
}
</script>

<template>
  <header class="hdr" :class="{ searching }" @keydown.esc="menuOpen = false">
    <a href="#inicio" class="logo" aria-label="Taiane Silva · Início" @click.prevent="go('inicio')">
      <BrandLogo />
    </a>

    <nav class="nav" aria-label="Navegação principal">
      <a v-for="s in navItems" :key="s.id" :href="`#${s.id}`" @click.prevent="go(s.id)">{{ s.label }}</a>
    </nav>

    <div class="ml-auto flex items-center gap-1.5 lg:ml-0">
      <HeaderSearch v-model:open="searching" />
      <ThemeToggle />
      <button
        type="button"
        class="ibtn menu-btn"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <BaseIcon :name="menuOpen ? 'close' : 'menu'" :size="22" />
      </button>
    </div>

    <Transition name="drop">
      <nav v-if="menuOpen" id="mobile-menu" class="mobile-menu" aria-label="Menu">
        <a v-for="(s, i) in sections" :key="s.id" :href="`#${s.id}`" @click.prevent="go(s.id)">
          <span class="g num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="g">{{ s.label }}</span>
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.hdr {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 clamp(16px, 2.5vw, 32px);
  background: color-mix(in oklab, var(--bg) 72%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
}
.logo {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  text-decoration: none;
  color: var(--text);
}
.nav {
  margin-left: auto;
  display: flex;
  gap: 4px;
  transition:
    opacity 0.5s ease-out 0.35s,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}
.nav a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  text-decoration: none;
  color: var(--muted);
  transition:
    color 0.2s ease-out,
    background-color 0.2s ease-out;
}
.nav a:hover {
  color: var(--text);
  background: var(--glass);
}
.searching .nav {
  opacity: 0;
  transform: translateX(-24px);
  pointer-events: none;
  transition:
    opacity 0.35s ease-out,
    transform 0.5s ease-out;
}
.menu-btn {
  display: none;
}
.mobile-menu {
  position: absolute;
  top: calc(var(--header-h) + 8px);
  left: 16px;
  right: 16px;
  display: grid;
  gap: 4px;
  padding: 12px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 20px 50px rgba(56, 35, 63, 0.18);
}
.mobile-menu a {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 52px;
  padding: 0 14px;
  border-radius: 16px;
  text-decoration: none;
  font-size: 1.25rem;
}
.mobile-menu a:hover {
  background: color-mix(in oklab, var(--rose) 40%, transparent);
}
.num {
  font-size: 0.85rem;
  color: var(--accent-text);
}
.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 1023px) {
  .nav {
    display: none;
  }
  .menu-btn {
    display: inline-grid;
  }
  /* buscando no celular: o logo sai de cena para dar espaço */
  .searching .logo {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
