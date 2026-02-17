<template>
  <p-breadcrumb :model="path">
    <template #item="{ item }">
      <router-link
v-if="item?.route" :to="item?.route" class="wt-breadcrumb__text typo-body-1"
        :class="{ 'wt-breadcrumb__text--last': item == lastItem }">
        {{ item?.name }}
      </router-link>
      <span v-else class="wt-breadcrumb__text typo-body-1" :class="{ 'wt-breadcrumb__text--last': item == lastItem }">
        {{ item?.name }}
      </span>
    </template>
    <template #separator>
      <wt-icon icon="bread-crumbs" :size="ComponentSize.SM" />
    </template>
  </p-breadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbProps } from 'primevue';
import { ComponentSize } from '../../enums';
import { computed } from 'vue';

interface Props extends BreadcrumbProps {
	/**
	 * Breadcrumb path array. Each item should have a name and optionally a route.
	 * @required
	 *
	 *
	 * @example
	 *[{ name: 'directory' }, { name: 'users', route: '/directory/users' }, { name: 'adm', route: '/directory/users/3' }],
	 */
	path?: Array<{
		name: string;
		route?: string | object;
	}>;
}

const props = defineProps<Props>();

const lastItem = computed(() => props?.path?.[props.path.length - 1]);
</script>