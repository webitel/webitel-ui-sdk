import {
  resolveKnowledgeBaseDocItems,
  resolveKnowledgeBaseLinkDoc,
} from '../routeResolvers';

export const knowledgeBaseIndexRoute = {
  text: 'index',
  link: resolveKnowledgeBaseLinkDoc('index.md'),
};

export const knowledgeBaseRoutes = [
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
            items: [
              {
                text: 'Code Base Deprecation Info',
                link: resolveKnowledgeBaseLinkDoc('general/code-base-deprecation-info/Readme.md'),
              },
              {
                text: 'Branching',
                link: resolveKnowledgeBaseLinkDoc('general/branching/Readme.md'),
              },
              {
                text: 'Client-Server Communication',
                link: resolveKnowledgeBaseLinkDoc('general/client-server-communication/Readme.md'),
              },
            ],
          },
          {
            text: 'Projects structure',
            items: [
              {
                text: 'App Structure',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/app-structure/Readme.md'),
              },
              {
                text: 'Applications List',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/applications-list/Readme.md'),
              },
              {
                text: 'Webitel packages',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/webitel-packages/Readme.md'),
              },
            ],
          },
          {
            text: 'Architecture, Structures, Design, etc',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems(
              'architecture-and-structures/**/*.md',
            ),
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
                link: resolveKnowledgeBaseLinkDoc('code-style/inspirations/index.md'),
              },
              {
                text: 'Linting and Formatting',
                link: resolveKnowledgeBaseLinkDoc('code-style/linting-and-reformatting/index.md'),
              },
            ],
          },
          {
            text: 'Namings',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('namings/**/*.md'),
          },
          {
            text: 'Onboarding',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('onboarding/**/*.md'),
          },
          {
            text: 'How To',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('how-to/**/*.md'),
          },
          {
            text: 'Tests Cookbook',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('tests-cookbook/**/*.md'),
          },
        ],
      },
    ],
  },
];
