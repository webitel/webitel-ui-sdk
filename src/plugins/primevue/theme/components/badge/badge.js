import { BadgeScheme } from '@webitel/styleguide/component-schemes';

const colors = [
	'secondary',
	'info',
	'success',
	'warn',
	'error',
	'online',
	'dnd',
	'busy',
	'pause',
	'onlineCc',
	'offline',
];

const generateCustomColorCss = ({ colorName, dt }) => `
        .p-badge--${colorName} {
            background: ${dt(`badge.${colorName}.background`)};
            color: ${dt(`badge.${colorName}.color`)};
        }
`;

const generateCustomSizeCss = ({ size, dt }) => `
        .p-badge--${size} {
            width: ${dt(`badge.${size}.width`)};
            height: ${dt(`badge.${size}.height`)};
        }
`;

const badge = {
	root: BadgeScheme.sizes,
	colorScheme: BadgeScheme.colorScheme,

	css: ({ dt }) => `
    ${generateCustomSizeCss({
			size: 'sm',
			dt,
		})}
    ${generateCustomSizeCss({
			size: 'md',
			dt,
		})}
    ${generateCustomSizeCss({
			size: 'lg',
			dt,
		})}
    
    ${colors
			.map((color) =>
				generateCustomColorCss({
					colorName: color,
					dt,
				}),
			)
			.join('')}
  `,
};

export default badge;
