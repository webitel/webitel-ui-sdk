<template>
  <wt-popup
    class="wt-cc-activity-type-popup"
    size="md"
    @close="close"
  >
    <template #title>
      {{ $t('webitelUI.agentStatusSelect.activityTypePopup.title') }}
    </template>
    <template #main>
      <form @submit.prevent="setActivityType">
        <ul class="wt-cc-activity-type-popup-option__wrapper">
          <li
            v-for="option of options"
            :key="option.id"
            class="wt-cc-activity-type-popup-option"
          >
            <wt-radio
              :label="option.name"
              :selected="selected?.id"
              :value="option.id"
              class="wt-cc-activity-type-popup-option__radio"
              @update:selected="select(option)"
            />
          </li>
        </ul>
      </form>
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

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
	options: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits([
	'change',
	'close',
]);

const { t } = useI18n();

const selected = ref(props.options[0]);

function select(option) {
	selected.value = option;
}

function close() {
	emit('close');
}

function setActivityType() {
	emit('change', selected.value);
	close();
}
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-cc-activity-type-popup {
  :deep(.wt-popup__popup) {
    max-height: 500px;
  }
}

.wt-cc-activity-type-popup-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wt-cc-activity-type-popup-option__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}
</style>
