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
        .wt-badge--color-${colorName} {
            background: ${dt(`badge.${colorName}.background`)};
            color: ${dt(`badge.${colorName}.color`)};
        }
`;

const generateCustomSizeCss = ({ size, dt }) => `
        .wt-badge--size-${size} {
            width: ${dt(`badge.${size}.minWidth`)};
            height: ${dt(`badge.${size}.height`)};
						font-size: ${dt(`badge.${size}.fontSize`)};
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

		font-weight: ${dt('badge.fontWeight')};
  `,
};

export default badge;
