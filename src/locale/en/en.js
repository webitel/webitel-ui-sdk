import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';

import {
  AdminSections,
  AuditorSections,
  ChatGatewayProvider,
  CrmSections,
  IconAction,
  QueueType,
  RelativeDatetimeValue,
  SupervisorSections,
  WebitelApplications,
} from '../../enums';
import { AccessMode } from '../../modules/ObjectPermissions/_internals/enums/AccessMode.enum.js';
import { snakeToCamel } from '../../scripts';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    comment: 'Comment',
    replace: 'Replace',
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
      uk: 'Українська',
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
    update: 'Update',
    draggable: 'Draggable',
    unassigned: 'Unassigned',
    showUnassigned: 'Show unassigned',
    group: 'Group',
    updatedBy: (/*{ named }*/) => {
      return 'Edited';
    },
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
    notification: 'Notification | Notifications',
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
    list: 'List | Lists',
    contact: 'Contact | Contacts',
    case: 'Case | Cases',
    calendar: 'Calendar | Calendars',
    direction: 'Direction',
    gateway: 'Gateway | Gateways',
    hangupCause: 'Hangup cause',
    hasOption: 'Has option',
    hasRecording: 'Recording',
    amdResult: 'AMD result',
    ratedBy: 'Rated by',
    talkDuration: 'Talk duration',
    totalDuration: 'Total duration',
    transcription: 'Transcription',
    attachment: 'Attachment | Attachments',
    owner: 'Owner | Owners',
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
    quickReplies: {
      quickReplies: 'Quick reply | Quick replies',
      quickRepliesEmpty: 'There are no quick replies yet',
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
    groupPerformers: 'Group',
    reason: 'Reason | Reasons',
    rating: 'Rating',
    service: 'Service | Services',
    selectAService: 'Select a service',
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
        [AuditorSections.Scorecards]: 'Scorecards',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Contacts',
        [CrmSections.Cases]: 'Cases',
        [CrmSections.Configuration]: 'Configuration',
        [CrmSections.Priorities]: 'Priorities',
        [CrmSections.CloseReasonGroups]: 'Closure reasons',
        [CrmSections.Statuses]: 'Statuses',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Service catalogs',
        [CrmSections.Sources]: 'Case sources',
        [CrmSections.ContactGroups]: 'Contact groups',
        [CrmSections.SectionCustomization]: 'Section customization',
        [CrmSections.CustomLookups]: 'Custom lookups',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.Queues]: 'Queues',
        [SupervisorSections.Agents]: 'Agents',
        [SupervisorSections.ActiveCalls]: 'Active calls',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Users',
        [AdminSections.License]: 'Licenses',
        [AdminSections.Devices]: 'Devices',
        [AdminSections.Flow]: 'Flow schemas',
        [AdminSections.Dialplan]: 'Dialplans',
        [AdminSections.Gateways]: 'Gateways',
        [AdminSections.Chatplan]: 'Chatplans',
        [AdminSections.ChatGateways]: 'Chat gateways',
        [AdminSections.Skills]: 'Agent skills',
        [AdminSections.Buckets]: 'Buckets',
        [AdminSections.Media]: 'Media files',
        [AdminSections.ShiftTemplates]: 'Shift templates',
        [AdminSections.PauseTemplates]: 'Pause templates',
        [AdminSections.WorkingConditions]: 'Working conditions',
        [AdminSections.Blacklist]: 'Lists',
        [AdminSections.Calendars]: 'Calendars',
        [AdminSections.Regions]: 'Locations',
        [AdminSections.Communications]: 'Communication types',
        [AdminSections.PauseCause]: 'Agent statuses',
        [AdminSections.Agents]: 'Agents',
        [AdminSections.Teams]: 'Teams',
        [AdminSections.Resources]: 'Resources',
        [AdminSections.ResourceGroups]: 'Resource groups',
        [AdminSections.Queues]: 'Queues',
        [AdminSections.Storage]: 'Storage',
        [AdminSections.StoragePolicies]: 'Storage policies',
        [AdminSections.CognitiveProfiles]: 'Cognitive profiles',
        [AdminSections.EmailProfiles]: 'Email profiles',
        [AdminSections.SingleSignOn]: 'Single Sign-on',
        [AdminSections.ImportCsv]: 'Imports of CSV from file',
        [AdminSections.Triggers]: 'Triggers',
        [AdminSections.Media]: 'Media files',
        [AdminSections.Roles]: 'Roles',
        [AdminSections.Objects]: 'Objects',
        [AdminSections.Changelogs]: 'Change log',
        [AdminSections.Configuration]: 'Configuration',
        [AdminSections.GlobalVariables]: 'Global variables',
        [AdminSections.QuickReplies]: 'Quick replies',
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
    minLength: ({ named }) => {
      let text = 'The length should not be less than';
      if (named('min')) {
        text += ` ${named('min')}`;
      }

      return text;
    },
    url: 'Should look like URL',
    websocketValidator: 'Should look like WebSocket url',
    isRegExpMatched: 'Password must match the regular expression:',
    regExpValidator: 'This regular expression is not valid',
    domainValidator: 'Incorrect domain',
    decimalValidator:
      'Decimal precision should be no more than { count } places',
    latinWithNumber:
      'The code must contain only letters (A-Z, a-z) and numbers (0-9), and must start with a letter',
    integer: 'The field should contain only whole numbers',
    nameAlreadyInUse: 'This name is already in use',
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
        [IconAction.CLEAR]: ({ linked }) =>
          linked('webitelUI.tableActions.filterReset'),
        [IconAction.ADD_FILTER]: ({ linked }) => linked('reusable.add'),
        [IconAction.SAVE]: ({ linked }) => linked('reusable.save'),
        [IconAction.CANCEL]: ({ linked }) => linked('reusable.cancel'),
        [IconAction.SAVE_PRESET]: ({ linked }) => {
          return `${linked('reusable.save')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.APPLY_PRESET]: ({ linked }) => {
          return `${linked('vocabulary.apply')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.ADD_CONTACT]: ({ linked }) => {
          return `${linked('reusable.add')} contacts`;
        },
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
        empty: 'There are no records yet',
        filters: 'Unfortunately, no records match your criteria',
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
      datetime: {
        [RelativeDatetimeValue.Today]: 'Today',
        [RelativeDatetimeValue.ThisWeek]: 'This week',
        [RelativeDatetimeValue.ThisMonth]: 'This month',
        [RelativeDatetimeValue.Custom]: 'Custom date range',
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} a ${linked(
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
      agent: ({ linked }) => {
        return linked('objects.agent.agent');
      },
      amdResult: ({ linked }) => {
        return linked('objects.amdResult');
      },
      assignee: ({ linked }) => {
        return linked('cases.assignee');
      },
      author: ({ linked }) => {
        return linked('cases.author');
      },
      cause: ({ linked }) => {
        return linked('objects.hangupCause');
      },
      closeReasonGroups: ({ linked }) => {
        return linked('cases.reason');
      },
      contact: ({ linked }) => {
        return linked('vocabulary.contact');
      },
      contactGroup: ({ linked }) => {
        return linked('cases.groupPerformers');
      },
      createdAt: ({ linked }) => {
        return linked('reusable.createdAt');
      },
      createdAtFrom: ({ linked }) => {
        return linked('reusable.from');
      },
      createdAtTo: ({ linked }) => {
        return linked('reusable.to');
      },
      direction: ({ linked }) => {
        return linked('objects.direction');
      },
      gateway: ({ linked }) => {
        return linked('objects.gateway');
      },
      grantee: ({ linked }) => {
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
      hasUser: ({ linked }) => {
        return linked('objects.user');
      },
      impacted: ({ linked }) => {
        return linked('cases.impacted');
      },
      contactLabel: ({ linked }) => {
        return linked('vocabulary.labels');
      },
      contactOwner: ({ linked }) => {
        return linked('objects.owner');
      },
      priority: ({ linked }) => {
        return linked('vocabulary.priority');
      },
      queue: ({ linked }) => {
        return linked('objects.queue.queue');
      },
      rated: 'Rated',
      ratedBy: ({ linked }) => {
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
      score: ({ linked }) => {
        return linked('webitelUI.auditForm.score');
      },
      service: ({ linked }) => {
        return linked('cases.service');
      },
      sla: ({ linked }) => {
        return linked('cases.appliedSLA');
      },
      slaCondition: ({ linked }) => {
        return linked('cases.appliedCondition');
      },
      source: ({ linked }) => {
        return linked('cases.source');
      },
      status: ({ linked }) => {
        return linked('cases.status');
      },
      tag: ({ linked }) => {
        return linked('vocabulary.tag');
      },
      talkDuration: ({ linked }) => {
        return linked('objects.talkDuration');
      },
      team: ({ linked }) => {
        return linked('objects.team');
      },
      totalDuration: ({ linked }) => {
        return linked('objects.totalDuration');
      },
      user: ({ linked }) => {
        return linked('objects.user');
      },
      variable: ({ linked }) => {
        return linked('vocabulary.variables');
      },
      presets: {
        preset: 'Preset | Presets',
        overwritePresetTitle: 'A preset with this name already exists.',
        overwritePresetText: 'Do you want to replace it?',
        notifications: {
          success: {
            /* suka ebuchij linked(,param) ne praciuje */
            update: ({ linked }) => {
              return linked('systemNotifications.success.update', {
                entity: linked('filters.presets.preset'),
              });
            },
            create: ({ linked }) => {
              return linked('systemNotifications.success.create', {
                entity: linked('filters.presets.preset'),
              });
            },
            delete: ({ linked }) => {
              return linked('systemNotifications.success.delete', {
                entity: linked('filters.presets.preset'),
              });
            },
          },
        },
      },
    },
  },
  systemNotifications: {
    success: {
      update: ({ named }) => `The ${named('entity').toLowerCase()} was updated`,
      create: ({ named }) => `The ${named('entity').toLowerCase()} was saved`,
      delete: ({ named }) => `The ${named('entity').toLowerCase()} was deleted`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'There was an error loading the chat history',
    markChatProcessed: 'Failed to move the chat to “Closed”',
  },
};
