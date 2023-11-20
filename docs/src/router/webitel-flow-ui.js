import TheDocs from '../components/pages/webitel-flow-ui/the-docs.vue';
import QuickStart
  from '../components/pages/webitel-flow-ui/quick-start/quick-start.vue';
import EnumsDocs from '../components/pages/webitel-flow-ui/enums/enums-docs.vue';
import FlowAppEnumDocs
  from '../components/pages/webitel-flow-ui/enums/flow-app/flow-app-enum-docs.vue';
import LocaleDocs from '../components/pages/webitel-flow-ui/locale/locale-docs.vue';
import LookupsDocs
  from '../components/pages/webitel-flow-ui/lookups/lookups-docs.vue';
import FlowTypeApplicationsLookupDocs
  from '../components/pages/webitel-flow-ui/lookups/flow-type-applications/flow-type-applications-lookup-docs.vue';

const prefix = 'flow-ui-';

const routes = [
  {
    path: '/flow-ui',
    component: TheDocs,
    children: [
      {
        path: '',
        redirect: 'quick-start',
      },
      {
        path: 'quick-start',
        name: `${prefix}quick-start`,
        component: QuickStart,
      },
      {
        path: 'enums',
        name: `${prefix}enums`,
        component: EnumsDocs,
        children: [
          {
            path: 'flow-app',
            name: `${prefix}flow-app`,
            component: FlowAppEnumDocs,
          },
        ],
      },
      {
        path: 'locale',
        name: `${prefix}locale`,
        component: LocaleDocs,
      },
      {
        path: 'lookups',
        name: `${prefix}lookpus`,
        component: LookupsDocs,
        children: [
          {
            path: 'flow-type-applications',
            name: `${prefix}flow-type-applications`,
            component: FlowTypeApplicationsLookupDocs,
          },
        ],
      },
    ],
  },
];

export default routes;
