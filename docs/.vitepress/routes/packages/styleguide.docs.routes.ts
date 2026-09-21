import { resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('styleguide');

export const styleguideIndexRoute = {
	text: 'index',
	link: resolveLink('index.md'),
};

export const styleguideRoutes = [
	{
		text: '@webitel/styleguide',
		collapsed: false,
		items: [
			styleguideIndexRoute,
			{
				text: 'Introduction',
				link: resolveLink('intro/index.md'),
			},
			{
				text: 'Usage',
				items: [
					{
						text: 'Генерація дизайн-токенів з Figma',
						link: resolveLink('usage/design-tokens/index.md'),
					},
				],
			},
		],
	},
];
