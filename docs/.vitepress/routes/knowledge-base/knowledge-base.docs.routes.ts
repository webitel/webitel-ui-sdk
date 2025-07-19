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
        items: resolveKnowledgeBaseDocItems('faq/**/*.md'),
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
                link: resolveKnowledgeBaseLinkDoc('general/code-base-deprecation-info/index.md'),
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
