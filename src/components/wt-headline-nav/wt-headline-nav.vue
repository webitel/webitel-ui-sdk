<template>
  <p-breadcrumb
    :model="path"
  >
    <template #item="{ item }">
      <router-link
        v-if="item?.route"
        :to="item?.route"
        class="wt-headline-nav__text"
        :class="{ 'wt-headline-nav__text--last': item == lastItem }"
      >
        {{ item?.name }}
      </router-link>
      <span
        v-else
        class="wt-headline-nav__text"
        :class="{ 'wt-headline-nav__text--last': item == lastItem }"
      >
        {{ item?.name }}
      </span>
    </template>
    <template #separator>
      <wt-icon
        icon="arrow-right"
      />
    </template>
  </p-breadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbProps } from 'primevue';
import { computed } from 'vue';

interface HeadlineNavProps extends BreadcrumbProps {
  path?: Array<{ name: string; route?: string | object }>;
}

const props = defineProps<HeadlineNavProps>();

const lastItem = computed(() => props?.path?.[props.path.length - 1]);
</script>