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
				text: 'v2',
				link: resolveLink('v2/index.md'),
			},
			{
				text: 'Architecture',
				collapsed: false,
				items: [
					{
						text: 'Data Boundary (design decision)',
						link: resolveLink('architecture/data-boundary.md'),
					},
					{
						text: 'v2: SDK Models as Input (design decision)',
						link: resolveLink('architecture/v2-sdk-models.md'),
					},
				],
			},
		],
	},
];
