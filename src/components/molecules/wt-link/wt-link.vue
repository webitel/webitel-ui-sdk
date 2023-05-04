<template>
  <router-link
    :target="target"
    :to="to"
    class="wt-link"
  >
    <slot>{{ text }}</slot>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  link: {
    type: [String, Object],
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  routeName: {
    type: String,
  },
  id: {
    type: [String, Number],
  },
});

const to = computed(() => props.link || {
    name: `${props.routeName}-edit`,
    params: { id: props.id },
  });
</script>

<style lang="scss" scoped>
.wt-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    text-decoration: underline;
  }
}
</style>
