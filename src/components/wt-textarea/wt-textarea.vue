<template>
  <div
    :class="{
      'wt-textarea--disabled': disabled,
      'wt-textarea--invalid': invalid,
      'wt-textarea--chat': chatMode,
    }"
    class="wt-textarea"
  >
    <wt-label
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
    <div class="wt-textarea__wrapper">
      <textarea
        ref="wt-textarea"
        :id="name"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :value="value"
        rows="1"
        class="wt-textarea__textarea"
        v-on="listeners"
        @input="autoGrow($event)"
      />
      <div
        ref="after-wrapper"
        class="wt-textarea__after-wrapper"
      >
        <slot name="after-input" />
        <wt-icon-btn
          :class="{ 'hidden': !value }"
          :disabled="disabled"
          class="wt-textarea__reset-icon-btn"
          icon="close--filled"
          size="sm"
          @click="cleanTextArea"
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

export default {
  name: 'WtTextarea',
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
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
    chatMode: {
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
        input: (event) => this.send(event),
        keypress: (event) => this.handleKeypress(event),
      };
    },

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },
  },
  mounted() {
    this.updateInputPaddings();
  },

  methods: {
    handleKeypress(event) {
      if (!this.chatMode) return;

      if (event.key === 'Enter' && !event.shiftKey) {
        this.$emit('enter');
        event.preventDefault();
      }
      this.resetGrow();
    },

    autoGrow($event) {
      if (!this.chatMode) return;
      const bordersSize = 2; // + 2px for height because of --rounded-action-border-size

      $event.target.style.height = "1px"; // set any initial value
      $event.target.style.height = ($event.target.scrollHeight + bordersSize) + "px";
    },

    resetGrow() {
      const inputEl = this.$refs['wt-textarea'];
      inputEl.style.height = 'auto'; // reset text-area height
    },

    cleanTextArea() {
      if (this.chatMode) this.resetGrow();
      this.$emit('input', '');
    },

    updateInputPaddings() {
      // cant test this thing cause vue test utils doesnt render elements width :/
      const afterWrapperWidth = this.$refs['after-wrapper'].offsetWidth;
      const inputEl = this.$refs['wt-textarea'];
      const defaultInputPadding = getComputedStyle(document.documentElement).getPropertyValue(
        '--textarea-padding',
      );
      inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
    },

    send($event) {
      if (this.chatMode) this.resetGrow();
      this.$emit('input', $event.target.value);
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-textarea {
  cursor: text;
  max-height: 100%;

  &--disabled {
    pointer-events: none;
  }

  &--chat {
    .wt-textarea__textarea {
      min-height: auto;
      max-height: 100%;
      transition: none;
    }

    .wt-textarea__wrapper {
      height: 100%;
      max-height: 100%;
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
  box-sizing: border-box;
  width: 100%;
  min-height: var(--textarea-min-height);
  padding: var(--textarea-padding);
  resize: none;
  transition: var(--transition);
  color: var(--wt-text-field-text-color);
  border: var(--input-border);
  border-color: var(--wt-text-field-input-border-color);
  border-radius: var(--border-radius);
  background: transparent;

  .wt-textarea--disabled & {
    @include wt-placeholder('disabled');

    border-color: var(--wt-text-field-input-border-disabled-color);
    background: var(--wt-text-field-input-background-disabled-color);
  }

  .wt-textarea--invalid &,
  .wt-textarea--invalid:hover & {
    @include wt-placeholder('error');
    color: var(--wt-text-field-error-text-color);
    border-color: var(--wt-text-field-input-border-error-color);
    outline: none; // prevent outline overlapping false color
  }
}

.wt-textarea__after-wrapper {
  position: absolute;
  top: var(--input-icon-margin);
  right: var(--input-icon-margin);
  display: flex;
  align-items: center;
  pointer-events: auto; // override --disabled p-events none
  gap: var(--input-after-wrapper-gap);
}
</style>
