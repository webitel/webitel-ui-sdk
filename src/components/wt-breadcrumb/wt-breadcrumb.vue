<template>
  <p-breadcrumb
    :model="path"
  >
    <template #item="{ item }">
      <router-link
        v-if="item?.route"
        :to="item?.route"
        class="wt-breadcrumb__text"
        :class="{ 'wt-breadcrumb__text--last': item == lastItem }"
      >
        {{ item?.name }}
      </router-link>
      <span
        v-else
        class="wt-breadcrumb__text"
        :class="{ 'wt-breadcrumb__text--last': item == lastItem }"
      >
        {{ item?.name }}
      </span>
    </template>
    <template #separator>
      <wt-icon
        icon="bread-crumbs"
      />
    </template>
  </p-breadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbProps } from 'primevue';
import { computed } from 'vue';

interface Props extends BreadcrumbProps {
  path?: Array<{ name: string; route?: string | object }>;
}

const props = defineProps<Props>();

const lastItem = computed(() => props?.path?.[props.path.length - 1]);
</script>