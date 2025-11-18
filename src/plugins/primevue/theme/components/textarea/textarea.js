import { TextareaScheme } from '@webitel/styleguide/component-schemes';

const textarea = {
  ...TextareaScheme.sizes,
  colorScheme: TextareaScheme.colorScheme,

  css: ({ dt }) => `
      .wt-textarea__textarea {
        min-height: ${dt('textarea.minHeight')};
      }
  `,
};

export default textarea;
