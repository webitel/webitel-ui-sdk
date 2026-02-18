import { resolvePkgDocItems, resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('ui-sdk');
const resolveItems = resolvePkgDocItems('ui-sdk');

export const uiSdkIndexRoute = {
	text: 'index',
	link: resolveLink('index.md'),
};
export const uiSdkRoutes = [
	{
		text: '@webitel/ui-sdk',
		collapsed: false,
		items: [
			uiSdkIndexRoute,
			{
				text: 'Changelog',
				items: resolveItems('changelog.md'),
				// collapsed: false,
			},

			{
				text: 'API Tools',
				items: resolveItems('api/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Locale',
				items: resolveItems('locale/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Assets',
				items: resolveItems('assets/**/*.md'),
				collapsed: false,
			},
			{
				text: 'CSS',
				items: resolveItems('css/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Components',
				items: resolveItems('components/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Components/on-demand',
				items: resolveItems('components/on-demand/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Composables',
				items: resolveItems('composables/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Enums',
				items: [
					...resolveItems('enums/index.md'),
					{
						text: 'Non-cathegorized',
						collapsed: false,
						items: resolveItems([
							'enums/**/*.md',
							'!enums/index.md',
							'!enums/WebitelApplications/*.md',
						]),
					},
					{
						text: 'WebitelApplications',
						collapsed: false,
						items: resolveItems('enums/WebitelApplications/*.md'),
					},
				],
				collapsed: true,
			},
			{
				text: 'Modules',
				items: [
					{
						text: 'Module: Object Permissions',
						collapsed: true,
						items: [
							...resolveItems([
								'modules/ObjectPermissions/index.md',
							]),
							{
								text: 'Components',
								items: resolveItems([
									'modules/ObjectPermissions/components/**/*.md',
								]),
							},
							{
								text: 'Store',
								items: resolveItems([
									'modules/ObjectPermissions/store/**/*.md',
								]),
							},
						],
					},
					{
						text: 'Module: Table Component Module',
						collapsed: true,
						items: [
							...resolveItems('modules/TableComponentModule/index.md'),
							{
								text: 'Composables',
								items: resolveItems(
									'modules/TableComponentModule/composables/**/*.md',
								),
							},
						],
					},
					{
						text: 'Module: Call Session Module',
						collapsed: true,
						items: [
							...resolveItems('modules/CallSessionModule/index.md'),
							{
								text: 'VideoCall',
								link: resolveLink(
									'modules/CallSessionModule/components/**/*.md',
								),
							},
						],
					},
					{
						text: 'Module: Userinfo',
						collapsed: true,
						items: [
							{
								text: 'index',
								link: resolveLink('modules/Userinfo/index.md'),
							},
							{
								text: 'Access',
								link: resolveLink('modules/Userinfo/access/Readme.md'),
							},
						],
					},
					{
						text: 'Module: Files Export',
						collapsed: true,
						items: resolveItems([
							'modules/FilesExport/Readme.md',
						]),
					},
					{
						text: 'Module: Filters',
						collapsed: true,
						items: resolveItems([
							'modules/Filters/**/*.md',
						]),
					},
					{
						text: 'Module: Appearance',
						collapsed: true,
						items: resolveItems([
							'modules/Appearance/**/*.md',
						]),
					},
					{
						text: 'Module: Query Filters',
						collapsed: true,
						items: resolveItems([
							'modules/query-filters/**/*.md',
						]),
					},
					{
						text: 'Module: Notifications',
						collapsed: true,
						items: resolveItems([
							'modules/notifications-module/md/**/*.md',
						]),
					},
				],
				collapsed: true,
			},
			{
				text: 'Scripts',
				items: [
					...resolveItems('scripts/index.md'),
					...resolveItems([
						'scripts/**/*.md',
						'!scripts/index.md',
					]),
				],
				collapsed: true,
			},
			{
				text: 'Store',
				items: resolveItems('store/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Test utils and Mocks',
				items: resolveItems('tests/**/*.md'),
				collapsed: true,
			},
			{
				text: 'Validators',
				items: resolveItems('validators/**/*.md'),
				collapsed: true,
			},
		],
	},
];
