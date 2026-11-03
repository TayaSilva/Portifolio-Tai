<script setup lang="ts">
import { useId } from 'vue'

/**
 * Planeta perolado com anel de sulcos rosa e lilás.
 * O anel é desenhado em duas metades (atrás e na frente da esfera).
 * `ringClass` deixa o componente pai animar o anel.
 */
withDefaults(defineProps<{ ringClass?: string; rings?: number }>(), { ringClass: '', rings: 6 })

const uid = useId()
const id = (name: string) => `${uid}-${name}`
</script>

<template>
  <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" style="overflow: visible">
    <defs>
      <radialGradient :id="id('body')" cx="38%" cy="32%" r="72%">
        <stop offset="0" stop-color="#FFFFFF" />
        <stop offset=".35" stop-color="#FFE6F1" />
        <stop offset=".7" stop-color="#F4C3DD" />
        <stop offset="1" stop-color="#C9B0F5" />
      </radialGradient>
      <linearGradient :id="id('bands')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D8C4FF" stop-opacity="0" />
        <stop offset=".3" stop-color="#D8C4FF" stop-opacity=".35" />
        <stop offset=".42" stop-color="#FFD6E8" stop-opacity="0" />
        <stop offset=".58" stop-color="#F4A7CA" stop-opacity=".3" />
        <stop offset=".72" stop-color="#FFFFFF" stop-opacity="0" />
        <stop offset=".86" stop-color="#D8C4FF" stop-opacity=".3" />
      </linearGradient>
      <!-- o azul-claro aparece só dentro do material, como reflexo -->
      <linearGradient :id="id('ring')" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#D8C4FF" />
        <stop offset=".3" stop-color="#F4A7CA" />
        <stop offset=".5" stop-color="#FFF8FC" />
        <stop offset=".62" stop-color="#CFE6FF" />
        <stop offset=".75" stop-color="#F4A7CA" />
        <stop offset="1" stop-color="#D8C4FF" />
      </linearGradient>
      <clipPath :id="id('back')"><rect x="0" y="0" width="400" height="200" /></clipPath>
      <clipPath :id="id('front')"><rect x="0" y="200" width="400" height="200" /></clipPath>
    </defs>
    <g transform="rotate(-18 200 200)">
      <g :class="ringClass">
        <g :clip-path="`url(#${id('back')})`" opacity=".85">
          <ellipse
            v-for="i in rings"
            :key="`b${i}`"
            cx="200"
            cy="200"
            :rx="150 + (i - 1) * 7"
            :ry="34 + (i - 1) * 1.6"
            fill="none"
            :stroke="`url(#${id('ring')})`"
            :stroke-width="i % 2 ? 5 : 3"
            :opacity="0.55 + (i % 3) * 0.15"
          />
        </g>
      </g>
      <circle cx="200" cy="200" r="104" :fill="`url(#${id('body')})`" />
      <circle cx="200" cy="200" r="104" :fill="`url(#${id('bands')})`" />
      <ellipse cx="166" cy="160" rx="34" ry="22" fill="#FFFFFF" opacity=".55" />
      <g :class="ringClass">
        <g :clip-path="`url(#${id('front')})`">
          <ellipse
            v-for="i in rings"
            :key="`f${i}`"
            cx="200"
            cy="200"
            :rx="150 + (i - 1) * 7"
            :ry="34 + (i - 1) * 1.6"
            fill="none"
            :stroke="`url(#${id('ring')})`"
            :stroke-width="i % 2 ? 5 : 3"
            :opacity="0.55 + (i % 3) * 0.15"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
