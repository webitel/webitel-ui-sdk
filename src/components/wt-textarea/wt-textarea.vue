<template>
  <div
    class="wt-textarea"
    :class="{
      'wt-textarea--disabled': disabled,
      'wt-textarea--invalid': invalid,
    }"
  >
    <wt-label
      :for="name"
      :disabled="disabled"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-textarea__wrapper">
      <textarea
        :id="name"
        ref="wt-textarea"
        class="wt-textarea__textarea"
        :value="value"
        :placeholder="placeholder || label"
        :disabled="disabled"
        v-on="listeners"
      ></textarea>
      <div class="wt-textarea__after-wrapper" ref="after-wrapper">
        <slot name="after-input"></slot>
        <wt-icon-btn
          class="wt-textarea__reset-icon-btn"
          :class="{ 'hidden': !value }"
          icon="close--filled"
          size="sm"
          :disabled="disabled"
          @click="$emit('input', '')"
        ></wt-icon-btn>
      </div>
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >{{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin';

export default {
  name: 'wt-textarea',
  mixins: [validationMixin],
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
    disabled: {
      type: Boolean,
      default: false,
      description: 'Native textarea disabled attribute',
    },
    /**
     * textarea name
     */
    name: {
      type: String,
      default: '',
    },
    chatMode: {
      type: Boolean,
      default: false,
    },
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
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

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },
  },

  methods: {
    handleKeypress(event) {
      if (!this.chatMode) return;
      if (event.key === 'Enter' && !event.shiftKey) {
        this.$emit('enter');
        event.preventDefault();
      }
    },

    updateInputPaddings() {
      // cant test this thing cause vue test utils doesnt render elements width :/
      const afterWrapperWidth = this.$refs['after-wrapper'].offsetWidth;
      const inputEl = this.$refs['wt-textarea'];
      const defaultInputPadding = getComputedStyle(document.documentElement)
      .getPropertyValue('--textarea-padding');
      inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
    },
  },
  mounted() {
    this.updateInputPaddings();
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-textarea {
  cursor: text;

  &--disabled {
    pointer-events: none;
  }
}

.wt-textarea__wrapper {
  position: relative;
}

.wt-label {
  .wt-textarea:hover &,
  .wt-textarea:focus-within & {
    color: var(--form-label--hover-color);
  }

  .wt-textarea--invalid:hover &,
  .wt-textarea--invalid:focus-within & {
    color: var(--label--invalid-color);
  }
}

.wt-textarea__textarea {
  @extend %typo-body-1;
  @extend %wt-scrollbar;
  @include wt-placeholder;

  display: block;
  width: 100%;
  min-height: var(--textarea-min-height);
  box-sizing: border-box;
  padding: var(--textarea-padding);
  color: var(--form-input-color);
  border: var(--input-border);
  border-color: var(--form-border-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  resize: none;

  &:focus {
    @include wt-placeholder('focus');

    border-color: var(--form-border--hover-color);
  }

  .wt-textarea--disabled & {
    @include wt-placeholder('disabled');

    background: var(--form-border--disabled-color);
    border-color: var(--form-border--disabled-color);
  }

  .wt-textarea--invalid &,
  .wt-textarea--invalid:hover & {
    border-color: var(--false-color);
    outline: none; // prevent outline overlapping false color
  }
}

/* make icons black */
.wt-textarea:hover ::v-deep .wt-icon-btn:not(.wt-textarea__reset-icon-btn) .wt-icon__icon,
.wt-textarea:focus-within ::v-deep .wt-icon-btn:not(.wt-textarea__reset-icon-btn) .wt-icon__icon {
  fill: var(--icon-color--hover);
}

.wt-textarea__after-wrapper {
  display: flex;
  gap: var(--input-after-wrapper-gap);
  align-items: center;
  position: absolute;
  top: var(--input-icon-margin);
  right: var(--input-icon-margin);
  pointer-events: auto; // override --disabled p-events none
}
</style>
