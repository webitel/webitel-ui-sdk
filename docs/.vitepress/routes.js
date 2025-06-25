import { globbySync } from 'globby';
import isObject from 'lodash/isObject';
import path from 'path';

const baseUrl = 'pages';

// "items" with array of resolved docs
const useDocsPattern = (patterns) => {
  return globbySync(patterns, { cwd: path.resolve(__dirname, `../${baseUrl}/`) });
};

// direct link to 1 md doc
const useLinkToDoc = (path) => {
  return `/${baseUrl}/${path}`;
};

const navbarNav = [
  { text: 'Home', link: '/' },
  {
    text: 'Changelog',
    items: useDocsPattern('ui-sdk/changelog.md'),
  },
  {
    text: 'icons',
    items: useDocsPattern('ui-sdk/assets/icons/**/*.md'),
  },
];

const sidebarNav = [

  {
    text: '@webitel/api-services',
    items: [
      {
        text: 'Package Contents',
        link: useLinkToDoc('api-services/contents/index.md'),
        // link: useDocsPattern('api-services/contents/index.md').at(0),
      },
      // {
      //   text: 'index',
      //   items: useDocsPattern('api-services/index.md'),
      // },
      {
        text: 'Usage',
        items: [
          {
            text: 'index',
            link: useLinkToDoc('api-services/usage/index.md'),
          },
          {
            text: 'Migration from webitel-sdk',
            link: useLinkToDoc('api-services/usage/general/index.md'),
          },
          {
            text: 'Migration from @webitel/ui-sdk/api',
            link: useLinkToDoc('api-services/usage/migration/index.md'),
          },
        ],
      },
      // {
      //   text: 'gen/api',
      // },
    ],
    collapsed: false,
  },
  {
    text: 'FAQ',
    items: useDocsPattern('docs/faq/**/*.md'),
    collapsed: false,
  },
  {
    text: 'Changelog',
    items: useDocsPattern('ui-sdk/changelog.md'),
    // collapsed: false,
  },
  {
    text: 'Architecture, Structures, Design, etc',
    items: useDocsPattern('docs/architecture-and-structures/**/*.md'),
    collapsed: true,
  },
  {
    text: 'How To',
    items: useDocsPattern('docs/how-to/**/*.md'),
    collapsed: true,
  },
  {
    text: 'API Tools',
    items: useDocsPattern('ui-sdk/api/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Locale',
    items: useDocsPattern('ui-sdk/locale/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Assets',
    items: useDocsPattern('ui-sdk/assets/**/*.md'),
    collapsed: false,
  },
  {
    text: 'CSS',
    items: useDocsPattern('ui-sdk/css/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Components',
    items: useDocsPattern('ui-sdk/components/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Components/on-demand',
    items: useDocsPattern('ui-sdk/components/on-demand/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Composables',
    items: useDocsPattern('ui-sdk/composables/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Enums',
    items: [
      ...useDocsPattern('ui-sdk/enums/index.md'),
      {
        text: 'Non-cathegorized',
        collapsed: false,
        items: useDocsPattern([
          'ui-sdk/enums/**/*.md',
          '!ui-sdk/enums/index.md',
          '!ui-sdk/enums/WebitelApplications/*.md',
        ]),
      },
      {
        text: 'WebitelApplications',
        collapsed: false,
        items: useDocsPattern('ui-sdk/enums/WebitelApplications/*.md'),
      },
    ],
    collapsed: true,
  },
  {
    text: 'Modules',
    items: [
      ...useDocsPattern([
        'ui-sdk/modules/**/*.md',
        '!ui-sdk/modules/ObjectPermissions',
        '!ui-sdk/modules/TableComponentModule',
      ]),
      {
        text: 'Module: Object Permissions',
        collapsed: true,
        items: [
          ...useDocsPattern(['ui-sdk/modules/ObjectPermissions/index.md']),
          {
            text: 'Components',
            items: useDocsPattern([
              'ui-sdk/modules/ObjectPermissions/components/**/*.md',
            ]),
          },
          {
            text: 'Store',
            items: useDocsPattern([
              'ui-sdk/modules/ObjectPermissions/store/**/*.md',
            ]),
          },
        ],
      },
      {
        text: 'Module: Table Component Module',
        collapsed: true,
        items: [
          ...useDocsPattern('ui-sdk/modules/TableComponentModule/index.md'),
          {
            text: 'Composables',
            items: useDocsPattern(
              'ui-sdk/modules/TableComponentModule/composables/**/*.md',
            ),
          },
        ],
      },
    ],
    collapsed: true,
  },
  {
    text: 'Scripts',
    items: [
      ...useDocsPattern('ui-sdk/scripts/index.md'),
      ...useDocsPattern([
        'ui-sdk/scripts/**/*.md',
        '!ui-sdk/scripts/index.md',
      ]),
    ],
    collapsed: true,
  },
  {
    text: 'Store',
    items: useDocsPattern('ui-sdk/store/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Test utils and Mocks',
    items: useDocsPattern('ui-sdk/tests/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Validators',
    items: useDocsPattern('ui-sdk/validators/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Tests Cookbook',
    items: useDocsPattern('docs/tests-cookbook/**/*.md'),
    collapsed: true,
  },
];

const linkify = (nav) => {
  if (Array.isArray(nav)) {
    return nav.map((item) => linkify(item));
  }

  if (isObject(nav)) {
    if (nav.link) return nav;

    return {
      ...nav,
      items: nav.items.map((item) => linkify(item)),
    };
  }

  if (typeof nav === 'string') {
    const getParentDirName = (nav) => nav.split('/').at(-2);
    const getFilename = (nav) => nav.split('/').pop().replace(/\.md$/, '');
    const getLink = (nav) => '/pages/'.concat(nav.replace('.md', '.html'));

    const text = nav.endsWith('Readme.md')
      ? getParentDirName(nav)
      : getFilename(nav);
    const link = getLink(nav);

    return { text, link };
  }

  console.error('tf is that sidebar nav item type', nav);

  return nav;
};

const generateSidebar = (sidebarNav) => {
  const sb = linkify(sidebarNav);
  // console.info(JSON.stringify(sb, null, 2));
  return sb;
};

const generateNav = (navbarNav) => {
  const nav = linkify(navbarNav);
  // console.info(JSON.stringify(sb, null, 2));
  return nav;
};

const sidebar = generateSidebar(sidebarNav);
const nav = generateNav(navbarNav);

export { nav, sidebar };
