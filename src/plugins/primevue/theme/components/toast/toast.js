import { ToastScheme } from '@webitel/styleguide/component-schemes';

import { MessageColor } from '../../../../../enums';

const generateCloseIconCss = ({ colorName, dt }) => `
  .p-toast-message-${colorName} .p-toast-close-button svg {
    fill: ${dt(`toast.${colorName}.color`)};
  }
`;

const toast = {
	...ToastScheme.sizes,
	colorScheme: ToastScheme.colorScheme,

	css: ({ dt }) =>
		Object.values(MessageColor)
			.map((colorName) =>
				generateCloseIconCss({
					colorName,
					dt,
				}),
			)
			.join(''),
};

export default toast;
