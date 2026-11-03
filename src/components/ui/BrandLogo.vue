<script setup lang="ts">
import { useId } from 'vue'

/** Logo: planetinha perolado com anel + "Taiane Silva" */
const uid = useId()
const id = (n: string) => `${uid}-${n}`
</script>

<template>
  <span class="brand">
    <svg class="mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient :id="id('body')" cx="36%" cy="32%" r="72%">
          <stop offset="0" stop-color="#FFFFFF" />
          <stop offset=".4" stop-color="#FFE1EE" />
          <stop offset=".78" stop-color="#F4A7CA" />
          <stop offset="1" stop-color="#C9A8F5" />
        </radialGradient>
        <linearGradient :id="id('ring')" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#D8C4FF" />
          <stop offset=".45" stop-color="#A855F7" />
          <stop offset="1" stop-color="#F4A7CA" />
        </linearGradient>
        <clipPath :id="id('back')"><rect x="-10" y="-10" width="60" height="30" /></clipPath>
        <clipPath :id="id('front')"><rect x="-10" y="20" width="60" height="30" /></clipPath>
      </defs>
      <g class="ring">
        <ellipse
          cx="20"
          cy="20"
          rx="18.5"
          ry="6"
          fill="none"
          :stroke="`url(#${id('ring')})`"
          stroke-width="1.8"
          transform="rotate(-22 20 20)"
          :clip-path="`url(#${id('back')})`"
          opacity=".7"
        />
      </g>
      <circle cx="20" cy="20" r="11" :fill="`url(#${id('body')})`" stroke="#A855F7" stroke-opacity=".35" stroke-width=".8" />
      <ellipse cx="16.5" cy="15.5" rx="3.6" ry="2.3" fill="#FFFFFF" opacity=".75" />
      <g class="ring">
        <ellipse
          cx="20"
          cy="20"
          rx="18.5"
          ry="6"
          fill="none"
          :stroke="`url(#${id('ring')})`"
          stroke-width="1.8"
          transform="rotate(-22 20 20)"
          :clip-path="`url(#${id('front')})`"
        />
      </g>
      <path
        class="spark"
        d="M33 3c.3 2.6 1.4 3.7 4 4-2.6.3-3.7 1.4-4 4-.3-2.6-1.4-3.7-4-4 2.6-.3 3.7-1.4 4-4Z"
        fill="#A855F7"
      />
    </svg>
    <span class="word" aria-hidden="true">
      <span>Taiane</span><span class="last">Silva</span><span class="dot" />
    </span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.mark {
  flex: none;
  width: 38px;
  height: 38px;
  overflow: visible;
}
.ring {
  transform-box: view-box;
  transform-origin: 20px 20px;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.spark {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.brand:hover .ring {
  transform: rotate(-24deg);
}
.brand:hover .spark {
  transform: rotate(90deg) scale(1.35);
}
.word {
  display: flex;
  align-items: baseline;
  gap: 0.28em;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 21px;
  letter-spacing: -0.035em;
  line-height: 1;
}
.last {
  color: var(--accent-text);
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f4a7ca, #a855f7);
  align-self: flex-end;
  margin: 0 0 3px -0.12em;
}
@media (max-width: 767px) {
  .word {
    display: none;
  }
}
</style>
