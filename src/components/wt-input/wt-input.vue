<template>
  <div
    :class="{
      'wt-input--disabled': disabled,
      'wt-input--invalid': invalid,
    }"
    class="wt-input"
  >
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      :for="name"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <input
        :id="name"
        ref="WtInput"
        :class="{
          'wt-input--is-password': isPassword,
        }"
        :disabled="disabled"
        :max="numberMax"
        :min="numberMin"
        :placeholder="placeholder || label"
        :type="inputType"
        :value="inputValue"
        class="wt-input__input"
        v-bind="$attrs"
        @input="inputHandler"
        @keyup="$emit('keyup', $event)"
      >
      <div
        ref="AfterWrapper"
        class="wt-input__after-wrapper"
      >
        <slot
          name="after-input"
        />
        <slot
          v-if="isPassword"
          name="show-password"
          v-bind="{
            isPasswordVisible,
            switchVisibilityPassword,
          }"
        >
          <wt-icon-btn
            :disabled="disabled"
            :icon="showPasswordIcon"
            @click="switchVisibilityPassword"
          />
        </slot>
      </div>
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs, useSlots } from 'vue';
import { useValidation } from '../../mixins/validationMixin/useValidation.js';

/*
* IMPORTANT: WT-INPUT SHOULD SUPPORT VUE 3 AND VUE 2 V-MODEL INTERFACES SO THAT THERE'S
* TWO PROPS: VALUE AND MODELVALUE, AND 2 EVENTS: @UPDATE:MODELVALUE AND @INPUT
* */
const props = defineProps({
  value: {
    type: [String, Number],
  },
  /**
   * Current input modelValue (`v-model`)
   */
  modelValue: {
    type: [String, Number],
  },
  /**
   * Form input label
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Form input placeholder
   */
  placeholder: {
    type: String,
  },
  /**
   * Form input name
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * Form input type
   */
  type: {
    type: String,
    default: 'text',
  },
  /**
   * Native input required attribute
   */
  required: {
    type: Boolean,
    default: false,
    description: 'Native input required attribute',
  },
  /**
   * Native input disabled attribute
   */
  disabled: {
    type: Boolean,
    default: false,
    description: 'Native input disabled attribute',
  },
  /**
   * Status of show password icon display
   */
  hasShowPassword: {
    type: Boolean,
    default: false,
  },

  /**
   * Native number input restrictions
   */
  numberMin: {
    type: Number,
    default: 0,
  },

  /**
   * Native number input restrictions
   */
  numberMax: {
    type: Number,
  },

  labelProps: {
    type: Object,
    description: 'Object with props, passed down to wt-label as props',
  },

  preventTrim: {
    type: Boolean,
    default: false,
  },

  // validation rules
  // TODO: move to separate file to make it reusable
  v: {
    type: Object,
  },
  customValidators: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue', 'input', 'keyup']);

const slots = useSlots();

// https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3
const { v, customValidators } = toRefs(props);

const {
  isValidation,
  invalid,
  validationText,
} = useValidation({ v, customValidators });

// toggles password <-> text at showPassword
const inputType = ref('');
inputType.value = props.type;

// template ref
const AfterWrapper = ref(null);
// template ref
const WtInput = ref(null);

const isPasswordVisible = ref(false);

// FIXME: uncomment and test, because this code was copy-pasted from vue-storefront long ago
// watch: {
//   type: {
//     immediate: true,
//     handler(type) {
//       let inputType = type;
//       // Safari has bug for number input
//       if (typeof window !== 'undefined' || typeof document !== 'undefined') {
//         const ua = navigator.userAgent.toLocaleLowerCase();
//         if (
//           ua.indexOf('safari') !== -1
//           && ua.indexOf('chrome') === -1
//           && type === 'number'
//         ) {
//           inputType = 'text';
//         }
//       }
//       this.inputType = inputType;
//     },
//   },
// },

const inputValue = computed(() => {
  return props.value !== undefined ? props.value : props.modelValue;
});

const hasLabel = computed(() => {
  return !!(props.label || slots.label);
});

const requiredLabel = computed(() => {
  return props.required ? `${props.label}*` : props.label;
});

const isPassword = computed(() => {
  return props.type === 'password' && props.hasShowPassword;
});

const showPasswordIcon = computed(() => {
  return isPasswordVisible.value ? 'eye--closed' : 'eye--opened';
});

function inputHandler(event) {
  const value = props.preventTrim ? event.target.value : event.target.value.trim();
  emit('update:modelValue', value);
  emit('input', value);
}

function switchVisibilityPassword() {
  isPasswordVisible.value = !isPasswordVisible.value;
  inputType.value = isPasswordVisible.value ? 'text' : 'password';
}

function updateInputPaddings() {
  // cant test this thing cause vue test utils doesnt render elements width :/
  const afterWrapperWidth = AfterWrapper.value.offsetWidth;
  const inputEl = WtInput.value;
  const defaultInputPadding = getComputedStyle(document.documentElement)
  .getPropertyValue('--input-padding');
  if (afterWrapperWidth >= inputEl.offsetWidth) return; // fixes https://my.webitel.com/browse/WTEL-2635
  inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
}

onMounted(() => {
  updateInputPaddings();
});
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import 'src/css/main.scss';

.wt-input {
  cursor: text;

  &--disabled {
    pointer-events: none;
  }
}

.wt-input__wrapper {
  position: relative;
}

.wt-input__input {
  @extend %typo-body-1;
  @include wt-placeholder;

  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: var(--input-padding);
  transition: var(--transition);
  color: var(--wt-text-field-text-color);
  border: var(--input-border);
  border-color: var(--wt-text-field-input-border-color);
  border-radius: var(--border-radius);
  background: transparent;

  .wt-input--invalid &,
  .wt-input--invalid:hover & {
    @include wt-placeholder('error');
    color: var(--wt-text-field-error-text-color);
    border-color: var(--wt-text-field-input-border-error-color);
    outline: none; // prevent outline overlapping false color
  }

  .wt-input--disabled & {
    @include wt-placeholder('disabled');
    border-color: var(--wt-text-field-input-border-disabled-color);
    background: var(--wt-text-field-input-background-disabled-color);
  }
}

.wt-input__after-wrapper {
  position: absolute;
  top: 50%;
  right: var(--input-icon-margin);
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: auto; // override --disabled p-events none
  gap: var(--input-after-wrapper-gap);
}
</style>
