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

	css: ({ dt }) => `
    ${generateCloseIconCss({
			colorName: MessageColor.INFO,
			dt,
		})}
    ${generateCloseIconCss({
			colorName: MessageColor.ERROR,
			dt,
		})}
    ${generateCloseIconCss({
			colorName: MessageColor.SECONDARY,
			dt,
		})}
    ${generateCloseIconCss({
			colorName: MessageColor.SUCCESS,
			dt,
		})}
    ${generateCloseIconCss({
			colorName: MessageColor.WARN,
			dt,
		})}
    ${generateCloseIconCss({
			colorName: MessageColor.CONTRAST,
			dt,
		})}
  `,
};

export default toast;
