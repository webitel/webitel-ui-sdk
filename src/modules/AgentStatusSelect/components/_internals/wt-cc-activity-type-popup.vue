<template>
  <wt-popup
    class="wt-cc-activity-type-popup"
    size="md"
    @close="close"
  >
    <template #title>
      {{ t('webitelUI.agentStatusSelect.activityTypePopup.title') }}
    </template>
    <template #main>
      <wt-cc-activity-type-options
        v-model="selected"
        :options="options"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!selected"
        @click="setActivityType"
      >
        {{ t('reusable.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { LookupOption } from '../../../../types';
import WtCcActivityTypeOptions from './wt-cc-activity-type-options.vue';

const props = withDefaults(
	defineProps<{
		options?: LookupOption[];
	}>(),
	{
		options: () => [],
	},
);

const emit = defineEmits<{
	change: [
		option: LookupOption,
	];
	close: [];
}>();

const { t } = useI18n();

const selected = ref<LookupOption | undefined>(props.options?.[0]);

function close() {
	emit('close');
}

function setActivityType() {
	emit('change', selected.value);
	close();
}
</script>

<style lang="scss" scoped>
.wt-cc-activity-type-popup {
  :deep(.wt-popup__popup) {
    max-height: 500px;
  }
}
</style>
