<template>
  <div class="audit-form-question-options-write-row">
    <wt-input
      :label="$t('webitelUI.auditForm.option', 1)"
      :v="v$.option.name"
      :value="option.name"
      prevent-trim
      @input="emit('update:option', { name: $event, score: option.score })"
    />
    <wt-input
      :label="$t('webitelUI.auditForm.score', 1)"
      :v="v$.option.score"
      :value="option.score"
      type="number"
      @input="emit('update:option', { name: option.name, score: $event })"
    />

    <wt-icon-btn
      v-tooltip="$t('reusable.delete')"
      :disabled="first"
      icon="bucket"
      @click="emit('delete')"
    />
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';
import { computed, onMounted, toRefs } from 'vue';

import WtIconBtn from '../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../../../components/wt-input/wt-input.vue';
import WtTooltip from '../../../../../components/wt-tooltip/wt-tooltip.vue';
import decimalValidator from '../../../../../validations/vuelidate/validators/decimalValidator.js';

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

const emit = defineEmits(['update:option', 'delete']);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { option } = toRefs(props);

const v$ = useVuelidate(
  computed(() => ({
    option: {
      name: { required },
      score: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(10),
        decimalValidator: decimalValidator(2),
      },
    },
  })),
  { option },
  { $autoDirty: true },
);

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
