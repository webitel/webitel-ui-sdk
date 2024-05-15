<template>
  <div class="audit-form-question-options-write-row">
    <wt-input
      :label="$t('webitelUI.auditForm.option', 1)"
      :value="option.name"
      :v="v$.option.name"
      prevent-trim
      @input="emit('update:option', { name: $event, score: option.score })"
    />
    <wt-input
      :label="$t('webitelUI.auditForm.score', 1)"
      :label-props="{ hint: $t('webitelUI.auditForm.scoreInputTooltip', { min: minScore, max: maxScore}), hintPosition: 'right' }"
      :value="option.score"
      :v="v$.option.score"
      :number-min="minScore"
      :number-max="maxScore"
      type="number"
      @input="changeScore"
    />
    <wt-tooltip class="audit-form-question-options-write-row__tooltip">
      <template #activator>
        <wt-icon-btn
          :disabled="first"
          icon="bucket"
          @click="emit('delete')"
        />
      </template>
      {{ $t('reusable.delete') }}
    </wt-tooltip>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, maxValue } from '@vuelidate/validators';
import { computed, onMounted, toRefs } from 'vue';
import WtTooltip from '../../../../../components/wt-tooltip/wt-tooltip.vue';
import WtIconBtn from '../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../../../components/wt-input/wt-input.vue';
import decimalValidator from '../../../../../validators/decimalValidator';

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
  'change:option',
  'delete',
]);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { option } = toRefs(props);

const minScore = 0;
const maxScore = 10;

const v$ = useVuelidate(
  computed(() => (
    {
      option: {
        name: { required },
        score: {
          required,
          minValue: minValue(minScore),
          maxValue: maxValue(maxScore),
          decimalValidator: decimalValidator(2),
        },
      },
    })),
  { option },
  { $autoDirty: true },
);


function changeScore(value) {
  const score = value > maxScore ? maxScore : Number(Math.abs(value)); // to prevent -1, 000 or string value because of this task https://webitel.atlassian.net/browse/WTEL-4505
  emit('update:option', { name: props.option.name, score });
}

// init validation
onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>
.audit-form-question-options-write-row {
  display: grid;
  grid-template-columns: 3fr 1fr 24px;
  gap: var(--spacing-sm);

  &__tooltip {
    padding-top: var(--spacing-md);
  }
}
</style>
