import { MessageScheme } from '@webitel/styleguide/component-schemes';

import { MessageColor } from '../../../../../enums';

const generateCustomColorCss = ({ colorName, dt }) => `
  .p-message-${colorName} .p-message-close-button svg {
    fill: ${dt(`message.${colorName}.color`)};
  }

  .p-message-${colorName}.p-message-outlined .p-message-close-button svg {
    fill: ${dt(`message.${colorName}.outlined.color`)};
  }

  .p-message-${colorName}.p-message-outlined .p-message-close-button:hover {
    background: ${dt(`message.${colorName}.outlined.closeButton.hoverBackground`)};
  }

  .p-message-${colorName}.p-message-simple .p-message-close-button svg {
    fill: ${dt(`message.${colorName}.simple.color`)};
  }
`;

const message = {
	...MessageScheme.sizes,
	colorScheme: MessageScheme.colorScheme,

	css: ({ dt }) => `
    ${generateCustomColorCss({
			colorName: MessageColor.INFO,
			dt,
		})}
    ${generateCustomColorCss({
			colorName: MessageColor.ERROR,
			dt,
		})}
    ${generateCustomColorCss({
			colorName: MessageColor.SECONDARY,
			dt,
		})}
    ${generateCustomColorCss({
			colorName: MessageColor.SUCCESS,
			dt,
		})}
    ${generateCustomColorCss({
			colorName: MessageColor.WARN,
			dt,
		})}
    ${generateCustomColorCss({
			colorName: MessageColor.CONTRAST,
			dt,
		})}
  `,
};

export default message;
