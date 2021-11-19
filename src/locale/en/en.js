import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Total',
    ok: 'Ok',
    save: 'Save',
    close: 'Close',
    add: 'Add',
    cancel: 'Cancel',
    import: 'Import',
    export: 'Export',
    true: 'True',
    delete: 'Delete',
    search: 'Search',
    open: 'Open',
    name: 'Name',
    lang: {
      en: 'English',
      ru: 'Русский',
      ua: 'Українська',
    },
  },
  // date-related texts
  date: {
    sec: 'Sec',
  },
  // describes Webitel system entities
  objects: {
    team: 'Team | Teams',
    supervisor: 'Supervisor | Supervisors',
    auditor: 'Auditor | Auditors',
    region: 'Region | Regions',
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: { name: 'Audit' },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.QUEUES]: 'Queues',
        [SupervisorSections.AGENTS]: 'Agents',
        [SupervisorSections.ACTIVE_CALLS]: 'Active calls',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Users',
        [AdminSections.LICENSE]: 'Licenses',
        [AdminSections.DEVICES]: 'Devices',
        [AdminSections.FLOW]: 'Flow',
        [AdminSections.DIALPLAN]: 'Dialplan',
        [AdminSections.GATEWAYS]: 'Gateways',
        [AdminSections.CHAT_GATEWAYS]: 'Chat gateways',
        [AdminSections.SKILLS]: 'Agent skills',
        [AdminSections.BUCKETS]: 'Buckets',
        [AdminSections.MEDIA]: 'Media files',
        [AdminSections.BLACKLIST]: 'Call list',
        [AdminSections.CALENDARS]: 'Calendars',
        [AdminSections.REGIONS]: 'Location',
        [AdminSections.COMMUNICATIONS]: 'Communication types',
        [AdminSections.PAUSE_CAUSE]: 'Agent statuses',
        [AdminSections.AGENTS]: 'Agents',
        [AdminSections.TEAMS]: 'Teams',
        [AdminSections.RESOURCES]: 'Resources',
        [AdminSections.RESOURCE_GROUPS]: 'Resource groups',
        [AdminSections.QUEUES]: 'Queues',
        [AdminSections.STORAGE]: 'Storage',
        [AdminSections.MEDIA]: 'Media',
        [AdminSections.BLACKLIST]: 'Call lists',
        [AdminSections.ROLES]: 'Roles',
        [AdminSections.OBJECTS]: 'Objects',
      },
    },
  },
  validation: {
    required: 'Field is required',
    numeric: 'Should be numeric',
    email: 'Should look like email',
    gatewayHostValidator: 'Should look like IPv4 or FQDN',
    sipAccountValidator: 'Should look like SIP account',
    ipValidator: 'Should look like IPv4',
    macValidator: 'Should look like MAC',
    minValue: 'Value should be not less than',
    maxValue: 'Value should be not much than',
    sameAs: 'Incorrect password',
    requiredArrayValue: 'Array should not be empty',
    minLength: 'Quantity of characters should not be less than',
    url: 'Should look like url',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Search',
    },
    timepicker: {
      hour: 'Hour:',
      min: 'Min:',
      sec: 'Sec:',
    },
    datetimepicker: {
      lastHour: 'Last hour',
      lastDay: 'Last day',
    },
    pagination: {
      sizeText: 'Rows per page:',
      prev: 'Previous',
      next: 'Next',
    },
    appNavigator: {
      title: 'Webitel applications',
      admin: 'Admin',
      agent: 'Agent Workspace',
      supervisor: 'Supervisor Workspace',
      audit: 'Audit',
      history: 'Call History',
      grafana: 'Grafana',
    },
    headerActions: {
      account: 'Account',
      docs: 'Docs',
      settings: 'Settings',
      logout: 'Logout',
      buildVersion: 'Build version',
    },
    tableActions: {
      filterReset: 'Reset filters',
      columnSelect: 'Select columns',
      refreshTable: 'Refresh table',
      expandFilters: 'Expand filters',
    },
    tableColumnSelect: {
      title: 'Select visible columns',
    },
    statusSelect: {
      online: 'Online',
      pause: 'Pause',
      offline: 'Offline',
      breakOut: 'Break Out',
    },
    table: {
      tableCells: {
        deleteActionHint: 'Delete',
        editActionHint: 'Edit',
      },
    },
    errorPages: {
      goBack: 'Go back',
      page403: {
        title: 'Access denied',
        text: 'Sorry, you have not enough privileges to see this page.',
      },
      page404: {
        title: "Looks like you're lost",
        text: 'Sorry, we can\'t find the page you want.',
      },
    },
  },
};
