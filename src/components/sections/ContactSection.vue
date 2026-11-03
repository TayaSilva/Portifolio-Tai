<script setup lang="ts">
import { ref } from 'vue'
import { contact, whatsappHref } from '@/data/profile'
import BaseIcon from '../ui/BaseIcon.vue'
import PlanetSvg from '../ui/PlanetSvg.vue'
import StarIcon from '../ui/StarIcon.vue'
import StationLabel from '../ui/StationLabel.vue'

const copied = ref(false)
const year = new Date().getFullYear()
let timer: number | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email)
  } catch {
    /* navegador antigo: deixa o link de e-mail como plano B */
  }
  copied.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (copied.value = false), 2400)
}

/* céu noturno: pontinhos de luz + estrelas de quatro pontas */
const dots = [
  [5, 12, 3], [14, 40, 2], [24, 8, 2], [33, 62, 3], [41, 28, 2], [49, 84, 2], [57, 6, 3], [63, 48, 2],
  [71, 72, 3], [79, 18, 2], [86, 56, 3], [93, 30, 2], [97, 86, 2], [9, 78, 2], [38, 92, 3], [18, 24, 2],
]
const sparks = [
  [28, 18, 14], [54, 66, 10], [90, 10, 16], [6, 52, 11],
]
</script>

<template>
  <section id="contato" class="sec contact" aria-labelledby="contato-heading">
    <div class="night" aria-hidden="true">
      <span
        v-for="(d, i) in dots"
        :key="`d${i}`"
        class="dot"
        :style="{ left: `${d[0]}%`, top: `${d[1]}%`, width: `${d[2]}px`, height: `${d[2]}px` }"
      />
      <span
        v-for="(s, i) in sparks"
        :key="`s${i}`"
        class="spark"
        :style="{ left: `${s[0]}%`, top: `${s[1]}%`, width: `${s[2]}px`, height: `${s[2]}px` }"
      >
        <StarIcon />
      </span>
      <span class="shoot s1" />
      <span class="shoot s2" />
      <span class="shoot s3" />
    </div>

    <!-- planeta que entra, inclina o anel e é orbitado por uma estrela conforme a rolagem -->
    <div class="orbit" aria-hidden="true">
      <div class="orbit-planet"><PlanetSvg ring-class="orbit-ring" :rings="4" /></div>
      <div class="track">
        <div class="rotor">
          <span class="orbit-star"><StarIcon /></span>
        </div>
      </div>
    </div>

    <div class="relative flex flex-col gap-7">
      <StationLabel number="06" />
      <h2 id="contato-heading" class="g display rv max-w-[8ch]">Vamos conversar?</h2>
     

      <a
        class="wa metal"
        :href="whatsappHref"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com Taiane no WhatsApp (abre em nova aba)"
      >
        <BaseIcon name="whatsapp" :size="30" />
        <span class="g text-xl">Conversar no WhatsApp</span>
      </a>

      <ul class="links">
        <li>
          <a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="linkedin" /> LinkedIn <span class="sr-only">(abre em nova aba)</span>
          </a>
        </li>
        <li>
          <a :href="contact.github" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="github" /> GitHub <span class="sr-only">(abre em nova aba)</span>
          </a>
        </li>
        <li class="inline-flex items-center gap-2">
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          <button type="button" class="ibtn" aria-label="Copiar e-mail" @click="copyEmail">
            <BaseIcon name="copy" :size="18" />
          </button>
          <span role="status" class="copied">{{ copied ? 'E-mail copiado!' : '' }}</span>
        </li>
      </ul>

      <footer class="footer">© {{ year }} Taiane Silva · São Paulo, Brasil</footer>
    </div>
  </section>
</template>

<style scoped>
/* o Contato é sempre um céu noturno, então os tokens ficam claros aqui dentro */
.contact {
  --text: #fff8fc;
  --muted: #cdbbd6;
  --accent: #c084fc;
  --accent-text: #d8b4fe;
  --line: rgba(255, 248, 252, 0.18);
  --surface: #21132d;
  min-height: 680px;
  padding-bottom: 40px;
  color: var(--text);
  background:
    radial-gradient(70% 55% at 72% 30%, rgba(168, 85, 247, 0.22), transparent 65%),
    radial-gradient(60% 50% at 10% 90%, rgba(244, 167, 202, 0.12), transparent 60%),
    #150b1e;
  view-timeline: --contact block;
}
.night {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.dot {
  position: absolute;
  border-radius: 50%;
  background: #fff8fc;
  box-shadow: 0 0 6px 1px rgba(255, 214, 232, 0.8);
  animation: glint 3s ease-in-out infinite alternate;
}
.dot:nth-child(2n) {
  animation-duration: 4.2s;
  animation-delay: -1s;
  background: #ffd6e8;
}
.dot:nth-child(3n) {
  animation-duration: 2.4s;
  animation-delay: -2s;
  background: #d8c4ff;
}
@keyframes glint {
  from {
    opacity: 0.2;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1.15);
  }
}
.spark {
  position: absolute;
  color: #fff8fc;
  filter: drop-shadow(0 0 6px rgba(255, 214, 232, 0.9)) drop-shadow(0 0 12px rgba(192, 132, 252, 0.7));
  animation: glint 2.6s ease-in-out infinite alternate;
}
/* estrelas cadentes */
.shoot {
  position: absolute;
  width: 160px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 214, 232, 0.6) 60%, #fff);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
  opacity: 0;
  animation: shoot 9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.shoot::after {
  content: '';
  position: absolute;
  right: -2px;
  top: -2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px 3px rgba(255, 214, 232, 0.9);
}
.s1 {
  top: 8%;
  left: 8%;
  animation-delay: 1.5s;
}
.s2 {
  top: 22%;
  left: 46%;
  width: 120px;
  animation-delay: 5s;
}
.s3 {
  top: 4%;
  left: 62%;
  width: 200px;
  animation-delay: 7.8s;
}
@keyframes shoot {
  0% {
    opacity: 0;
    transform: rotate(24deg) translateX(0);
  }
  2%,
  11% {
    opacity: 1;
  }
  14%,
  100% {
    opacity: 0;
    transform: rotate(24deg) translateX(560px);
  }
}

/* planeta orbitado */
.orbit {
  position: absolute;
  right: 5vw;
  top: 120px;
  width: min(40vw, 560px);
  aspect-ratio: 1;
  pointer-events: none;
}
.orbit-planet {
  position: absolute;
  inset: 0;
}
.orbit-planet :deep(svg) {
  width: 100%;
  height: 100%;
}
.orbit-planet :deep(.orbit-ring) {
  transform-origin: 200px 200px;
}
.track {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 1.5px dashed color-mix(in oklab, var(--accent) 40%, transparent);
  transform: rotate(-18deg) scaleY(0.32);
}
.rotor {
  position: absolute;
  inset: 0;
}
.orbit-star {
  position: absolute;
  left: 50%;
  top: 0;
  width: 34px;
  height: 34px;
  color: var(--accent);
  transform: translate(-50%, -50%) scaleY(3.125);
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.55));
}
@supports (animation-timeline: view()) {
  .orbit-planet {
    animation: orbitIn linear both;
    animation-timeline: --contact;
    animation-range: entry 0% cover 55%;
  }
  .orbit-planet :deep(.orbit-ring) {
    animation: ringTilt linear both;
    animation-timeline: --contact;
    animation-range: entry 0% exit 100%;
  }
  .rotor {
    animation: spin linear both;
    animation-timeline: --contact;
    animation-range: entry 0% exit 100%;
  }
  .orbit-star {
    animation: counter linear both;
    animation-timeline: --contact;
    animation-range: entry 0% exit 100%;
  }
}
@keyframes orbitIn {
  from {
    transform: translateY(40%) scale(0.5) rotate(-35deg);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
@keyframes ringTilt {
  from {
    transform: rotate(-28deg);
  }
  to {
    transform: rotate(18deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(-40deg);
  }
  to {
    transform: rotate(320deg);
  }
}
@keyframes counter {
  from {
    transform: translate(-50%, -50%) rotate(40deg) scaleY(3.125);
  }
  to {
    transform: translate(-50%, -50%) rotate(-320deg) scaleY(3.125);
  }
}

.wa {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  min-height: 72px;
  padding: 12px 30px 12px 24px;
  border-radius: 999px;
  text-decoration: none;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
}
.links a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
}
.links a:hover {
  border-color: var(--accent);
}
.copied {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-text);
}
.footer {
  margin-top: auto;
  padding-top: 64px;
  font-size: 15px;
  color: var(--muted);
}
@media (max-width: 1023px) {
  .orbit {
    position: relative;
    right: auto;
    top: auto;
    width: min(80vw, 420px);
    margin: 0 auto 8px;
  }
}
@media (max-width: 480px) {
  .wa {
    width: 100%;
    justify-content: center;
    min-height: 56px;
    gap: 10px;
    padding: 8px 16px;
  }
  .wa :deep(svg) {
    width: 24px;
    height: 24px;
  }
  .wa .g {
    font-size: 1rem;
  }
}
</style>
