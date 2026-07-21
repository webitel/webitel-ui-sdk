import { resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('ui-chats');

export const uiChatsIndexRoute = {
	text: 'index',
	link: resolveLink('index.md'),
};

export const uiChatsRoutes = [
	{
		text: '@webitel/ui-chats',
		collapsed: false,
		items: [
			uiChatsIndexRoute,
			{
				text: 'Architecture',
				collapsed: false,
				items: [
					{
						text: 'Data Boundary (design decision)',
						link: resolveLink('architecture/data-boundary.md'),
					},
				],
			},
		],
	},
];
