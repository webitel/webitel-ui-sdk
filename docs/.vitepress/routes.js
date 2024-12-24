import { globbySync } from 'globby';
import isObject from 'lodash/isObject';
import path from 'path';

const useDocsPattern = (patterns) => {
  return globbySync(patterns, { cwd: path.resolve(__dirname, '../pages/') });
};

const navbarNav = [
  { text: 'Home', link: '/' },
  {
    text: 'Changelog',
    items: useDocsPattern('webitel-ui/changelog.md'),
  },
  {
    text: 'icons',
    items: useDocsPattern('webitel-ui/assets/icons/**/*.md'),
  },
];

const sidebarNav = [
  {
    text: 'FAQ',
    items: useDocsPattern('docs/faq/**/*.md'),
    collapsed: false,
  },
  {
    text: 'Changelog',
    items: useDocsPattern('webitel-ui/changelog.md'),
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
    items: useDocsPattern('webitel-ui/api/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Locale',
    items: useDocsPattern('webitel-ui/locale/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Assets',
    items: useDocsPattern('webitel-ui/assets/**/*.md'),
    collapsed: false,
  },
  {
    text: 'CSS',
    items: useDocsPattern('webitel-ui/css/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Components',
    items: useDocsPattern('webitel-ui/components/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Components/on-demand',
    items: useDocsPattern('webitel-ui/components/on-demand/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Composables',
    items: useDocsPattern('webitel-ui/composables/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Enums',
    items: [
      ...useDocsPattern('webitel-ui/enums/index.md'),
      {
        text: 'Non-cathegorized',
        collapsed: false,
        items: useDocsPattern([
          'webitel-ui/enums/**/*.md',
          '!webitel-ui/enums/index.md',
          '!webitel-ui/enums/WebitelApplications/*.md',
        ]),
      },
      {
        text: 'WebitelApplications',
        collapsed: false,
        items: useDocsPattern('webitel-ui/enums/WebitelApplications/*.md'),
      },
    ],
    collapsed: true,
  },
  {
    text: 'Modules',
    items: [
      ...useDocsPattern([
        'webitel-ui/modules/**/*.md',
        '!webitel-ui/modules/ObjectPermissions',
        '!webitel-ui/modules/TableComponentModule',
      ]),
      {
        text: 'Module: Object Permissions',
        collapsed: true,
        items: [
          ...useDocsPattern(['webitel-ui/modules/ObjectPermissions/index.md']),
          {
            text: 'Components',
            items: useDocsPattern(['webitel-ui/modules/ObjectPermissions/components/**/*.md']),
          },
          {
            text: 'Store',
            items: useDocsPattern(['webitel-ui/modules/ObjectPermissions/store/**/*.md']),
          },
        ],
      },
      {
        text: 'Module: Table Component Module',
        collapsed: true,
        items: [
          ...useDocsPattern('webitel-ui/modules/TableComponentModule/index.md'),
          {
            text: 'Composables',
            items: useDocsPattern('webitel-ui/modules/TableComponentModule/composables/**/*.md'),
          },
        ],
      },
    ],
    collapsed: true,
  },
  {
    text: 'Scripts',
    items: [
      ...useDocsPattern('webitel-ui/scripts/index.md'),
      ...useDocsPattern(['webitel-ui/scripts/**/*.md', '!webitel-ui/scripts/index.md']),
    ],
    collapsed: true,
  },
  {
    text: 'Store',
    items: useDocsPattern('webitel-ui/store/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Test utils and Mocks',
    items: useDocsPattern('webitel-ui/tests/**/*.md'),
    collapsed: true,
  },
  {
    text: 'Validators',
    items: useDocsPattern('webitel-ui/validators/**/*.md'),
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

    const text = nav.endsWith('Readme.md') ? getParentDirName(nav) : getFilename(nav);
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

export { sidebar, nav };
