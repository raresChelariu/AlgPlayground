<script setup>
import { computed } from 'vue'

const props = defineProps({
  values: { type: [Array, String], required: true },
  x: { type: Number, required: true },
  mij: { type: Number, required: true },
  candidate: { type: Boolean, default: false },
  keep: { type: String, default: 'none' }, // 'left' | 'right' | 'none'
})

const vals = computed(() =>
  Array.isArray(props.values)
    ? props.values
    : JSON.parse(props.values)
)

// geometrie
const W = 360
const H = 200
const left = 42
const right = 338
const top = 22
const bottom = 160

const n = computed(() => vals.value.length)
const step = computed(() => (n.value > 1 ? (right - left) / (n.value - 1) : 0))

const low = computed(() => Math.min(...vals.value, props.x))
const high = computed(() => Math.max(...vals.value, props.x))

function posX(i) {
  // i este 1-indexat
  return n.value > 1 ? left + (i - 1) * step.value : (left + right) / 2
}
function valY(v) {
  const span = high.value - low.value
  if (span === 0) return (top + bottom) / 2
  return bottom - ((v - low.value) / span) * (bottom - top)
}

const points = computed(() =>
  vals.value.map((v, k) => ({
    i: k + 1,
    v,
    cx: posX(k + 1),
    cy: valY(v),
  }))
)

const polyline = computed(() =>
  points.value.map((p) => `${p.cx},${p.cy}`).join(' ')
)

const mijPoint = computed(() => points.value[props.mij - 1])
const thresholdY = computed(() => valY(props.x))
const dotColor = computed(() => (props.candidate ? '#16a34a' : '#dc2626'))

const keepRect = computed(() => {
  const half = step.value / 2 || 16
  const mx = posX(props.mij)
  if (props.keep === 'left') {
    const x0 = left - 6
    return { x: x0, width: Math.max(0, mx - half - x0), label: mx - half }
  }
  if (props.keep === 'right') {
    const x0 = mx + half
    return { x: x0, width: Math.max(0, right + 6 - x0), label: x0 }
  }
  return null
})
</script>

<template>
  <svg
    class="binsearch-plot"
    :viewBox="`0 0 ${W} ${H}`"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
  >
    <!-- jumatatea in care continuam cautarea -->
    <g v-if="keepRect">
      <rect
        :x="keepRect.x"
        :y="top - 4"
        :width="keepRect.width"
        :height="bottom - top + 4"
        fill="#3b82f6"
        opacity="0.12"
      />
      <text
        :x="keepRect.x + keepRect.width / 2"
        :y="top + 8"
        text-anchor="middle"
        font-size="9"
        fill="#2563eb"
      >cautam aici</text>
    </g>

    <!-- axe -->
    <line :x1="left" :y1="top - 6" :x2="left" :y2="bottom" stroke="#94a3b8" stroke-width="1" />
    <line :x1="left" :y1="bottom" :x2="right + 8" :y2="bottom" stroke="#94a3b8" stroke-width="1" />
    <polygon :points="`${left - 3},${top - 2} ${left + 3},${top - 2} ${left},${top - 8}`" fill="#94a3b8" />
    <polygon :points="`${right + 6},${bottom - 3} ${right + 6},${bottom + 3} ${right + 12},${bottom}`" fill="#94a3b8" />

    <!-- titluri axe -->
    <text :x="12" :y="(top + bottom) / 2" text-anchor="middle" font-size="9" fill="#475569"
      :transform="`rotate(-90 12 ${(top + bottom) / 2})`">valoare</text>
    <text :x="(left + right) / 2" :y="H - 6" text-anchor="middle" font-size="9" fill="#475569">pozitie</text>

    <!-- linia de prag x -->
    <line :x1="left" :y1="thresholdY" :x2="right + 4" :y2="thresholdY"
      stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" />
    <text :x="right + 6" :y="thresholdY + 3" font-size="9" fill="#ea580c">x = {{ x }}</text>

    <!-- linia care uneste valorile (scara crescatoare) -->
    <polyline :points="polyline" fill="none" stroke="#cbd5e1" stroke-width="1.5" />

    <!-- ghidaj vertical la mij -->
    <line v-if="mijPoint" :x1="mijPoint.cx" :y1="mijPoint.cy" :x2="mijPoint.cx" :y2="bottom"
      stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" />

    <!-- punctele -->
    <g v-for="p in points" :key="p.i">
      <circle :cx="p.cx" :cy="p.cy" :r="p.i === mij ? 6 : 3.5"
        :fill="p.i === mij ? dotColor : '#64748b'" />
      <text :x="p.cx" :y="bottom + 13" text-anchor="middle" font-size="9" fill="#64748b">{{ p.i }}</text>
    </g>

    <!-- eticheta mij -->
    <text v-if="mijPoint" :x="mijPoint.cx" :y="mijPoint.cy - 10" text-anchor="middle"
      font-size="9" font-weight="bold" :fill="dotColor">mij</text>
  </svg>
</template>

<style scoped>
.binsearch-plot {
  display: block;
  width: 100%;
  max-width: 360px;
  height: auto;
  margin: 8px 0 16px;
}
</style>
