import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum';
import AuditorSections
  from '../../enums/WebitelApplications/AuditorSections.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

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
    expand: 'Expand',
    collapse: 'Collapse',
    generate: 'Generate',
    lang: {
      en: 'English',
      ru: 'Русский',
      ua: 'Українська',
    },
    from: 'From',
    to: 'To',
    tts: 'Text-to-Speech',
    state: 'State',
    refresh: 'Refresh',
    retry: 'Retry',
    downloadAll: 'Download all',
    warning: 'Warning',
    doNotSave: 'Don\'t save',
    required: 'Required',
    copy: 'Copy',
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    language: 'Language',
    voice: 'Voice',
    format: 'Format',
    text: 'Text',
    yes: 'Yes',
    no: 'No',
    description: 'Description',
    login: 'Login',
    host: 'Host',
    time: 'Time',
    channel: 'Channel',
    file: 'File',
    logout: 'Logout',
    priority: 'Priority',
    variables: 'Variable | Variables',
    type: 'Type',
    tag: 'Tag | Tags',
    output: 'Output | Outputs',
    values: 'Value | Values',
    keys: 'Key | Keys',
    duration: 'Duration',
    reset: 'Reset',
    errors: 'Error | Errors',
  },
  // date-related texts
  date: {
    sec: 'Sec',
    timezone: 'Timezone | Timezones',
  },
  // describes Webitel system entities
  objects: {
    team: 'Team | Teams',
    supervisor: 'Supervisor | Supervisors',
    auditor: 'Auditor | Auditors',
    region: 'Region | Regions',
    queue: {
      type: {
        [QueueType.INBOUND_QUEUE]: 'Inbound queue',
        [QueueType.OFFLINE_QUEUE]: 'Offline queue',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Outbound IVR queue',
        [QueueType.PREDICTIVE_DIALER]: 'Predictive dialer',
        [QueueType.PROGRESSIVE_DIALER]: 'Progressive dialer',
        [QueueType.PREVIEW_DIALER]: 'Preview dialer',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Chat queue',
        [QueueType.INBOUND_JOB_QUEUE]: 'Inbound job queue',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Outbound job queue',
      },
    },
    agent: {
      status: {
        [AgentStatus.Online]: 'Online',
        [AgentStatus.Pause]: 'Pause',
        [AgentStatus.Offline]: 'Offline',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Break out',
      },
    },
    flow: {
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Voice',
        [EngineRoutingSchemaType.Service]: 'Service',
        [EngineRoutingSchemaType.Processing]: 'Processing',
      },
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Waiting',
      [ChannelState.Distribute]: 'Distribute',
      [ChannelState.Offering]: 'Offering',
      [ChannelState.Answered]: 'Answered',
      [ChannelState.Active]: 'Active',
      [ChannelState.Bridged]: 'Bridged',
      [ChannelState.Hold]: 'Hold',
      [ChannelState.Missed]: 'Missed',
      [snakeToCamel(ChannelState.WrapTime)]: 'Wrap time',
      [ChannelState.Processing]: 'Processing',
      [ChannelState.Transfer]: 'Transfer',
    },
    type: {
      [ChannelType.Call]: 'Call',
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Chat',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Inbound',
      [CallDirection.Outbound]: 'Outbound',
    },
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      section: {
        [AuditorSections.SCORECARDS]: 'Scorecards',
      },
    },
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
        [AdminSections.FLOW]: 'Flow schemas',
        [AdminSections.DIALPLAN]: 'Dialplans',
        [AdminSections.GATEWAYS]: 'Gateways',
        [AdminSections.CHATPLAN]: 'Chatplans',
        [AdminSections.CHAT_GATEWAYS]: 'Chat gateways',
        [AdminSections.SKILLS]: 'Agent skills',
        [AdminSections.BUCKETS]: 'Buckets',
        [AdminSections.MEDIA]: 'Media files',
        [AdminSections.BLACKLIST]: 'Call list',
        [AdminSections.CALENDARS]: 'Calendars',
        [AdminSections.REGIONS]: 'Locations',
        [AdminSections.COMMUNICATIONS]: 'Communication types',
        [AdminSections.PAUSE_CAUSE]: 'Agent statuses',
        [AdminSections.AGENTS]: 'Agents',
        [AdminSections.TEAMS]: 'Teams',
        [AdminSections.RESOURCES]: 'Resources',
        [AdminSections.RESOURCE_GROUPS]: 'Resource groups',
        [AdminSections.QUEUES]: 'Queues',
        [AdminSections.STORAGE]: 'Storage',
        [AdminSections.COGNITIVE_PROFILES]: 'Cognitive profiles',
        [AdminSections.EMAIL_PROFILES]: 'Email profiles',
        [AdminSections.IMPORT_CSV]: 'Imports of CSV from file',
        [AdminSections.TRIGGERS]: 'Triggers',
        [AdminSections.MEDIA]: 'Media files',
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
        title: 'Looks like you\'re lost',
        text: 'Sorry, we can\'t find the page you want.',
      },
    },
    copyAction: {
      copy: 'Copy',
      copied: 'Copied to clipboard!',
    },
    auditForm: {
      question: 'Question',
      option: 'Option | Options',
      score: 'Score | Scores',
      type: {
        options: 'Options',
        score: 'Score',
      },
    },
  },
};
