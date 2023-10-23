import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import AuditorSections
  from '../../enums/WebitelApplications/AuditorSections.enum';
import CrmSections from '../../enums/WebitelApplications/CrmSections.enum';
import SupervisorSections
  from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications
  from '../../enums/WebitelApplications/WebitelApplications.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Total',
    ok: 'Ok',
    save: 'Save',
    saveAs: 'Save as',
    saved: 'Saved',
    send: 'Send',
    start: 'Start',
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
      es: 'Español',
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
    new: 'New',
    createdAt: 'Created on',
    createdBy: 'Created by',
    modifiedAt: 'Modified on',
    modifiedBy: 'Modified by',
    general: 'General',
    generalInfo: 'General info',
    all: 'All {entity}',
    upload: 'Upload',
    edit: 'Edit',
    back: 'Back',
    step: 'Step { count }',
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
    labels: 'Label | Labels',
    permissions: 'Permission | Permissions',
    options: 'Option | Options',
    emails: 'Email | Emails',
    phones: 'Phone | Phones',
    messaging: 'Messaging',
    emptyResultSearch: 'Your search yielded no results',
  },
  // date-related texts
  date: {
    sec: 'Sec',
    timezone: 'Time zone | Time zones',
  },
  // describes Webitel system entities
  objects: {
    team: 'Team | Teams',
    supervisor: 'Supervisor | Supervisors',
    auditor: 'Auditor | Auditors',
    region: 'Region | Regions',
    communicationType: 'Communication type | Communication types',
    grantee: 'Grantee | Grantees',
    queue: {
      type: {
        [QueueType.INBOUND_QUEUE]: 'Inbound queue',
        [QueueType.OFFLINE_QUEUE]: 'Offline queue',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Outbound IVR queue',
        [QueueType.PREDICTIVE_DIALER]: 'Predictive dialer',
        [QueueType.PROGRESSIVE_DIALER]: 'Progressive dialer',
        [QueueType.PREVIEW_DIALER]: 'Preview dialer',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Chat queue',
        [QueueType.INBOUND_JOB_QUEUE]: 'Inbound task queue',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Outbound task queue',
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
      sections: {
        [AuditorSections.SCORECARDS]: 'Scorecards',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.CONTACTS]: 'Contacts',
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
        [AdminSections.BLACKLIST]: 'Lists',
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
        [AdminSections.SINGLE_SIGN_ON]: 'Single Sign-on',
        [AdminSections.IMPORT_CSV]: 'Imports of CSV from file',
        [AdminSections.TRIGGERS]: 'Triggers',
        [AdminSections.MEDIA]: 'Media files',
        [AdminSections.ROLES]: 'Roles',
        [AdminSections.OBJECTS]: 'Objects',
        [AdminSections.CHANGELOGS]: 'Change log',
        [AdminSections.CONFIGURATION]: 'Configuration',
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
    regExpValidator: 'This regular expression is not valid',
    domainValidator: 'Incorrect domain',
    decimalValidator: 'Decimal precision should be no more than { count } places',
    integer: 'The field should contain only whole numbers',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Search',
      settingsHint: 'Search mode',
      variableSearchHint: 'Query format: "key=value"',
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
    iconAction: {
      deleteActionHint: 'Delete',
      editActionHint: 'Edit',
      addActionHint: 'Add',
      historyActionHint: 'History',
      downloadActionHint: 'Download',
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
      question: 'Criteria',
      option: 'Option | Options',
      score: 'Score | Scores',
      addQuestion: 'Add criteria',
      answerType: 'Answer type',
      type: {
        options: 'Options',
        score: 'Score',
      },
      clearSelection: 'Clear selection',
    },
    deleteConfirmationPopup: {
      title: 'Confirm deletion',
      askingAlert: 'Are you sure you want\n to delete {count} records? | Are you sure you want\n to delete {count} records?',
      deleteAll: 'ALL',
    },
    dummy: {
      text: 'There are no records yet',
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Select a pause cause',
        min: 'Min',
        unlimited: 'Unlimited',
      },
      statusSelectErrorPopup: {
        title: 'Attention',
        message: 'The limit for agents to take a pause has been exceeded. The pause is unavailable right now.',
      },
    },
  },
};
