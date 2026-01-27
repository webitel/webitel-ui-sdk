import { InputGroupScheme } from '@webitel/styleguide/component-schemes';

const inputGroup = {
	...InputGroupScheme.sizes,
	colorScheme: InputGroupScheme.colorScheme,

	css: ({ dt }) => `
    .p-inputtext.p-invalid:enabled:hover {
      border-color: ${dt('inputtext.invalidHoverBorderColor')};
    }
  `,
};

export default inputGroup;
