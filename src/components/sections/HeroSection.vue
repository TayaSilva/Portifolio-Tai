<script setup lang="ts">
import { profile } from '@/data/profile'
import PlanetSvg from '../ui/PlanetSvg.vue'
import StationLabel from '../ui/StationLabel.vue'

const first = profile.firstName.split('')
const last = profile.lastName.split('')
</script>

<template>
  <section id="inicio" class="sec hero" aria-labelledby="hero-title">
    <div class="planet" aria-hidden="true">
      <PlanetSvg ring-class="hero-ring" />
    </div>

    <div class="relative z-[2] flex max-w-full flex-col gap-5">
      <StationLabel number="01" />

      <h1 id="hero-title" class="g display title" :aria-label="profile.name">
        <span aria-hidden="true" class="block">
          <span v-for="(c, i) in first" :key="`f${i}`" class="ch" :style="{ '--i': i }">{{ c }}</span>
        </span>
        <span aria-hidden="true" class="block">
          <span v-for="(c, i) in last" :key="`l${i}`" class="ch" :style="{ '--i': i + 7 }">{{ c }}</span>
        </span>
      </h1>

      <p class="g rot" :aria-label="profile.roles.join(' · ')">
        <span v-for="r in profile.roles" :key="r" aria-hidden="true">{{ r }}</span>
      </p>

      <p class="tagline">{{ profile.tagline }}</p>

     
    </div>

    <div class="ghost-wrap" aria-hidden="true">
      <span class="g ghost">TAIANE SILVA</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 112px;
  overflow: clip;
}
.planet {
  position: absolute;
  right: 6vw;
  top: 50%;
  width: min(46vw, 640px);
  aspect-ratio: 1;
  transform: translateY(-50%);
  z-index: 3;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.planet:hover {
  transform: translateY(-50%) rotate(-8deg) scale(1.03);
}
.planet :deep(svg) {
  width: 100%;
  height: 100%;
}
.planet :deep(.hero-ring) {
  transform-origin: 200px 200px;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.planet:hover :deep(.hero-ring) {
  transform: rotate(-8deg);
}
.title {
  max-width: 9ch;
}
.ch {
  display: inline-block;
  animation: chIn 1.2s cubic-bezier(0.65, 0, 0.35, 1) both;
  animation-delay: calc(var(--intro-delay) + var(--i) * 0.025s);
}
@keyframes chIn {
  from {
    transform: translateY(80px);
    opacity: 0;
    filter: blur(5px);
  }
}
/* papel rotativo */
.rot {
  position: relative;
  display: block;
  height: 1.3em;
  overflow: hidden;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--accent-text);
}
.rot span {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  animation: rot 8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
.rot span + span {
  animation-delay: -4s;
}
@keyframes rot {
  0% {
    transform: translateY(80px);
    opacity: 0;
  }
  8%,
  42% {
    transform: none;
    opacity: 1;
  }
  50%,
  100% {
    transform: translateY(-80px);
    opacity: 0;
  }
}
.tagline {
  max-width: min(560px, 44vw);
  min-width: 280px;
  font-size: clamp(17px, 1.5vw, 22px);
  color: var(--muted);
}
.scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  width: fit-content;
  color: var(--muted);
  text-decoration: none;
  font-size: 15px;
}
.line {
  width: 40px;
  height: 1px;
  background: var(--accent);
}
/* "TAIANE SILVA" em fantasma: SILVA aparece conforme a rolagem */
.ghost-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.16em;
  display: flex;
  justify-content: center;
  font-size: clamp(4.5rem, 14.5vw, 15rem);
  line-height: 1;
  pointer-events: none;
  animation: ghostUp 1.6s cubic-bezier(0.22, 1, 0.36, 1) var(--intro-delay) both;
}
@keyframes ghostUp {
  from {
    transform: translateY(70%);
    opacity: 0;
  }
}
.ghost {
  display: block;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.26), rgba(244, 167, 202, 0.16) 45%, transparent 88%);
  -webkit-background-clip: text;
  background-clip: text;
}
html.dark .ghost {
  background: linear-gradient(180deg, rgba(192, 132, 252, 0.3), rgba(244, 167, 202, 0.12) 45%, transparent 88%);
  -webkit-background-clip: text;
  background-clip: text;
}
@supports (animation-timeline: scroll()) {
  .ghost {
    animation: ghostName linear both;
    animation-timeline: scroll(root block);
    animation-range: 0 70vh;
  }
  @keyframes ghostName {
    from {
      clip-path: inset(0 47% 0 0);
      transform: translateX(24%) scale(0.94);
      letter-spacing: 0.04em;
    }
    to {
      clip-path: inset(0 0 0 0);
      transform: none;
      letter-spacing: -0.04em;
    }
  }
}

/* Celular e tablet: planeta vai para trás do texto, no canto de cima */
@media (max-width: 1023px) {
  .hero {
    align-items: flex-end;
    padding-bottom: 140px;
  }
  .planet {
    right: -14vw;
    top: 96px;
    width: min(78vw, 420px);
    transform: none;
    z-index: 0;
    opacity: 0.9;
  }
  .planet:hover {
    transform: none;
  }
  .tagline {
    max-width: 100%;
    min-width: 0;
  }
}
</style>
