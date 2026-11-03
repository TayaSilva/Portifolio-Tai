<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Intro (≈2,8s): estrela se desenha, "Taiane Silva" entra letra a letra,
 * um brilho rosa passa pelo nome e a estrela abre o site por dentro dela.
 * Toca só uma vez por sessão e é pulada quando a URL tem âncora (#).
 */
const show = ref(!document.documentElement.classList.contains('no-intro'))
const letters = 'Taiane Silva'.split('')
let timer: number | undefined

function finish() {
  show.value = false
  try {
    sessionStorage.setItem('ts-intro', '1')
  } catch {
    /* sem sessionStorage, tudo bem */
  }
}

const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish()

onMounted(() => {
  if (!show.value) return
  window.scrollTo(0, 0)
  timer = window.setTimeout(finish, 2800)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.clearTimeout(timer)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div v-if="show" class="intro">
    <svg class="star" viewBox="-70 -70 140 140" aria-hidden="true">
      <defs>
        <linearGradient id="intro-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#F4A7CA" />
          <stop offset=".45" stop-color="#A855F7" />
          <stop offset=".55" stop-color="#D9469F" />
          <stop offset="1" stop-color="#D8C4FF" />
        </linearGradient>
      </defs>
      <polygon
        pathLength="1"
        points="0,-64 12.67,-12.67 64,0 12.67,12.67 0,64 -12.67,12.67 -64,0 -12.67,-12.67"
        fill="none"
        stroke="url(#intro-chrome)"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
    </svg>
    <p class="g name" aria-label="Taiane Silva">
      <span
        v-for="(l, i) in letters"
        :key="i"
        class="ch"
        :style="{ animationDelay: `${0.2 + i * 0.025}s` }"
        aria-hidden="true"
        >{{ l === ' ' ? ' ' : l }}</span
      >
      <span class="shine" aria-hidden="true">Taiane Silva</span>
    </p>
    <button type="button" class="skip" @click="finish">
      Pular <kbd class="kbd">Esc</kbd>
    </button>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: var(--bg);
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent var(--hole), #000 calc(var(--hole) + 0.5%));
  mask: radial-gradient(circle at 50% 50%, transparent var(--hole), #000 calc(var(--hole) + 0.5%));
  animation: holeOpen 0.9s cubic-bezier(0.7, 0, 0.84, 0) 1.8s forwards;
}
@keyframes holeOpen {
  to {
    --hole: 150%;
    visibility: hidden;
  }
}
.star {
  position: absolute;
  width: 128px;
  height: 128px;
  animation: starGrow 0.9s cubic-bezier(0.7, 0, 0.84, 0) 1.8s forwards;
}
.star polygon {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 0.7s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes starGrow {
  to {
    transform: scale(18);
    opacity: 0;
  }
}
.name {
  position: relative;
  font-size: clamp(3rem, 11vw, 10rem);
  line-height: 1;
  white-space: nowrap;
  animation: nameFly 0.8s cubic-bezier(0.65, 0, 0.35, 1) 1.8s forwards;
}
@keyframes nameFly {
  to {
    transform: translate(-40vw, -44vh) scale(0.12);
    opacity: 0;
  }
}
.ch {
  display: inline-block;
  animation: chIn 1.2s cubic-bezier(0.65, 0, 0.35, 1) both;
}
@keyframes chIn {
  from {
    transform: translateY(80px);
    opacity: 0;
    filter: blur(5px);
  }
}
.shine {
  position: absolute;
  inset: 0;
  color: transparent;
  background: linear-gradient(110deg, transparent 20%, #ffd6e8 38%, #fff8fc 50%, #f4a7ca 62%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
  clip-path: inset(0 100% 0 0);
  animation: shine 0.7s ease-in-out 1.3s forwards;
}
@keyframes shine {
  50% {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 100%);
  }
}
.skip {
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--glass);
  color: var(--text);
  cursor: pointer;
}
.kbd {
  font-family: var(--font-display);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid var(--line);
  color: var(--muted);
}
@media (prefers-reduced-motion: reduce) {
  .intro {
    display: none;
  }
}
</style>
