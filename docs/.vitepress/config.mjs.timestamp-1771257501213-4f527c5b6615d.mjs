// docs/.vitepress/config.mjs
import { globbySync as globbySync2 } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/globby/index.js';
import path2 from 'path';
import { nodePolyfills } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/vite-plugin-node-polyfills/dist/index.js';
import vueDocgenPlugin from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/vite-plugin-vue-docgen/dist/index.js';
import { defineConfig as defineVitepressConfig } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/vitepress/dist/node/index.js';
import tailwindcss from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/@tailwindcss/vite/dist/index.mjs';

// docs/.vitepress/routes/routes.ts
import isObject from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/lodash/isObject.js';

// docs/.vitepress/routes/routeResolvers.ts
import { globbySync } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/globby/index.js';
import path from 'path';
var __vite_injected_original_dirname =
	'/Users/admin/Projects/webitel/webitel-ui-sdk/docs/.vitepress/routes';
var baseUrl = 'pages';
var basePkgUrl = 'packages';
var baseKnowledgeBaseUrl = 'knowledge-base';
var resolveByPattern = (patterns) => {
	return globbySync(patterns, {
		cwd: path.resolve(__vite_injected_original_dirname, `../../${baseUrl}/`),
	});
};
var resolvePkgLinkDoc = (pkg) => (path3) => {
	return `${baseUrl}/${basePkgUrl}/${pkg}/${path3}`;
};
var resolveKnowledgeBaseLinkDoc = (path3) => {
	return `${baseUrl}/${baseKnowledgeBaseUrl}/${path3}`;
};
var resolvePkgDocItems = (pkg) => (patterns) => {
	const patternsArr = Array.isArray(patterns)
		? patterns
		: [
				patterns,
			];
	const pkgPatterns = patternsArr.map((pattern) => {
		return `${basePkgUrl}/${pkg}/${pattern}`;
	});
	return resolveByPattern(pkgPatterns);
};
var resolveKnowledgeBaseDocItems = (patterns) => {
	const patternsArr = Array.isArray(patterns)
		? patterns
		: [
				patterns,
			];
	const knowledgeBasePatterns = patternsArr.map((pattern) => {
		return `${baseKnowledgeBaseUrl}/${pattern}`;
	});
	return resolveByPattern(knowledgeBasePatterns);
};

// docs/.vitepress/routes/knowledge-base/knowledge-base.docs.routes.ts
var knowledgeBaseIndexRoute = {
	text: 'index',
	link: resolveKnowledgeBaseLinkDoc('index.md'),
};
var knowledgeBaseRoutes = [
	{
		text: 'Knowledge Base',
		collapsed: false,
		items: [
			knowledgeBaseIndexRoute,
			{
				text: 'FAQ',
				link: resolveKnowledgeBaseLinkDoc('faq/Readme.md'),
				collapsed: true,
			},
			{
				text: 'Sections',
				collapsed: true,
				items: [
					{
						text: 'General',
						collapsed: false,
						items: [
							{
								text: 'Code Base Deprecation Info',
								link: resolveKnowledgeBaseLinkDoc(
									'general/code-base-deprecation-info/Readme.md',
								),
							},
							{
								text: 'Branching',
								link: resolveKnowledgeBaseLinkDoc(
									'general/branching/Readme.md',
								),
							},
							{
								text: '\u{1F4DC} | Client-Server Communication',
								link: resolveKnowledgeBaseLinkDoc(
									'general/client-server-communication/Readme.md',
								),
							},
							{
								text: 'SCSS to CSS Migration',
								link: resolveKnowledgeBaseLinkDoc(
									'general/scss-to-css-migration/Readme.md',
								),
							},
						],
					},
					{
						text: 'Projects structure',
						collapsed: true,
						items: [
							{
								text: 'App Structure',
								link: resolveKnowledgeBaseLinkDoc(
									'projects-structure/app-structure/Readme.md',
								),
							},
							{
								text: 'Applications List',
								link: resolveKnowledgeBaseLinkDoc(
									'projects-structure/applications-list/Readme.md',
								),
							},
							{
								text: 'Webitel packages',
								link: resolveKnowledgeBaseLinkDoc(
									'projects-structure/webitel-packages/Readme.md',
								),
							},
						],
					},
					{
						text: 'Code Style',
						collapsed: true,
						items: [
							{
								text: 'index',
								link: resolveKnowledgeBaseLinkDoc('code-style/index.md'),
							},
							{
								text: 'CSS',
								link: resolveKnowledgeBaseLinkDoc('code-style/css/index.md'),
							},
							{
								text: 'Inspiration Sources',
								link: resolveKnowledgeBaseLinkDoc(
									'code-style/inspirations/index.md',
								),
							},
							{
								text: 'Linting and Formatting',
								link: resolveKnowledgeBaseLinkDoc(
									'code-style/linting-and-reformatting/index.md',
								),
							},
						],
					},
					{
						text: 'Namings',
						collapsed: true,
						items: resolveKnowledgeBaseDocItems('namings/**/*.md'),
					},
					{
						text: 'How To',
						collapsed: true,
						items: [
							{
								text: 'Estimate a task',
								link: resolveKnowledgeBaseLinkDoc(
									'how-to/estimate-task/Readme.md',
								),
							},
							{
								text: 'Make a hotfix',
								link: resolveKnowledgeBaseLinkDoc(
									'how-to/make-hotfix/Readme.md',
								),
							},
							{
								text: 'Add new docs page',
								link: resolveKnowledgeBaseLinkDoc(
									'how-to/add-docs-page/Readme.md',
								),
							},
							{
								text: 'Setup Workspace app',
								link: resolveKnowledgeBaseLinkDoc(
									'how-to/setup-workspace-app-entities/Readme.md',
								),
							},
							{
								text: '\u{1F4DC} | Add REST API module',
								link: resolveKnowledgeBaseLinkDoc(
									'how-to/add-rest-api-module/Readme.md',
								),
							},
						],
					},
					{
						text: '\u{1F4DC} | Testing Cookbook',
						collapsed: true,
						items: resolveKnowledgeBaseDocItems('testing-cookbook/**/*.md'),
					},
				],
			},
		],
	},
];

// docs/.vitepress/routes/packages/api-services.docs.routes.ts
var resolveLink = resolvePkgLinkDoc('api-services');
var apiServicesIndexRoute = {
	text: 'index',
	link: resolveLink('index.md'),
};
var apiServicesRoutes = [
	{
		text: '@webitel/api-services',
		collapsed: false,
		items: [
			apiServicesIndexRoute,
			{
				text: 'Introduction',
				link: resolveLink('intro/index.md'),
			},
			{
				text: 'Package Contents',
				link: resolveLink('contents/index.md'),
			},
			{
				text: 'Usage',
				items: [
					{
						text: 'index',
						link: resolveLink('usage/index.md'),
					},
					{
						text: 'TLDR; Usage Example',
						link: resolveLink('usage/tldr-usage/index.md'),
					},
					{
						text: 'Migration from webitel-sdk',
						link: resolveLink('usage/migration/webitel-sdk/index.md'),
					},
					{
						text: 'Migration from @webitel/ui-sdk/api',
						link: resolveLink('usage/migration/ui-sdk/index.md'),
					},
				],
			},
		],
	},
];

// docs/.vitepress/routes/packages/ui-datalist.docs.routes.ts
var resolveLink2 = resolvePkgLinkDoc('ui-datalist');
var uiDatalistIndexRoute = {
	text: 'index',
	link: resolveLink2('index.md'),
};
var uiDatalistRoutes = [
	{
		text: '@webitel/ui-datalist',
		collapsed: false,
		items: [
			uiDatalistIndexRoute,
			{
				text: 'Package Contents',
				link: resolveLink2('contents/index.md'),
			},
			{
				text: 'Shared Modules',
				collapsed: true,
				items: [
					{
						text: 'index',
						link: resolveLink2('shared/index.md'),
					},
					{
						text: 'Stores persistence',
						link: resolveLink2('shared/persist/index.md'),
					},
					{
						text: 'Store types',
						link: resolveLink2('shared/store-types/index.md'),
					},
				],
			},
			{
				text: 'Table Tools',
				collapsed: true,
				items: [
					{
						text: 'index',
						link: resolveLink2('table-tools/index.md'),
					},
					{
						text: 'Table Module',
						link: resolveLink2('table-tools/table/index.md'),
					},
					{
						text: 'Page, Headers, Filters',
						link: resolveLink2('table-tools/table-deps/index.md'),
					},
				],
			},
			{
				text: 'Card Tools',
				collapsed: true,
				items: [
					{
						text: 'index',
						link: resolveLink2('card-tools/index.md'),
					},
					{
						text: 'Card Module',
						collapsed: true,
						items: [
							{
								text: 'main',
								link: resolveLink2('card-tools/card/Readme.md'),
							},
							{
								text: 'Card Composables',
								link: resolveLink2('card-tools/card/composables/Readme.md'),
							},
							{
								text: 'Card Store',
								link: resolveLink2('card-tools/card/stores/Readme.md'),
							},
							{
								text: 'Usage',
								link: resolveLink2('card-tools/card/usage/Readme.md'),
							},
						],
					},
					{
						text: 'Validation',
						collapsed: true,
						items: [
							{
								text: 'main',
								link: resolveLink2('card-tools/validations/Readme.md'),
							},
							{
								text: 'Regle',
								link: resolveLink2('card-tools/validations/regle/Readme.md'),
							},
							{
								text: 'Zod',
								link: resolveLink2('card-tools/validations/zod/Readme.md'),
							},
							{
								text: 'Usage',
								link: resolveLink2('card-tools/validations/usage/Readme.md'),
							},
						],
					},
				],
			},
		],
	},
];

// docs/.vitepress/routes/packages/ui-sdk.docs.routes.ts
var resolveLink3 = resolvePkgLinkDoc('ui-sdk');
var resolveItems = resolvePkgDocItems('ui-sdk');
var uiSdkIndexRoute = {
	text: 'index',
	link: resolveLink3('index.md'),
};
var uiSdkRoutes = [
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
								items: resolveItems(
									'modules/CallSessionModule/components/**/*.md',
								),
							},
						],
					},
					{
						text: 'Userinfo',
						collapsed: true,
						items: [
							{
								text: 'index',
								items: resolveLink3('modules/Userinfo/index.md'),
							},
						],
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

// docs/.vitepress/routes/routes.ts
var navbarNav = [
	{
		text: 'Home',
		link: '/',
	},
	{
		text: 'Knowledge Base',
		link: knowledgeBaseIndexRoute.link,
	},
	{
		text: '@webitel/api-services',
		link: apiServicesIndexRoute.link,
	},
	{
		text: '@webitel/ui-datalist',
		link: uiDatalistIndexRoute.link,
	},
	{
		text: '@webitel/ui-sdk',
		link: uiSdkIndexRoute.link,
	},
];
var sidebarNav = [
	...knowledgeBaseRoutes,
	...apiServicesRoutes,
	...uiDatalistRoutes,
	...uiSdkRoutes,
];
var linkify = (nav2) => {
	if (Array.isArray(nav2)) {
		return nav2.map((item) => linkify(item));
	}
	if (isObject(nav2)) {
		if (nav2.link) return nav2;
		return {
			...nav2,
			items: nav2.items.map((item) => linkify(item)),
		};
	}
	if (typeof nav2 === 'string') {
		const getParentDirName = (nav3) => nav3.split('/').at(-2);
		const getFilename = (nav3) => nav3.split('/').pop().replace(/\.md$/, '');
		const getLink = (nav3) => '/pages/'.concat(nav3.replace('.md', '.html'));
		const text = nav2.endsWith('Readme.md')
			? getParentDirName(nav2)
			: getFilename(nav2);
		const link = getLink(nav2);
		return {
			text,
			link,
		};
	}
	console.error('tf is that sidebar nav item type', nav2);
	return nav2;
};
var generateSidebar = (sidebarNav2) => {
	const sb = linkify(sidebarNav2);
	return sb;
};
var generateNav = (navbarNav2) => {
	const nav2 = linkify(navbarNav2);
	return nav2;
};
var sidebar = generateSidebar(sidebarNav);
var nav = generateNav(navbarNav);

// docs/.vitepress/config.mjs
import { Window } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/happy-dom/lib/index.js';
import { vite as vidstack } from 'file:///Users/admin/Projects/webitel/webitel-ui-sdk/node_modules/vidstack/plugins.js';
var __vite_injected_original_dirname2 =
	'/Users/admin/Projects/webitel/webitel-ui-sdk/docs/.vitepress';
global.localStorage = new Window().localStorage;
global.requestAnimationFrame = new Window().requestAnimationFrame;
global.Element = new Window().Element;
global.HTMLElement = new Window().HTMLElement;
global.customElements = new Window().customElements;
var config_default = defineVitepressConfig({
	title: '@webitel/ui',
	description: 'Webitel UI docs',
	base: '/webitel-ui-sdk/',
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">\u{1F9D1}\u200D\u{1F4BB} </text></svg>',
			},
		],
	],
	vue: {
		template: {
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith('media-'),
			},
		},
	},
	lastUpdated: true,
	vite: {
		build: {
			rollupOptions: {
				// external: ['@webitel/styleguide/extend', '@webitel/styleguide/primitive', '@webitel/styleguide/semantic'],
			},
		},
		resolve: {
			alias: {
				__lib__: path2.resolve(__vite_injected_original_dirname2, '../../src'),
				'@aliasedDeps/api-services/axios': path2.resolve(
					__vite_injected_original_dirname2,
					'./aliases/axios',
				),
			},
		},
		ssr: {
			noExternal: [
				'@vuelidate/core',
				'vue-multiselect',
				'webitel-sdk',
			],
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
					// or "modern-compiler", "legacy",
				},
			},
		},
		plugins: [
			vidstack(),
			nodePolyfills({
				globals: {
					process: true,
				},
			}),
			tailwindcss(),
			(() => {
				const docgen = vueDocgenPlugin({
					include: globbySync2([
						'src/**/*.vue',
					]),
					injectAt: 'docs',
				});
				docgen.enforce = null;
				return docgen;
			})(),
		],
	},
	// additionalData: `@import "../../src/css/main.scss";`,
	themeConfig: {
		// search won't work till i18n locales are "legacy: false"
		search: {
			provider: 'local',
		},
		// https://vitepress.dev/reference/default-theme-config
		nav,
		sidebar,
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/webitel/webitel-ui-sdk',
			},
			{
				icon: {
					svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">\u{1F4D6}</text></svg>',
				},
				link: 'https://github.com/webitel/webitel-ui-sdk/tree/master/docs',
			},
		],
		// https://vitepress.dev/reference/default-theme-edit-link#site-level-config
		editLink: {
			// https://vitepress.dev/reference/runtime-api#usedata
			pattern:
				'https://github.com/webitel/webitel-ui-sdk/tree/master/docs/:path',
		},
	},
});
export { config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tanMiLCAiZG9jcy8udml0ZXByZXNzL3JvdXRlcy9yb3V0ZXMudHMiLCAiZG9jcy8udml0ZXByZXNzL3JvdXRlcy9yb3V0ZVJlc29sdmVycy50cyIsICJkb2NzLy52aXRlcHJlc3Mvcm91dGVzL2tub3dsZWRnZS1iYXNlL2tub3dsZWRnZS1iYXNlLmRvY3Mucm91dGVzLnRzIiwgImRvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvYXBpLXNlcnZpY2VzLmRvY3Mucm91dGVzLnRzIiwgImRvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvdWktZGF0YWxpc3QuZG9jcy5yb3V0ZXMudHMiLCAiZG9jcy8udml0ZXByZXNzL3JvdXRlcy9wYWNrYWdlcy91aS1zZGsuZG9jcy5yb3V0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vUHJvamVjdHMvd2ViaXRlbC93ZWJpdGVsLXVpLXNkay9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubWpzXCI7aW1wb3J0IHsgZ2xvYmJ5U3luYyB9IGZyb20gJ2dsb2JieSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5pbXBvcnQgdnVlRG9jZ2VuUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kb2NnZW4nO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIGFzIGRlZmluZVZpdGVwcmVzc0NvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHsgbmF2LCBzaWRlYmFyIH0gZnJvbSAnLi9yb3V0ZXMvcm91dGVzLnRzJztcbmltcG9ydCB7IFdpbmRvdyB9IGZyb20gJ2hhcHB5LWRvbSc7XG5pbXBvcnQgeyB2aXRlIGFzIHZpZHN0YWNrIH0gZnJvbSAndmlkc3RhY2svcGx1Z2lucyc7XG5cbmdsb2JhbC5sb2NhbFN0b3JhZ2UgPSBuZXcgV2luZG93KCkubG9jYWxTdG9yYWdlOyAvLyBjb3ogdml0ZXByZXNzIHNzciBkb2Vzbid0IGhhdmUgbG9jYWxTdG9yYWdlXG5nbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gbmV3IFdpbmRvdygpLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbmdsb2JhbC5FbGVtZW50ID0gbmV3IFdpbmRvdygpLkVsZW1lbnQ7XG5nbG9iYWwuSFRNTEVsZW1lbnQgPSBuZXcgV2luZG93KCkuSFRNTEVsZW1lbnQ7XG5nbG9iYWwuY3VzdG9tRWxlbWVudHMgPSBuZXcgV2luZG93KCkuY3VzdG9tRWxlbWVudHM7XG5cbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVZpdGVwcmVzc0NvbmZpZyh7XG4gIHRpdGxlOiAnQHdlYml0ZWwvdWknLFxuICBkZXNjcmlwdGlvbjogJ1dlYml0ZWwgVUkgZG9jcycsXG4gIGJhc2U6ICcvd2ViaXRlbC11aS1zZGsvJyxcbiAgaGVhZDogW1xuICAgIFtcbiAgICAgICdsaW5rJyxcbiAgICAgIHtcbiAgICAgICAgcmVsOiAnaWNvbicsXG4gICAgICAgIGhyZWY6ICdkYXRhOmltYWdlL3N2Zyt4bWwsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PHRleHQgeT1cIi45ZW1cIiBmb250LXNpemU9XCI5MFwiPlx1RDgzRVx1REREMVx1MjAwRFx1RDgzRFx1RENCQiA8L3RleHQ+PC9zdmc+JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgXSxcbiAgdnVlOiB7XG4gICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnLnN0YXJ0c1dpdGgoJ21lZGlhLScpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxuICB2aXRlOiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgLy8gZXh0ZXJuYWw6IFsnQHdlYml0ZWwvc3R5bGVndWlkZS9leHRlbmQnLCAnQHdlYml0ZWwvc3R5bGVndWlkZS9wcmltaXRpdmUnLCAnQHdlYml0ZWwvc3R5bGVndWlkZS9zZW1hbnRpYyddLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdfX2xpYl9fJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLFxuICAgICAgICAnQGFsaWFzZWREZXBzL2FwaS1zZXJ2aWNlcy9heGlvcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2FsaWFzZXMvYXhpb3MnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzc3I6IHtcbiAgICAgIG5vRXh0ZXJuYWw6IFsnQHZ1ZWxpZGF0ZS9jb3JlJywgJ3Z1ZS1tdWx0aXNlbGVjdCcsICd3ZWJpdGVsLXNkayddLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhcGk6ICdtb2Rlcm4nLCAvLyBvciBcIm1vZGVybi1jb21waWxlclwiLCBcImxlZ2FjeVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZpZHN0YWNrKCksXG4gICAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgICAoKCkgPT4ge1xuICAgICAgICBjb25zdCBkb2NnZW4gPSB2dWVEb2NnZW5QbHVnaW4oe1xuICAgICAgICAgIGluY2x1ZGU6IGdsb2JieVN5bmMoWydzcmMvKiovKi52dWUnXSksXG4gICAgICAgICAgaW5qZWN0QXQ6ICdkb2NzJyxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGR1bm5vIHdoeSwgYnV0IGRlZmF1bHQgZW5mb3JjZSB2YWx1ZSBicmVha3MgYnVpbGRcbiAgICAgICAgZG9jZ2VuLmVuZm9yY2UgPSBudWxsO1xuICAgICAgICByZXR1cm4gZG9jZ2VuO1xuICAgICAgfSkoKSxcbiAgICBdLFxuICB9LFxuXG4gIC8vIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4uLy4uL3NyYy9jc3MvbWFpbi5zY3NzXCI7YCxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBzZWFyY2ggd29uJ3Qgd29yayB0aWxsIGkxOG4gbG9jYWxlcyBhcmUgXCJsZWdhY3k6IGZhbHNlXCJcbiAgICBzZWFyY2g6IHsgcHJvdmlkZXI6ICdsb2NhbCcgfSxcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgbmF2LFxuICAgIHNpZGViYXIsXG5cbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAge1xuICAgICAgICBpY29uOiAnZ2l0aHViJyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS93ZWJpdGVsL3dlYml0ZWwtdWktc2RrJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGljb246IHsgc3ZnOiAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PHRleHQgeT1cIi45ZW1cIiBmb250LXNpemU9XCI5MFwiPlx1RDgzRFx1RENENjwvdGV4dD48L3N2Zz4nIH0sXG4gICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vd2ViaXRlbC93ZWJpdGVsLXVpLXNkay90cmVlL21hc3Rlci9kb2NzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtZWRpdC1saW5rI3NpdGUtbGV2ZWwtY29uZmlnXG4gICAgZWRpdExpbms6IHtcbiAgICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvcnVudGltZS1hcGkjdXNlZGF0YVxuICAgICAgcGF0dGVybjpcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL3RyZWUvbWFzdGVyL2RvY3MvOnBhdGgnLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlcy9yb3V0ZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlcy9yb3V0ZXMudHNcIjtpbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcblxuaW1wb3J0IHtrbm93bGVkZ2VCYXNlSW5kZXhSb3V0ZSxrbm93bGVkZ2VCYXNlUm91dGVzIH0gZnJvbSBcIi4va25vd2xlZGdlLWJhc2Uva25vd2xlZGdlLWJhc2UuZG9jcy5yb3V0ZXNcIjtcbmltcG9ydCB7IGFwaVNlcnZpY2VzSW5kZXhSb3V0ZSxhcGlTZXJ2aWNlc1JvdXRlcywgIH0gZnJvbSBcIi4vcGFja2FnZXMvYXBpLXNlcnZpY2VzLmRvY3Mucm91dGVzXCI7XG5pbXBvcnQgeyB1aURhdGFsaXN0SW5kZXhSb3V0ZSwgdWlEYXRhbGlzdFJvdXRlcyB9IGZyb20gJy4vcGFja2FnZXMvdWktZGF0YWxpc3QuZG9jcy5yb3V0ZXMnO1xuaW1wb3J0IHsgdWlTZGtJbmRleFJvdXRlLHVpU2RrUm91dGVzIH0gZnJvbSBcIi4vcGFja2FnZXMvdWktc2RrLmRvY3Mucm91dGVzXCI7XG5cbmNvbnN0IG5hdmJhck5hdiA9IFtcbiAgeyB0ZXh0OiAnSG9tZScsIGxpbms6ICcvJyB9LFxuICB7IHRleHQ6ICdLbm93bGVkZ2UgQmFzZScsIGxpbms6IGtub3dsZWRnZUJhc2VJbmRleFJvdXRlLmxpbmsgfSxcbiAgeyB0ZXh0OiAnQHdlYml0ZWwvYXBpLXNlcnZpY2VzJywgbGluazogYXBpU2VydmljZXNJbmRleFJvdXRlLmxpbmsgfSxcbiAgeyB0ZXh0OiAnQHdlYml0ZWwvdWktZGF0YWxpc3QnLCBsaW5rOiB1aURhdGFsaXN0SW5kZXhSb3V0ZS5saW5rIH0sXG4gIHsgdGV4dDogJ0B3ZWJpdGVsL3VpLXNkaycsIGxpbms6IHVpU2RrSW5kZXhSb3V0ZS5saW5rIH0sXG5dO1xuXG5jb25zdCBzaWRlYmFyTmF2ID0gW1xuICAuLi5rbm93bGVkZ2VCYXNlUm91dGVzLFxuICAuLi5hcGlTZXJ2aWNlc1JvdXRlcyxcbiAgLi4udWlEYXRhbGlzdFJvdXRlcyxcbiAgLi4udWlTZGtSb3V0ZXMsXG5dO1xuXG5jb25zdCBsaW5raWZ5ID0gKG5hdikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShuYXYpKSB7XG4gICAgcmV0dXJuIG5hdi5tYXAoKGl0ZW0pID0+IGxpbmtpZnkoaXRlbSkpO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KG5hdikpIHtcbiAgICBpZiAobmF2LmxpbmspIHJldHVybiBuYXY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubmF2LFxuICAgICAgaXRlbXM6IG5hdi5pdGVtcy5tYXAoKGl0ZW0pID0+IGxpbmtpZnkoaXRlbSkpLFxuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIG5hdiA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBnZXRQYXJlbnREaXJOYW1lID0gKG5hdikgPT4gbmF2LnNwbGl0KCcvJykuYXQoLTIpO1xuICAgIGNvbnN0IGdldEZpbGVuYW1lID0gKG5hdikgPT4gbmF2LnNwbGl0KCcvJykucG9wKCkucmVwbGFjZSgvXFwubWQkLywgJycpO1xuICAgIGNvbnN0IGdldExpbmsgPSAobmF2KSA9PiAnL3BhZ2VzLycuY29uY2F0KG5hdi5yZXBsYWNlKCcubWQnLCAnLmh0bWwnKSk7XG5cbiAgICBjb25zdCB0ZXh0ID0gbmF2LmVuZHNXaXRoKCdSZWFkbWUubWQnKVxuICAgICAgPyBnZXRQYXJlbnREaXJOYW1lKG5hdilcbiAgICAgIDogZ2V0RmlsZW5hbWUobmF2KTtcbiAgICBjb25zdCBsaW5rID0gZ2V0TGluayhuYXYpO1xuXG4gICAgcmV0dXJuIHsgdGV4dCwgbGluayB9O1xuICB9XG5cbiAgY29uc29sZS5lcnJvcigndGYgaXMgdGhhdCBzaWRlYmFyIG5hdiBpdGVtIHR5cGUnLCBuYXYpO1xuXG4gIHJldHVybiBuYXY7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVNpZGViYXIgPSAoc2lkZWJhck5hdikgPT4ge1xuICBjb25zdCBzYiA9IGxpbmtpZnkoc2lkZWJhck5hdik7XG4gIC8vIGNvbnNvbGUuaW5mbyhKU09OLnN0cmluZ2lmeShzYiwgbnVsbCwgMikpO1xuICByZXR1cm4gc2I7XG59O1xuXG5jb25zdCBnZW5lcmF0ZU5hdiA9IChuYXZiYXJOYXYpID0+IHtcbiAgY29uc3QgbmF2ID0gbGlua2lmeShuYXZiYXJOYXYpO1xuICAvLyBjb25zb2xlLmluZm8oSlNPTi5zdHJpbmdpZnkoc2IsIG51bGwsIDIpKTtcbiAgcmV0dXJuIG5hdjtcbn07XG5cbmNvbnN0IHNpZGViYXIgPSBnZW5lcmF0ZVNpZGViYXIoc2lkZWJhck5hdik7XG5jb25zdCBuYXYgPSBnZW5lcmF0ZU5hdihuYXZiYXJOYXYpO1xuXG5leHBvcnQgeyBuYXYsIHNpZGViYXIgfTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlcy9yb3V0ZVJlc29sdmVycy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWRtaW4vUHJvamVjdHMvd2ViaXRlbC93ZWJpdGVsLXVpLXNkay9kb2NzLy52aXRlcHJlc3Mvcm91dGVzL3JvdXRlUmVzb2x2ZXJzLnRzXCI7aW1wb3J0IHsgZ2xvYmJ5U3luYyB9IGZyb20gJ2dsb2JieSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgYmFzZVVybCA9ICdwYWdlcyc7XG5jb25zdCBiYXNlUGtnVXJsID0gJ3BhY2thZ2VzJztcbmNvbnN0IGJhc2VLbm93bGVkZ2VCYXNlVXJsID0gJ2tub3dsZWRnZS1iYXNlJztcblxuZXhwb3J0IHR5cGUgRG9jUGtnID0gJ3VpLXNkaycgfCAnYXBpLXNlcnZpY2VzJyB8ICd1aS1kYXRhbGlzdCc7XG5cbmNvbnN0IHJlc29sdmVCeVBhdHRlcm4gPSAocGF0dGVybnM6IHN0cmluZyB8IHN0cmluZ1tdKSA9PiB7XG4gICAgcmV0dXJuIGdsb2JieVN5bmMocGF0dGVybnMsIHsgY3dkOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBgLi4vLi4vJHtiYXNlVXJsfS9gKSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlUGtnTGlua0RvYyA9IChwa2c6IERvY1BrZykgPT4gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtiYXNlVXJsfS8ke2Jhc2VQa2dVcmx9LyR7cGtnfS8ke3BhdGh9YDtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MgPSAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke2Jhc2VVcmx9LyR7YmFzZUtub3dsZWRnZUJhc2VVcmx9LyR7cGF0aH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVQa2dEb2NJdGVtcyA9IChwa2c6IERvY1BrZykgPT4gKHBhdHRlcm5zOiBzdHJpbmcgfCBzdHJpbmdbXSkgPT4ge1xuICAgIGNvbnN0IHBhdHRlcm5zQXJyID0gQXJyYXkuaXNBcnJheShwYXR0ZXJucykgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cbiAgICBjb25zdCBwa2dQYXR0ZXJucyA9IHBhdHRlcm5zQXJyLm1hcCgocGF0dGVybikgPT4ge1xuICAgICAgICByZXR1cm4gYCR7YmFzZVBrZ1VybH0vJHtwa2d9LyR7cGF0dGVybn1gO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc29sdmVCeVBhdHRlcm4ocGtnUGF0dGVybnMpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVLbm93bGVkZ2VCYXNlRG9jSXRlbXMgPSAocGF0dGVybnM6IHN0cmluZyB8IHN0cmluZ1tdKSA9PiB7XG4gICAgY29uc3QgcGF0dGVybnNBcnIgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuICAgIGNvbnN0IGtub3dsZWRnZUJhc2VQYXR0ZXJucyA9IHBhdHRlcm5zQXJyLm1hcCgocGF0dGVybikgPT4ge1xuICAgICAgICByZXR1cm4gYCR7YmFzZUtub3dsZWRnZUJhc2VVcmx9LyR7cGF0dGVybn1gO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc29sdmVCeVBhdHRlcm4oa25vd2xlZGdlQmFzZVBhdHRlcm5zKTtcbn07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vUHJvamVjdHMvd2ViaXRlbC93ZWJpdGVsLXVpLXNkay9kb2NzLy52aXRlcHJlc3Mvcm91dGVzL2tub3dsZWRnZS1iYXNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRtaW4vUHJvamVjdHMvd2ViaXRlbC93ZWJpdGVsLXVpLXNkay9kb2NzLy52aXRlcHJlc3Mvcm91dGVzL2tub3dsZWRnZS1iYXNlL2tub3dsZWRnZS1iYXNlLmRvY3Mucm91dGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMva25vd2xlZGdlLWJhc2Uva25vd2xlZGdlLWJhc2UuZG9jcy5yb3V0ZXMudHNcIjtpbXBvcnQge1xuXHRyZXNvbHZlS25vd2xlZGdlQmFzZURvY0l0ZW1zLFxuXHRyZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MsXG59IGZyb20gJy4uL3JvdXRlUmVzb2x2ZXJzJztcblxuZXhwb3J0IGNvbnN0IGtub3dsZWRnZUJhc2VJbmRleFJvdXRlID0ge1xuXHR0ZXh0OiAnaW5kZXgnLFxuXHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoJ2luZGV4Lm1kJyksXG59O1xuXG5leHBvcnQgY29uc3Qga25vd2xlZGdlQmFzZVJvdXRlcyA9IFtcblx0e1xuXHRcdHRleHQ6ICdLbm93bGVkZ2UgQmFzZScsXG5cdFx0Y29sbGFwc2VkOiBmYWxzZSxcblx0XHRpdGVtczogW1xuXHRcdFx0a25vd2xlZGdlQmFzZUluZGV4Um91dGUsXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdGQVEnLFxuXHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoJ2ZhcS9SZWFkbWUubWQnKSxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1NlY3Rpb25zJyxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdHZW5lcmFsJyxcblx0XHRcdFx0XHRcdGNvbGxhcHNlZDogZmFsc2UsXG5cdFx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ0NvZGUgQmFzZSBEZXByZWNhdGlvbiBJbmZvJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoXG5cdFx0XHRcdFx0XHRcdFx0XHQnZ2VuZXJhbC9jb2RlLWJhc2UtZGVwcmVjYXRpb24taW5mby9SZWFkbWUubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnQnJhbmNoaW5nJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoXG5cdFx0XHRcdFx0XHRcdFx0XHQnZ2VuZXJhbC9icmFuY2hpbmcvUmVhZG1lLm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ1x1RDgzRFx1RENEQyB8IENsaWVudC1TZXJ2ZXIgQ29tbXVuaWNhdGlvbicsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogcmVzb2x2ZUtub3dsZWRnZUJhc2VMaW5rRG9jKFxuXHRcdFx0XHRcdFx0XHRcdFx0J2dlbmVyYWwvY2xpZW50LXNlcnZlci1jb21tdW5pY2F0aW9uL1JlYWRtZS5tZCcsXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6ICdTQ1NTIHRvIENTUyBNaWdyYXRpb24nLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdnZW5lcmFsL3Njc3MtdG8tY3NzLW1pZ3JhdGlvbi9SZWFkbWUubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ1Byb2plY3RzIHN0cnVjdHVyZScsXG5cdFx0XHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ0FwcCBTdHJ1Y3R1cmUnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdwcm9qZWN0cy1zdHJ1Y3R1cmUvYXBwLXN0cnVjdHVyZS9SZWFkbWUubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnQXBwbGljYXRpb25zIExpc3QnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdwcm9qZWN0cy1zdHJ1Y3R1cmUvYXBwbGljYXRpb25zLWxpc3QvUmVhZG1lLm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ1dlYml0ZWwgcGFja2FnZXMnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdwcm9qZWN0cy1zdHJ1Y3R1cmUvd2ViaXRlbC1wYWNrYWdlcy9SZWFkbWUubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ0NvZGUgU3R5bGUnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6ICdpbmRleCcsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogcmVzb2x2ZUtub3dsZWRnZUJhc2VMaW5rRG9jKCdjb2RlLXN0eWxlL2luZGV4Lm1kJyksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnQ1NTJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoJ2NvZGUtc3R5bGUvY3NzL2luZGV4Lm1kJyksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnSW5zcGlyYXRpb24gU291cmNlcycsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogcmVzb2x2ZUtub3dsZWRnZUJhc2VMaW5rRG9jKFxuXHRcdFx0XHRcdFx0XHRcdFx0J2NvZGUtc3R5bGUvaW5zcGlyYXRpb25zL2luZGV4Lm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ0xpbnRpbmcgYW5kIEZvcm1hdHRpbmcnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdjb2RlLXN0eWxlL2xpbnRpbmctYW5kLXJlZm9ybWF0dGluZy9pbmRleC5tZCcsXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnTmFtaW5ncycsXG5cdFx0XHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpdGVtczogcmVzb2x2ZUtub3dsZWRnZUJhc2VEb2NJdGVtcygnbmFtaW5ncy8qKi8qLm1kJyksXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnSG93IFRvJyxcblx0XHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnRXN0aW1hdGUgYSB0YXNrJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoXG5cdFx0XHRcdFx0XHRcdFx0XHQnaG93LXRvL2VzdGltYXRlLXRhc2svUmVhZG1lLm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ01ha2UgYSBob3RmaXgnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdob3ctdG8vbWFrZS1ob3RmaXgvUmVhZG1lLm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ0FkZCBuZXcgZG9jcyBwYWdlJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiByZXNvbHZlS25vd2xlZGdlQmFzZUxpbmtEb2MoXG5cdFx0XHRcdFx0XHRcdFx0XHQnaG93LXRvL2FkZC1kb2NzLXBhZ2UvUmVhZG1lLm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogJ1NldHVwIFdvcmtzcGFjZSBhcHAnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IHJlc29sdmVLbm93bGVkZ2VCYXNlTGlua0RvYyhcblx0XHRcdFx0XHRcdFx0XHRcdCdob3ctdG8vc2V0dXAtd29ya3NwYWNlLWFwcC1lbnRpdGllcy9SZWFkbWUubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnXHVEODNEXHVEQ0RDIHwgQWRkIFJFU1QgQVBJIG1vZHVsZScsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogcmVzb2x2ZUtub3dsZWRnZUJhc2VMaW5rRG9jKFxuXHRcdFx0XHRcdFx0XHRcdFx0J2hvdy10by9hZGQtcmVzdC1hcGktbW9kdWxlL1JlYWRtZS5tZCcsXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnXHVEODNEXHVEQ0RDIHwgVGVzdGluZyBDb29rYm9vaycsXG5cdFx0XHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpdGVtczogcmVzb2x2ZUtub3dsZWRnZUJhc2VEb2NJdGVtcygndGVzdGluZy1jb29rYm9vay8qKi8qLm1kJyksXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSxcbl07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvYXBpLXNlcnZpY2VzLmRvY3Mucm91dGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvYXBpLXNlcnZpY2VzLmRvY3Mucm91dGVzLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZVBrZ0xpbmtEb2MgfSBmcm9tICcuLi9yb3V0ZVJlc29sdmVycyc7XG5cbmNvbnN0IHJlc29sdmVMaW5rID0gcmVzb2x2ZVBrZ0xpbmtEb2MoJ2FwaS1zZXJ2aWNlcycpO1xuXG5leHBvcnQgY29uc3QgYXBpU2VydmljZXNJbmRleFJvdXRlID0gIHtcbiAgdGV4dDogJ2luZGV4JyxcbiAgbGluazogcmVzb2x2ZUxpbmsoJ2luZGV4Lm1kJyksXG59O1xuXG5leHBvcnQgY29uc3QgYXBpU2VydmljZXNSb3V0ZXMgPSBbe1xuICB0ZXh0OiAnQHdlYml0ZWwvYXBpLXNlcnZpY2VzJyxcbiAgY29sbGFwc2VkOiBmYWxzZSxcbiAgaXRlbXM6IFtcbiAgICBhcGlTZXJ2aWNlc0luZGV4Um91dGUsXG4gICAge1xuICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICBsaW5rOiByZXNvbHZlTGluaygnaW50cm8vaW5kZXgubWQnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQYWNrYWdlIENvbnRlbnRzJyxcbiAgICAgIGxpbms6IHJlc29sdmVMaW5rKCdjb250ZW50cy9pbmRleC5tZCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1VzYWdlJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnaW5kZXgnLFxuICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCd1c2FnZS9pbmRleC5tZCcpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1RMRFI7IFVzYWdlIEV4YW1wbGUnLFxuICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCd1c2FnZS90bGRyLXVzYWdlL2luZGV4Lm1kJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTWlncmF0aW9uIGZyb20gd2ViaXRlbC1zZGsnLFxuICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCd1c2FnZS9taWdyYXRpb24vd2ViaXRlbC1zZGsvaW5kZXgubWQnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdNaWdyYXRpb24gZnJvbSBAd2ViaXRlbC91aS1zZGsvYXBpJyxcbiAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygndXNhZ2UvbWlncmF0aW9uL3VpLXNkay9pbmRleC5tZCcpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufV07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvdWktZGF0YWxpc3QuZG9jcy5yb3V0ZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FkbWluL1Byb2plY3RzL3dlYml0ZWwvd2ViaXRlbC11aS1zZGsvZG9jcy8udml0ZXByZXNzL3JvdXRlcy9wYWNrYWdlcy91aS1kYXRhbGlzdC5kb2NzLnJvdXRlcy50c1wiO2ltcG9ydCB7IHJlc29sdmVQa2dMaW5rRG9jIH0gZnJvbSAnLi4vcm91dGVSZXNvbHZlcnMnO1xuXG5jb25zdCByZXNvbHZlTGluayA9IHJlc29sdmVQa2dMaW5rRG9jKCd1aS1kYXRhbGlzdCcpO1xuXG5leHBvcnQgY29uc3QgdWlEYXRhbGlzdEluZGV4Um91dGUgPSAge1xuICB0ZXh0OiAnaW5kZXgnLFxuICBsaW5rOiByZXNvbHZlTGluaygnaW5kZXgubWQnKSxcbn07XG5cbmV4cG9ydCBjb25zdCB1aURhdGFsaXN0Um91dGVzID0gW3tcbiAgdGV4dDogJ0B3ZWJpdGVsL3VpLWRhdGFsaXN0JyxcbiAgY29sbGFwc2VkOiBmYWxzZSxcbiAgaXRlbXM6IFtcbiAgICB1aURhdGFsaXN0SW5kZXhSb3V0ZSxcbiAgICB7XG4gICAgICB0ZXh0OiAnUGFja2FnZSBDb250ZW50cycsXG4gICAgICBsaW5rOiByZXNvbHZlTGluaygnY29udGVudHMvaW5kZXgubWQnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdTaGFyZWQgTW9kdWxlcycsXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ2luZGV4JyxcbiAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygnc2hhcmVkL2luZGV4Lm1kJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnU3RvcmVzIHBlcnNpc3RlbmNlJyxcbiAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygnc2hhcmVkL3BlcnNpc3QvaW5kZXgubWQnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdTdG9yZSB0eXBlcycsXG4gICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ3NoYXJlZC9zdG9yZS10eXBlcy9pbmRleC5tZCcpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdUYWJsZSBUb29scycsXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ2luZGV4JyxcbiAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygndGFibGUtdG9vbHMvaW5kZXgubWQnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdUYWJsZSBNb2R1bGUnLFxuICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCd0YWJsZS10b29scy90YWJsZS9pbmRleC5tZCcpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1BhZ2UsIEhlYWRlcnMsIEZpbHRlcnMnLFxuICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCd0YWJsZS10b29scy90YWJsZS1kZXBzL2luZGV4Lm1kJyksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0NhcmQgVG9vbHMnLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdpbmRleCcsXG4gICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ2NhcmQtdG9vbHMvaW5kZXgubWQnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDYXJkIE1vZHVsZScsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdtYWluJyxcbiAgICAgICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ2NhcmQtdG9vbHMvY2FyZC9SZWFkbWUubWQnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdDYXJkIENvbXBvc2FibGVzJyxcbiAgICAgICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ2NhcmQtdG9vbHMvY2FyZC9jb21wb3NhYmxlcy9SZWFkbWUubWQnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdDYXJkIFN0b3JlJyxcbiAgICAgICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ2NhcmQtdG9vbHMvY2FyZC9zdG9yZXMvUmVhZG1lLm1kJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnVXNhZ2UnLFxuICAgICAgICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCdjYXJkLXRvb2xzL2NhcmQvdXNhZ2UvUmVhZG1lLm1kJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdtYWluJyxcbiAgICAgICAgICAgICAgbGluazogcmVzb2x2ZUxpbmsoJ2NhcmQtdG9vbHMvdmFsaWRhdGlvbnMvUmVhZG1lLm1kJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnUmVnbGUnLFxuICAgICAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygnY2FyZC10b29scy92YWxpZGF0aW9ucy9yZWdsZS9SZWFkbWUubWQnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdab2QnLFxuICAgICAgICAgICAgICBsaW5rOiByZXNvbHZlTGluaygnY2FyZC10b29scy92YWxpZGF0aW9ucy96b2QvUmVhZG1lLm1kJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnVXNhZ2UnLFxuICAgICAgICAgICAgICAgIGxpbms6IHJlc29sdmVMaW5rKCdjYXJkLXRvb2xzL3ZhbGlkYXRpb25zL3VzYWdlL1JlYWRtZS5tZCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufV07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvdWktc2RrLmRvY3Mucm91dGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9Qcm9qZWN0cy93ZWJpdGVsL3dlYml0ZWwtdWktc2RrL2RvY3MvLnZpdGVwcmVzcy9yb3V0ZXMvcGFja2FnZXMvdWktc2RrLmRvY3Mucm91dGVzLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZVBrZ0RvY0l0ZW1zLCByZXNvbHZlUGtnTGlua0RvYyB9IGZyb20gJy4uL3JvdXRlUmVzb2x2ZXJzJztcblxuY29uc3QgcmVzb2x2ZUxpbmsgPSByZXNvbHZlUGtnTGlua0RvYygndWktc2RrJyk7XG5jb25zdCByZXNvbHZlSXRlbXMgPSByZXNvbHZlUGtnRG9jSXRlbXMoJ3VpLXNkaycpO1xuXG5leHBvcnQgY29uc3QgdWlTZGtJbmRleFJvdXRlID0ge1xuXHR0ZXh0OiAnaW5kZXgnLFxuXHRsaW5rOiByZXNvbHZlTGluaygnaW5kZXgubWQnKSxcbn07XG5leHBvcnQgY29uc3QgdWlTZGtSb3V0ZXMgPSBbXG5cdHtcblx0XHR0ZXh0OiAnQHdlYml0ZWwvdWktc2RrJyxcblx0XHRjb2xsYXBzZWQ6IGZhbHNlLFxuXHRcdGl0ZW1zOiBbXG5cdFx0XHR1aVNka0luZGV4Um91dGUsXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdDaGFuZ2Vsb2cnLFxuXHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKCdjaGFuZ2Vsb2cubWQnKSxcblx0XHRcdFx0Ly8gY29sbGFwc2VkOiBmYWxzZSxcblx0XHRcdH0sXG5cblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ0FQSSBUb29scycsXG5cdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoJ2FwaS8qKi8qLm1kJyksXG5cdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdMb2NhbGUnLFxuXHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKCdsb2NhbGUvKiovKi5tZCcpLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnQXNzZXRzJyxcblx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcygnYXNzZXRzLyoqLyoubWQnKSxcblx0XHRcdFx0Y29sbGFwc2VkOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdDU1MnLFxuXHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKCdjc3MvKiovKi5tZCcpLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnQ29tcG9uZW50cycsXG5cdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoJ2NvbXBvbmVudHMvKiovKi5tZCcpLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnQ29tcG9uZW50cy9vbi1kZW1hbmQnLFxuXHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKCdjb21wb25lbnRzL29uLWRlbWFuZC8qKi8qLm1kJyksXG5cdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdDb21wb3NhYmxlcycsXG5cdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoJ2NvbXBvc2FibGVzLyoqLyoubWQnKSxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ0VudW1zJyxcblx0XHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0XHQuLi5yZXNvbHZlSXRlbXMoJ2VudW1zL2luZGV4Lm1kJyksXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ05vbi1jYXRoZWdvcml6ZWQnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiBmYWxzZSxcblx0XHRcdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoW1xuXHRcdFx0XHRcdFx0XHQnZW51bXMvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRcdCchZW51bXMvaW5kZXgubWQnLFxuXHRcdFx0XHRcdFx0XHQnIWVudW1zL1dlYml0ZWxBcHBsaWNhdGlvbnMvKi5tZCcsXG5cdFx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdXZWJpdGVsQXBwbGljYXRpb25zJyxcblx0XHRcdFx0XHRcdGNvbGxhcHNlZDogZmFsc2UsXG5cdFx0XHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKCdlbnVtcy9XZWJpdGVsQXBwbGljYXRpb25zLyoubWQnKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnTW9kdWxlcycsXG5cdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ01vZHVsZTogT2JqZWN0IFBlcm1pc3Npb25zJyxcblx0XHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHRcdC4uLnJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHRcdFx0J21vZHVsZXMvT2JqZWN0UGVybWlzc2lvbnMvaW5kZXgubWQnLFxuXHRcdFx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6ICdDb21wb25lbnRzJyxcblx0XHRcdFx0XHRcdFx0XHRpdGVtczogcmVzb2x2ZUl0ZW1zKFtcblx0XHRcdFx0XHRcdFx0XHRcdCdtb2R1bGVzL09iamVjdFBlcm1pc3Npb25zL2NvbXBvbmVudHMvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRcdFx0XSksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnU3RvcmUnLFxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoW1xuXHRcdFx0XHRcdFx0XHRcdFx0J21vZHVsZXMvT2JqZWN0UGVybWlzc2lvbnMvc3RvcmUvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRcdFx0XSksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ01vZHVsZTogVGFibGUgQ29tcG9uZW50IE1vZHVsZScsXG5cdFx0XHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0XHQuLi5yZXNvbHZlSXRlbXMoJ21vZHVsZXMvVGFibGVDb21wb25lbnRNb2R1bGUvaW5kZXgubWQnKSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6ICdDb21wb3NhYmxlcycsXG5cdFx0XHRcdFx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcyhcblx0XHRcdFx0XHRcdFx0XHRcdCdtb2R1bGVzL1RhYmxlQ29tcG9uZW50TW9kdWxlL2NvbXBvc2FibGVzLyoqLyoubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ01vZHVsZTogQ2FsbCBTZXNzaW9uIE1vZHVsZScsXG5cdFx0XHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0XHQuLi5yZXNvbHZlSXRlbXMoJ21vZHVsZXMvQ2FsbFNlc3Npb25Nb2R1bGUvaW5kZXgubWQnKSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6ICdWaWRlb0NhbGwnLFxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoXG5cdFx0XHRcdFx0XHRcdFx0XHQnbW9kdWxlcy9DYWxsU2Vzc2lvbk1vZHVsZS9jb21wb25lbnRzLyoqLyoubWQnLFxuXHRcdFx0XHRcdFx0XHRcdCAgICksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ1VzZXJpbmZvJyxcblx0XHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnaW5kZXgnLFxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1zOiByZXNvbHZlTGluayhcblx0XHRcdFx0XHRcdFx0XHRcdCdtb2R1bGVzL1VzZXJpbmZvL2luZGV4Lm1kJyxcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdNb2R1bGU6IEZpbHRlcnMnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHRcdCdtb2R1bGVzL0ZpbHRlcnMvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdNb2R1bGU6IEFwcGVhcmFuY2UnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHRcdCdtb2R1bGVzL0FwcGVhcmFuY2UvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdNb2R1bGU6IFF1ZXJ5IEZpbHRlcnMnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHRcdCdtb2R1bGVzL3F1ZXJ5LWZpbHRlcnMvKiovKi5tZCcsXG5cdFx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdNb2R1bGU6IE5vdGlmaWNhdGlvbnMnLFxuXHRcdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHRcdCdtb2R1bGVzL25vdGlmaWNhdGlvbnMtbW9kdWxlL21kLyoqLyoubWQnLFxuXHRcdFx0XHRcdFx0XSksXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1NjcmlwdHMnLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdC4uLnJlc29sdmVJdGVtcygnc2NyaXB0cy9pbmRleC5tZCcpLFxuXHRcdFx0XHRcdC4uLnJlc29sdmVJdGVtcyhbXG5cdFx0XHRcdFx0XHQnc2NyaXB0cy8qKi8qLm1kJyxcblx0XHRcdFx0XHRcdCchc2NyaXB0cy9pbmRleC5tZCcsXG5cdFx0XHRcdFx0XSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdTdG9yZScsXG5cdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoJ3N0b3JlLyoqLyoubWQnKSxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1Rlc3QgdXRpbHMgYW5kIE1vY2tzJyxcblx0XHRcdFx0aXRlbXM6IHJlc29sdmVJdGVtcygndGVzdHMvKiovKi5tZCcpLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnVmFsaWRhdG9ycycsXG5cdFx0XHRcdGl0ZW1zOiByZXNvbHZlSXRlbXMoJ3ZhbGlkYXRvcnMvKiovKi5tZCcpLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0sXG5dO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VixTQUFTLGNBQUFBLG1CQUFrQjtBQUN6WCxPQUFPQyxXQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsZ0JBQWdCLDZCQUE2QjtBQUN0RCxPQUFPLGlCQUFpQjs7O0FDTHlWLE9BQU8sY0FBYzs7O0FDQUwsU0FBUyxrQkFBa0I7QUFDNVosT0FBTyxVQUFVO0FBRGpCLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sVUFBVTtBQUNoQixJ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LGNBQU0sU0FBUyxnQkFBZ0I7QUFBQSxVQUM3QixTQUFTQyxZQUFXLENBQUMsY0FBYyxDQUFDO0FBQUEsVUFDcEMsVUFBVTtBQUFBLFFBQ1osQ0FBQztBQUVELGVBQU8sVUFBVTtBQUNqQixlQUFPO0FBQUEsTUFDVCxHQUFHO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsYUFBYTtBQUFBO0FBQUEsSUFFWCxRQUFRLEVBQUUsVUFBVSxRQUFRO0FBQUE7QUFBQSxJQUU1QjtBQUFBLElBQ0E7QUFBQSxJQUVBLGFBQWE7QUFBQSxNQUNYO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU0sRUFBRSxLQUFLLHFIQUE4RztBQUFBLFFBQzNILE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxVQUFVO0FBQUE7QUFBQSxNQUVSLFNBQ0U7QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImdsb2JieVN5bmMiLCAicGF0aCIsICJwYXRoIiwgInJlc29sdmVMaW5rIiwgInJlc29sdmVMaW5rIiwgIm5hdiIsICJzaWRlYmFyTmF2IiwgIm5hdmJhck5hdiIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgImdsb2JieVN5bmMiXQp9Cg==
