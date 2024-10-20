import { globbySync } from 'globby';
import isObject from 'lodash/isObject';
import path from 'path';

const useDocsPattern = ({
                          pattern,
                          children = false,
                          descendants = true,
                          filename = ['*.md'], // str or arr
                        } = {}) => {
  const generatePattern = () => {
    const descendantsPattern = descendants ? '/**' : '';
    const childrenPattern = children ? '/*' : '';

    const filenames = Array.isArray(filename) ? filename : [filename];
    const filenamesPattern = filenames.map((filename) => `/${filename}`)
    .join(',');

    return `pages/${pattern}${descendantsPattern}${childrenPattern}${filenamesPattern}`;
  };

  const fullPattern = generatePattern();

  return globbySync(fullPattern, { cwd: path.resolve(__dirname, '../') });
};

const navbarNav = [
  { text: 'Home', link: '/' },
  {
    text: 'icons',
    link: useDocsPattern({
      pattern: 'webitel-ui/assets/icons',
      descendants: false,
    }).pop(),
  },
];

const sidebarNav = [
  {
    text: 'FAQ',
    items: useDocsPattern({ pattern: 'docs/faq' }),
    collapsed: false,
  },
  {
    text: 'Architecture, Structures, Design, etc',
    items: useDocsPattern({ pattern: 'docs/architecture-and-structures' }),
    collapsed: true,
  },
  {
    text: 'How To',
    items: useDocsPattern({ pattern: 'docs/how-to' }),
    collapsed: true,
  },
  {
    text: 'API Tools',
    items: useDocsPattern({ pattern: 'webitel-ui/api' }),
    collapsed: true,
  },
  {
    text: 'Locale',
    items: useDocsPattern({ pattern: 'webitel-ui/locale' }),
    collapsed: true,
  },
  {
    text: 'Assets',
    items: useDocsPattern({ pattern: 'webitel-ui/assets' }),
    collapsed: false,
  },
  {
    text: 'Components',
    items: useDocsPattern({ pattern: 'webitel-ui/components' }),
    collapsed: true,
  },
  {
    text: 'Components/on-demand',
    items: useDocsPattern({ pattern: 'webitel-ui/components/on-demand' }),
    collapsed: true,
  },
  {
    text: 'Enums',
    items: useDocsPattern({ pattern: 'webitel-ui/enums' }),
    collapsed: true,
  },
  {
    text: 'Modules',
    items: useDocsPattern({ pattern: 'webitel-ui/modules' }),
    collapsed: true,
  },
  {
    text: 'Module: Object Permissions',
    collapsed: true,
    items: [
      ...useDocsPattern({
        pattern: 'webitel-ui/modules/ObjectPermissions',
        children: false,
        descendants: false,
      }),
      {
        text: 'Components',
        items: useDocsPattern({
          pattern: 'webitel-ui/modules/ObjectPermissions/components',
        }),
      },
      {
        text: 'Store',
        items: useDocsPattern({
          pattern: 'webitel-ui/modules/ObjectPermissions/store',
        }),
      },
    ],
  },
  {
    text: 'Store',
    items: useDocsPattern({ pattern: 'webitel-ui/store' }),
    collapsed: true,
  },
  {
    text: 'Test utils and Mocks',
    items: useDocsPattern({ pattern: 'webitel-ui/tests' }),
    collapsed: true,
  },
  {
    text: 'Validators',
    items: useDocsPattern({ pattern: 'webitel-ui/validators' }),
    collapsed: true,
  },
  {
    text: 'Tests Cookbook',
    items: useDocsPattern({ pattern: 'docs/tests-cookbook' }),
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
    const getLink = (nav) => '/'.concat(nav.replace('.md', '.html'));

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
  console.info(JSON.stringify(sb, null, 2));
  return sb;
};

const generateNav = (navbarNav) => {
  const nav = linkify(navbarNav);
  // console.info(JSON.stringify(sb, null, 2));
  return nav;
};

const sidebar = generateSidebar(sidebarNav);
const nav = generateNav(navbarNav);

export {
  sidebar,
  nav,
};
