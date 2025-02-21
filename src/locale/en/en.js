import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';

import { IconAction } from '../../enums';
import ChatGatewayProvider from '../../enums/ChatGatewayProvider/ChatGatewayProvider.enum.js';
import QueueType from '../../enums/QueueType/QueueType.enum.js';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum.js';
import AuditorSections from '../../enums/WebitelApplications/AuditorSections.enum.js';
import CrmSections from '../../enums/WebitelApplications/CrmSections.enum.js';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum.js';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum.js';
import { AccessMode } from '../../modules/ObjectPermissions/_internals/enums/AccessMode.enum.js';
import { snakeToCamel } from '../../scripts/caseConverters.js';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    download: 'Download',
    history: 'History',
    filter: ({ plural }) => plural(['Filter', 'Filters']),
    total: 'Total',
    ok: 'Ok',
    object: 'Object',
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
    title: 'Title',
    position: 'Position',
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
      kz: 'Қазақ',
    },
    from: 'From',
    to: 'To',
    tts: 'Text-to-Speech',
    state: 'State',
    refresh: 'Refresh',
    retry: 'Retry',
    downloadAll: 'Download all',
    warning: 'Warning',
    doNotSave: "Don't save",
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
    more: 'More',
    read: 'Read',
    create: 'Create',
    draggable: 'Draggable',
    unassigned: 'Unassigned',
    showUnassigned: 'Show unassigned',
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: 'Apply',
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
    channel: 'Channel | Channels',
    file: 'File',
    logout: 'Logout',
    priority: 'Priority | Priorities',
    color: 'Color',
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
    contact: 'Contact | Contacts',
    column: 'Column | Columns',
  },
  // date-related texts
  date: {
    sec: 'Sec',
    timezone: 'Time zone | Time zones',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Managed by operations',
    RbAC: 'Managed by records',
    operations: 'Operations',
    rbacDefault: 'Default Record based Access',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Forbidden',
      [AccessMode.ALLOW]: 'Allow',
      [AccessMode.MANAGE]: 'Allow with delegation',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Team | Teams',
    supervisor: 'Supervisor | Supervisors',
    auditor: 'Auditor | Auditors',
    region: 'Region | Regions',
    communicationType: 'Communication type | Communication types',
    grantee: 'Grantee | Grantees',
    grantor: 'Grantor | Grantors',
    role: 'Role | Roles',
    user: 'User | Users',
    calendar: 'Calendar | Calendars',
    direction: 'Direction',
    gateway: 'Gateway | Gateways',
    hangupCause: 'Hangup cause',
    hasOption: 'Has option',
    hasRecording: 'Has recording',
    amdResult: 'AMD result',
    ratedBy: 'Rated by',
    talkDuration: 'Talk duration',
    totalDuration: 'Total duration',
    transcription: 'Transcription',
    attachment: 'Attachment | Attachments',
    queue: {
      queue: 'Queue | Queues',
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
      agent: 'Agent | Agents',
      status: {
        [AgentStatus.Online]: 'Online',
        [AgentStatus.Pause]: 'Pause',
        [AgentStatus.Offline]: 'Offline',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Break out',
      },
    },
    flow: {
      name: 'Flow schema | Flow schemas',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Voice',
        [EngineRoutingSchemaType.Service]: 'Service',
        [EngineRoutingSchemaType.Processing]: 'Forms',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Telegram Bot',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Telegram App',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Web chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Custom Chat Gateway',
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
      [ChannelType.Job]: 'Task',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Inbound',
      [CallDirection.Outbound]: 'Outbound',
    },
  },
  cases: {
    status: 'Status',
    source: 'Source',
    author: 'Author',
    reporter: 'Reporter',
    impacted: 'Impacted',
    assignee: 'Assignee',
    group: 'Group',
    reason: 'Reason | Reasons',
    rating: 'Rating',
    service: 'Service | Services',
    appliedSLA: 'Applied SLA',
    appliedCondition: 'Applied condition',
    reactionTime: 'Reaction time',
    resolutionTime: 'Resolution time',
    actualReactionTime: 'Actual reaction time',
    actualResolutionTime: 'Actual resolution time',
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
        [CrmSections.CASES]: 'Cases',
        [CrmSections.PRIORITIES]: 'Priorities',
        [CrmSections.CLOSE_REASON_GROUPS]: 'Closure reasons',
        [CrmSections.STATUSES]: 'Statuses',
        [CrmSections.SLAS]: 'SLA',
        [CrmSections.SERVICE_CATALOGS]: 'Service catalogs',
        [CrmSections.SOURCES]: 'Case sources',
        [CrmSections.CONTACT_GROUPS]: 'Contact groups',
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
        [AdminSections.SHIFT_TEMPLATES]: 'Shift templates',
        [AdminSections.PAUSE_TEMPLATES]: 'Pause templates',
        [AdminSections.WORKING_CONDITIONS]: 'Working conditions',
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
        [AdminSections.STORAGE_POLICIES]: 'Storage policies',
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
        [AdminSections.GLOBAL_VARIABLES]: 'Global variables',
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
    maxLength: 'The length should not be greater than',
    sameAs: 'Incorrect password',
    requiredArrayValue: 'Array should not be empty',
    minLength: 'Quantity of characters should not be less than',
    url: 'Should look like url',
    websocketValidator: 'Should look like WebSocket url',
    isRegExpMatched: 'Password must match the regular expression:',
    regExpValidator: 'This regular expression is not valid',
    domainValidator: 'Incorrect domain',
    decimalValidator:
      'Decimal precision should be no more than { count } places',
    latinWithNumber:
      'The code must contain only letters (A-Z, a-z) and numbers (0-9)',
    integer: 'The field should contain only whole numbers',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Search',
      settingsHint: 'Search mode',
      variableSearchHint: 'Query format: "key=value"',
    },
    timepicker: {
      day: 'Day:',
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
      agent: 'Agent',
      supervisor: 'Supervisor',
      audit: 'Audit',
      history: 'History',
      grafana: 'Grafana',
      crm: 'CRM',
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
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Select columns',
        [IconAction.VARIABLES]: 'Select variables columns',
        [IconAction.REFRESH]: ({ linked }) => linked('reusable.refresh'),
        [IconAction.EXPAND]: ({ linked }) => linked('reusable.expand'),
        [IconAction.COLLAPSE]: ({ linked }) => linked('reusable.collapse'),
        [IconAction.CLOSE]: ({ linked }) => linked('reusable.close'),
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
        text: "Sorry, we can't find the page you want.",
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
      askingAlert:
        'Are you sure you want to delete {subject}? This action cannot be undone.',
      tableAskingAlert:
        'Are you sure you want\n to delete {count} record? | Are you sure you want\n to delete {count} records?',
      deleteAll: 'ALL',
    },
    dummy: {
      text: 'There are no records yet',
    },
    empty: {
      text: {
        empty: 'No results were found',
        filters: 'No results for the filters',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Select a pause cause',
        min: 'Min',
        unlimited: 'Unlimited',
      },
      statusSelectErrorPopup: {
        title: 'Attention',
        message:
          'The limit for agents to take a pause has been exceeded. The pause is unavailable right now.',
      },
    },
    saveFailedPopup: {
      title: 'Save failed',
      label: 'Something went wrong, please try again',
      exportToJson: 'Export to JSON',
    },
    filters: {
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} ${linked(
          'reusable.filter',
        ).toLowerCase()}`;
      },
      filterName: ({ linked }) => {
        // because filter select has a 'column' label now
        return linked('vocabulary.column');
      },
      filterValue: ({ linked }) => {
        return linked('vocabulary.values');
      },
      filterValueFrom: ({ linked }) => {
        const from = linked('reusable.from').toLowerCase();
        return `${linked('vocabulary.values')} ${from}`;
      },
      filterLabel: ({ linked }) => {
        return linked('vocabulary.labels');
      },
      actualReactionTime: ({ linked }) => {
        return linked('cases.actualReactionTime');
      },
      actualResolutionTime: ({ linked }) => {
        return linked('cases.actualResolutionTime');
      },
      agent : ({ linked }) => {
        return linked('objects.agent.agent');
      },
      amdResult : ({ linked }) => {
        return linked('objects.amdResult');
      },
      assignee: ({ linked }) => {
        return linked('cases.assignee');
      },
      author: ({ linked }) => {
        return linked('cases.author');
      },
      cause : ({ linked }) => {
        return linked('objects.hangupCause');
      },
      closeReasonGroupsCase: ({ linked }) => {
        return linked('cases.reason');
      },
      contact : ({ linked }) => {
        return linked('vocabulary.contact');
      },
      contactGroup: ({ linked }) => {
        return linked('cases.group');
      },
      createdAtFrom : ({ linked }) => {
        return linked('reusable.from');
      },
      createdAtTo : ({ linked }) => {
        return linked('reusable.to');
      },
      direction : ({ linked }) => {
        return linked('calls.direction');
      },
      gateway : ({ linked }) => {
        return linked('vocabulary.gateway');
      },
      grantee : ({ linked }) => {
        return linked('objects.grantee');
      },
      hasAttachment: ({ linked }) => {
        return linked('objects.attachment');
      },
      hasFile: ({ linked }) => {
        return linked('objects.hasRecording');
      },
      hasTranscription: ({ linked }) => {
        return linked('objects.transcription');
      },
      impacted: ({ linked }) => {
        return linked('cases.impacted');
      },
      priorityCase: ({ linked }) => {
        return linked('vocabulary.priority');
      },
      queue : ({ linked }) => {
        return linked('objects.queue.queue');
      },
      rated: ({ linked }) => {
        return linked('objects.rated');
      },
      ratedBy : ({ linked }) => {
        return linked('objects.ratedBy');
      },
      rating: ({ linked }) => {
        return linked('cases.rating');
      },
      reactionTime: ({ linked }) => {
        return linked('cases.reactionTime');
      },
      reporter: ({ linked }) => {
        return linked('cases.reporter');
      },
      resolutionTime: ({ linked }) => {
        return linked('cases.resolutionTime');
      },
      score : ({ linked }) => {
        return linked('webitelUI.auditForm.score');
      },
      serviceCase: ({ linked }) => {
        return linked('cases.service');
      },
      sla: ({ linked }) => {
        return linked('cases.appliedSLA');
      },
      slaCondition: ({ linked }) => {
        return linked('cases.appliedCondition');
      },
      sourceCase: ({ linked }) => {
        return linked('cases.source');
      },
      statusCase: ({ linked }) => {
        return linked('cases.status');
      },
      tag : ({ linked }) => {
        return linked('vocabulary.tag');
      },
      talkDuration: ({ linked }) => {
        return linked('objects.talkDuration');
      },
      team : ({ linked }) => {
        return linked('objects.team');
      },
      totalDuration: ({ linked }) => {
        return linked('objects.totalDuration');
      },
      user : ({ linked }) => {
        return linked('objects.user');
      },
      variable : ({ linked }) => {
        return linked('vocabulary.variables');
      },
    },
  },
  errorNotifications: {
    chatHistoryApi: 'There was an error loading the chat history',
    markChatProcessed: 'Failed to move the chat to “Closed”',
  },
};
