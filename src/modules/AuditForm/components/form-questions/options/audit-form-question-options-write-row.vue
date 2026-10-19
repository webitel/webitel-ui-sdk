<template>
  <div class="audit-form-question-options-write-row">
    <wt-input-text
      :label="$t('webitelUI.auditForm.option', 1)"
      :v="v$.option.name"
      :model-value="option.name"
      :disabled="readonly"
      prevent-trim
      @update:model-value="emit('update:option', { ...option, name: $event })"
    />
    <wt-input-number
      :label="$t('webitelUI.auditForm.score', 1)"
      :v="v$.option.score"
      :model-value="option.score"
      :disabled="readonly"
      @update:model-value="emit('update:option', { ...option, score: $event })"
    />
    <div class="audit-form-question-options-write-row__actions">
      <wt-checkbox
        :label="$t('webitelUI.auditForm.requireComment.label')"
        :selected="option.requireComment || false"
        :disabled="readonly"
        @update:selected="emit('update:option', { ...option, requireComment: $event })"
      />
      <wt-icon-btn
        v-tooltip="$t('reusable.delete')"
        :disabled="isDeleteDisabled"
        icon="bucket"
        @click="emit('delete')"
      />
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { integer, maxValue, minValue, required } from '@vuelidate/validators';
import { computed, inject, onMounted, toRefs } from 'vue';

import WtCheckbox from '../../../../../components/wt-checkbox/wt-checkbox.vue';
import WtIconBtn from '../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtTooltip from '../../../../../components/wt-tooltip/wt-tooltip.vue';

const props = defineProps({
	option: {
		type: Object,
		required: true,
	},
	first: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([
	'update:option',
	'delete',
]);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { option } = toRefs(props);
const readonly = inject('readonly', false);
const isDeleteDisabled = computed(() => props.first || readonly);

const v$ = useVuelidate(
	computed(() => ({
		option: {
			name: {
				required,
			},
			score: {
				required,
				integer,
				minValue: minValue(-15),
				maxValue: maxValue(15),
			},
		},
	})),
	{
		option,
	},
	{
		$autoDirty: true,
	},
);

// init validation
onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>
.audit-form-question-options-write-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: var(--spacing-sm);

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: start;
    margin-top: var(--spacing-lg);
  }
}
</style>
