<template>
  <wt-loader
    v-if="loading"
    size="sm"
  />
  <div ref="intersectionTarget" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  canLoadMore: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  rootMargin: { type: String, default: '0px 0px 300px 0px' },
  threshold:  { type: [Number, Array], default: 0 },
})

const emit = defineEmits(['next'])

const intersectionTarget = ref<HTMLElement|null>(null)
let stopObs: (() => void) | null = null

const getScrollableParent = (el: HTMLElement | null): HTMLElement | null => {
  let node: HTMLElement | null = el?.parentElement ?? null
  while (node) {
    const style = window.getComputedStyle(node)
    const canScrollY = /(auto|scroll)/.test(style.overflowY)
    const hasScrollableArea = node.scrollHeight > node.clientHeight
    if (canScrollY && hasScrollableArea) return node
    node = node.parentElement
  }
  return null
}

const initObserver = () => {
  if (!intersectionTarget.value) return
  const rootEl = getScrollableParent(intersectionTarget.value)

  const { stop } = useIntersectionObserver(
    intersectionTarget.value,
    ([{ isIntersecting }]) => {
      if (isIntersecting && props.canLoadMore && !props.loading) {
        emit('next')
      }
    },
    { root: rootEl ?? undefined, rootMargin: props.rootMargin, threshold: props.threshold }
  )
  stopObs = stop
}

onMounted(async () => {
  /**
   *
   * Note, observer triggers at init, so it should be used also as init function
   * however, current filters module version is initializing list by itself, so we need to refactor filters ASAP
   */

  await nextTick()
  requestAnimationFrame(() => initObserver())
})

onBeforeUnmount(() => stopObs?.())
</script>

<style scoped lang="scss">
.wt-loader {
  margin: var(--spacing-lg) auto;
}
</style>
