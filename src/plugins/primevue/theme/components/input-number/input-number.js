import { InputNumberScheme } from '@webitel/styleguide/component-schemes';

const inputNumber = {
	...InputNumberScheme.sizes,
	colorScheme: InputNumberScheme.colorScheme,

	css: ({ dt }) => `
    .p-inputtext.p-invalid:enabled:hover {
      border-color: ${dt('inputtext.invalidHoverBorderColor')};
    }

    .p-inputnumber:has(+ .p-inputgroupaddon) .p-inputnumber-button {
      border-radius: 0;
    }
  `,
};

export default inputNumber;
