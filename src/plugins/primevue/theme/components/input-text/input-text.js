import { InputTextScheme } from '@webitel/styleguide/component-schemes';

const inputText = {
	...InputTextScheme.sizes,
	colorScheme: InputTextScheme.colorScheme,

	css: ({ dt }) => `
		.p-inputtext.p-invalid:enabled:hover {
      	border-color: ${dt('inputtext.invalidHoverBorderColor')};
    }

		.p-inputgroupaddon + .p-inputtext,
		.p-inputgroupaddon + * .p-inputtext {
				border-left: none;
		}

		.p-inputtext:has(+ .p-inputgroupaddon),
		*:has(+ .p-inputgroupaddon) .p-inputtext {
				border-right: none;
		}
	`,
};

export default inputText;
