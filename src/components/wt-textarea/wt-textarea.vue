<template>
  <div
    :class="{
      'wt-textarea--disabled': disabled,
      'wt-textarea--invalid': invalid,
      'wt-textarea--autoresize': autoresize,
    }"
    class="wt-textarea"
  >
    <wt-label
      :disabled="disabled"
      :for="name"
      :required="required"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ label }}
      </slot>
    </wt-label>
    <div class="wt-textarea__wrapper">
      <textarea
        :id="name"
        ref="wt-textarea"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :value="value"
        :rows="rows"
        :readonly="readonly"
        class="wt-textarea__textarea"
        v-on="listeners"
        @input="autoGrow"
      />
      <div
        ref="after-wrapper"
        class="wt-textarea__after-wrapper"
      >
        <slot name="after-input" />
        <wt-icon-btn
          :class="{ hidden: !value }"
          :disabled="disabled"
          class="wt-textarea__reset-icon-btn"
          icon="close--filled"
          size="sm"
          @click="$emit('input', '')"
        />
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

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin.js';
import { WtLabel } from '../index';

export default {
  name: 'WtTextarea',
  mixins: [validationMixin],
  components: {
    WtLabel,
  },
  props: {
    /**
     * Current textarea value (`v-model`)
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * textarea label
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * textarea placeholder
     */
    placeholder: {
      type: String,
    },
    /**
     * Native textarea disabled attribute
     */
    readonly: {
      type: Boolean,
      default: false,
      description: 'Native textarea readonly attribute',
    },
    /**
     * Native textarea disabled attribute
     */
    disabled: {
      type: Boolean,
      default: false,
      description: 'Native textarea disabled attribute',
    },
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * textarea name
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Number of rows in textarea
     */
    rows: {
      type: Number,
      default: 1,
      description: 'Number of rows for textarea',
    },
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
    autoresize: {
      type: Boolean,
      default: false,
      description: 'enables auto-grow for text-area',
    },
  },
  emits: ['input', 'enter'],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => this.$emit('input', event.target.value),
        keypress: (event) => this.handleKeypress(event),
      };
    },
  },
  mounted() {
    this.updateInputPaddings();
  },
  updated() {
    if (this.autoresize && !this.value) this.resetGrow();
  },

  methods: {
    handleKeypress(event) {
      if (!this.autoresize) return;

      if (event.key === 'Enter' && !event.shiftKey) {
        this.$emit('enter');
        event.preventDefault();
      }
    },

    autoGrow() {
      if (!this.autoresize) return;
      const inputEl = this.$refs['wt-textarea'];
      const bordersSize = 2; // + 2px for height because of --rounded-action-border-size

      inputEl.style.height = 'auto';
      inputEl.style.height = inputEl.scrollHeight + bordersSize + 'px';
    },

    resetGrow() {
      const inputEl = this.$refs['wt-textarea'];
      inputEl.style.height = 'auto'; // reset text-area height
    },

    updateInputPaddings() {
      // cant test this thing cause vue test utils doesnt render elements width :/
      const afterWrapperWidth = this.$refs['after-wrapper'].offsetWidth;
      const inputEl = this.$refs['wt-textarea'];
      const defaultInputPadding = getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--textarea-padding');
      inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide' as *;

.wt-textarea {
  cursor: text;
  max-height: 100%;

  &--disabled {
    pointer-events: none;
  }

  &--autoresize {
    .wt-textarea__textarea {
      transition: none;
      min-height: auto;
      max-height: 100%;
    }

    .wt-textarea__wrapper {
      height: 100%;
    }
  }
}

.wt-textarea__wrapper {
  position: relative;
}

.wt-textarea__textarea {
  @extend %typo-body-1;
  @extend %wt-scrollbar;
  @include wt-placeholder;

  display: block;
  transition: var(--transition);
  box-sizing: border-box;
  border: var(--input-border);
  border-color: var(--wt-text-field-input-border-color);
  border-radius: var(--border-radius);
  background: transparent;
  padding: var(--textarea-padding);
  width: 100%;
  min-height: var(--textarea-min-height);
  resize: none;
  color: var(--wt-text-field-text-color);

  .wt-textarea--disabled & {
    @include wt-placeholder('disabled');

    border-color: var(--wt-text-field-input-border-disabled-color);
    background: var(--wt-text-field-input-background-disabled-color);
  }

  .wt-textarea--invalid &,
  .wt-textarea--invalid:hover & {
    outline: none; // prevent outline overlapping false color
    border-color: var(--wt-text-field-input-border-error-color);
    color: var(--wt-text-field-error-text-color);
    @include wt-placeholder('error');
  }
}

.wt-textarea__after-wrapper {
  display: flex;
  position: absolute;
  top: var(--input-icon-margin);
  right: var(--input-icon-margin);
  align-items: center;
  gap: var(--input-after-wrapper-gap);
  pointer-events: auto; // override --disabled p-events none
}
</style>
