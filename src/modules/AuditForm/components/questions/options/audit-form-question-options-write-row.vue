<template>
  <div class="audit-form-question-options-write-row">
    <wt-input
      :label="$t('webitelUI.auditForm.option', 1)"
      :value="option.name"
      :v="v$.option.name"
      prevent-trim
      @input="emit('update:option', { name: $event, score: option.score })"
    ></wt-input>
    <wt-input
      :label="$t('webitelUI.auditForm.score', 1)"
      :value="option.score"
      :v="v$.option.score"
      type="number"
      @input="emit('update:option', { name: option.name, score: $event })"
    ></wt-input>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          :disabled="first"
          icon="bucket"
          @click="emit('delete')"
        ></wt-icon-btn>
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

const v$ = useVuelidate(
  computed(() => (
    {
      option: {
        name: { required },
        score: {
          required,
          minValue: minValue(0),
          maxValue: maxValue(10),
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
  align-items: center;
  grid-template-columns: 3fr 1fr 24px;
  gap: var(--spacing-sm);
}
</style>
