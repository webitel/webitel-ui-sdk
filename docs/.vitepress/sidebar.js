import { globbySync } from 'globby';
import isObject from 'lodash/isObject';
import path from 'path';

const useDocsPath = (pth, { directChildrenOnly = false } = {}) => {
  const pattern = directChildrenOnly
    ? `pages/${pth}/Readme.md`
    : `pages/${pth}/**/Readme.md`;

  return globbySync(pattern, { cwd: path.resolve(__dirname, '../') });
};
;

const generateSidebar = () => {
  const nav = [
    {
      text: 'FAQ',
      items: useDocsPath('docs/faq'),
      collapsed: false,
    },
    {
      text: 'Architecture, Structures, Design, etc',
      items: useDocsPath('docs/architecture-and-structures'),
      collapsed: true,
    },
    {
      text: 'How To',
      items: useDocsPath('docs/how-to'),
      collapsed: true,
    },
    {
      text: 'API Tools',
      items: useDocsPath('webitel-ui/api'),
      collapsed: true,
    },
    {
      text: 'Locale',
      items: useDocsPath('webitel-ui/locale'),
      collapsed: true,
    },
    {
      text: 'Components',
      items: useDocsPath('webitel-ui/components'),
      collapsed: true,
    },

    {
      text: 'Components/on-demand',
      items: useDocsPath('webitel-ui/components/on-demand'),
      collapsed: true,
    },
    {
      text: 'Enums',
      items: useDocsPath('webitel-ui/enums'),
      collapsed: true,
    },
    {
      text: 'Modules',
      items: useDocsPath('webitel-ui/modules'),
      collapsed: true,
    },
    {
      text: 'Module: Object Permissions',
      collapsed: true,
      items: [
        {
          text: 'index',
          items: useDocsPath('webitel-ui/modules/ObjectPermissions', {
            directChildrenOnly: true,
          }),
        },
        {
          text: 'Components',
          items: useDocsPath('webitel-ui/modules/ObjectPermissions/components'),
        },
        {
          text: 'Store',
          items: useDocsPath('webitel-ui/modules/ObjectPermissions/store'),
        },
      ],
    },
    {
      text: 'Store',
      items: useDocsPath('webitel-ui/store'),
      collapsed: true,
    },
    {
      text: 'Test utils and Mocks',
      items: useDocsPath('webitel-ui/tests'),
      collapsed: true,
    },
    {
      text: 'Validators',
      items: useDocsPath('webitel-ui/validators'),
      collapsed: true,
    },
    {
      text: 'Tests Cookbook',
      items: useDocsPath('docs/tests-cookbook'),
      collapsed: true,
    },
  ];

  const linkify = (nav) => {
    if (Array.isArray(nav)) {
      return nav.map((item) => linkify(item));
    }

    if (isObject(nav.items?.at(0))) {
      const items = nav.items.map((item) => linkify(item));
      return {
        ...nav,
        items,
      };
    }

    const items = nav.items.map((path) => ({
      // ...nav,
      text: path.split('/').at(-2), // get only last folder name, where Readme.md is located
      link: path.replace(/\.md$/, ''),
    }));

    return {
      ...nav,
      items,
    };
  };

  const sb = linkify(nav);
  // console.info(JSON.stringify(sb, null, 2));
  return sb;
};

export default generateSidebar();
