<script setup lang="ts">
import { warp } from '@/composables/useNavigation'
import PlanetSvg from '../ui/PlanetSvg.vue'
import StarIcon from '../ui/StarIcon.vue'

/** Transição em tela cheia ao clicar no menu: céu, planetas e estrelas, e depois a seção escolhida */
const stars = [
  { l: 12, t: 18, s: 22 },
  { l: 30, t: 8, s: 12 },
  { l: 58, t: 14, s: 16 },
  { l: 70, t: 36, s: 28 },
  { l: 88, t: 62, s: 14 },
  { l: 46, t: 76, s: 18 },
  { l: 22, t: 44, s: 10 },
  { l: 80, t: 86, s: 24 },
  { l: 38, t: 28, s: 8 },
  { l: 64, t: 58, s: 9 },
  { l: 6, t: 70, s: 13 },
  { l: 92, t: 22, s: 11 },
]
</script>

<template>
  <div v-if="warp.active" class="warp" :class="{ out: warp.leaving }" aria-hidden="true">
    <div class="bg" />
    <div class="glow" />
    <div class="planet-a"><PlanetSvg :rings="3" /></div>
    <div class="planet-b">
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="warp-small" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#FFFFFF" />
            <stop offset=".45" stop-color="#D8C4FF" />
            <stop offset="1" stop-color="#A855F7" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#warp-small)" />
        <ellipse cx="38" cy="36" rx="10" ry="6" fill="#FFFFFF" opacity=".6" />
      </svg>
    </div>
    <span
      v-for="(s, i) in stars"
      :key="i"
      class="star"
      :style="{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.s}px`, height: `${s.s}px` }"
    >
      <StarIcon />
    </span>
    <div class="label">
      <span class="g num">{{ warp.num }}</span>
      <span class="g title">{{ warp.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.warp {
  position: fixed;
  inset: 0;
  z-index: 110;
  overflow: hidden;
  pointer-events: none;
  animation: warpIn 0.85s cubic-bezier(0.7, 0, 0.3, 1) both;
}
.warp.out {
  animation: warpOut 0.85s cubic-bezier(0.7, 0, 0.3, 1) both;
}
@keyframes warpIn {
  from {
    clip-path: circle(0% at 50% 50%);
  }
  to {
    clip-path: circle(150% at 50% 50%);
  }
}
@keyframes warpOut {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 100% 0);
  }
}
.bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 110%, #4a1d6e 0%, #2a1240 38%, #150b1e 75%);
}
.glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 70vmax;
  height: 70vmax;
  margin: -35vmax 0 0 -35vmax;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244, 167, 202, 0.35), rgba(168, 85, 247, 0.15) 40%, transparent 65%);
  animation: glow 1.7s ease-out both;
}
@keyframes glow {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: scale(1.2);
    opacity: 0.6;
  }
}
.planet-a {
  position: absolute;
  left: -6vw;
  bottom: -12vh;
  width: min(46vw, 560px);
  aspect-ratio: 1;
  animation: pa 1.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.planet-b {
  position: absolute;
  right: 8vw;
  top: 10vh;
  width: min(14vw, 170px);
  aspect-ratio: 1;
  animation: pb 1.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes pa {
  from {
    transform: translate(-14vw, 24vh) rotate(-30deg) scale(0.7);
  }
}
@keyframes pb {
  from {
    transform: translate(12vw, -10vh) scale(0.5);
  }
}
.star {
  position: absolute;
  color: #fff8fc;
  filter: drop-shadow(0 0 6px rgba(255, 214, 232, 0.9)) drop-shadow(0 0 14px rgba(192, 132, 252, 0.7));
  animation:
    starIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both,
    twinkle 1.1s ease-in-out 0.9s infinite alternate;
}
.star:nth-of-type(odd) {
  animation-delay: 0.15s, 0.9s;
}
.star:nth-of-type(3n) {
  animation-delay: 0.3s, 1.2s;
  color: #ffd6e8;
}
.star:nth-of-type(4n) {
  color: #d8c4ff;
}
@keyframes starIn {
  from {
    transform: scale(0) rotate(-90deg);
    opacity: 0;
  }
}
@keyframes twinkle {
  to {
    opacity: 0.35;
  }
}
.label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff8fc;
  text-align: center;
  animation: labelIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
}
.out .label {
  animation: labelOut 0.5s ease-in both;
}
@keyframes labelIn {
  from {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
}
@keyframes labelOut {
  to {
    opacity: 0;
    transform: translate(-50%, -80%);
  }
}
.num {
  font-size: 18px;
  letter-spacing: 0.1em;
  color: #f4a7ca;
}
.title {
  font-size: clamp(48px, 8vw, 120px);
  line-height: 1;
}
</style>
