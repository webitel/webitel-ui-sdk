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
  CrmSections,
  IconAction,
  QueueType,
  SupervisorSections,
  WtApplication,
} from '../../enums';
import { snakeToCamel } from '../../scripts/caseConverters.js';

export default {
  reusable: {
    total: 'Барлығы',
    ok: 'ок',
    save: 'Сақтау',
    saveAs: 'ретінде сақтау',
    saved: 'Сақталды',
    send: 'Жіберу',
    start: 'Бастау',
    close: 'Жабу',
    add: 'Қосу',
    cancel: 'Бас тарту',
    import: 'Импорттау',
    export: 'Экспорттау',
    true: 'Иә',
    delete: 'Жою',
    search: 'Іздеу',
    open: 'Ашу',
    name: 'Атауы',
    expand: 'Ашу',
    collapse: 'Жию ',
    generate: 'Бастау',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Орысша',
      ua: 'Українська',
      kz: 'Қазақ',
    },
    from: 'Бастап',
    to: 'Дейін',
    state: 'Жағдай',
    refresh: 'Жаңарту',
    retry: 'Қайталау',
    downloadAll: 'Барлығын жүктеп алу',
    warning: 'Ескерту',
    doNotSave: 'Сақтамау',
    required: 'Міндетті',
    copy: 'Көшіру',
    new: 'Жаңа',
    createdAt: 'Жасалды',
    createdBy: 'кім жасады',
    modifiedAt: 'Өзгертілді',
    modifiedBy: 'кім өзгертті',
    general: 'Жалпы',
    generalInfo: 'жалпы ақпарат',
    all: 'Барлығы { entity }',
    upload: 'Жүктеп алу',
    edit: 'Редакциялау',
    back: 'Артқа',
    step: 'Қадам { count }',
  },
  vocabulary: {
    language: 'Тіл',
    voice: 'Дауыс',
    format: 'Формат',
    text: 'Мәтін',
    yes: 'Иә',
    no: 'Жоқ',
    description: 'Сипаттама',
    login: 'Логин',
    host: 'Хост',
    time: 'Уақыт',
    channel: 'Арна',
    file: 'Файл',
    logout: 'Шығу',
    priority: 'Басымдық',
    variables: 'Ауыспалы | Ауыспалылар',
    type: 'Тип',
    tag: 'Тег | Тегтер',
    output: 'Шығу',
    values: 'Мәні| Мәндер',
    keys: 'Кілт  | Кілттер',
    duration: 'Ұзақтығы',
    reset: 'Қалпына келтіру',
    errors: 'Қате | Қателер',
    labels: 'Белгі | Белгілер',
    permissions: 'Рұқсат | Рұқсат',
    options: 'Опция | Опциялар',
    emails: 'Email | Emails',
    phones: 'Телефон | Телефондар',
    messaging: 'Хабарламалар',
  },
  date: {
    sec: 'Сек',
    timezone: 'Уақыт белдеуі | Уақыт белдеулері',
  },
  objects: {
    team: 'Команда | Командалар',
    supervisor: 'Супервизор | Супервизорлар',
    auditor: 'Аудитор | Аудиторлар',
    region: 'Аймақ | Аймақтар',
    communicationType: 'Байланыс түрі |Байланыс түрлері',
    queue: {
      type: {
        [QueueType.INBOUND_QUEUE]: 'Кіріс кезегі',
        [QueueType.OFFLINE_QUEUE]: 'Офлайн кезек',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Шығыс IVR',
        [QueueType.PREDICTIVE_DIALER]: 'Предиктивтік қоңырау',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогрессивті қоңырау',
        [QueueType.PREVIEW_DIALER]: 'Қоңырауды алдын ала қарау',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Чаттар кезегі',
        [QueueType.INBOUND_JOB_QUEUE]: 'Кіріс тапсырмалар кезегі',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Шығыс тапсырмалар  кезегі',
      },
    },
    agent: {
      status: {
        [AgentStatus.Online]: 'Онлайн',
        [AgentStatus.Pause]: 'Үзіліс',
        [AgentStatus.Offline]: 'Оффлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Мәжбүрлі үзіліс',
      },
    },
    flow: {
      type: {
        [EngineRoutingSchemaType.Chat]: 'Мәтіндік',
        [EngineRoutingSchemaType.Voice]: 'Дыбыстық',
        [EngineRoutingSchemaType.Service]: 'Қызметтік',
        [EngineRoutingSchemaType.Processing]: 'Нысандар',
        [EngineRoutingSchemaType.Default]: 'Типі жоқ',
      },
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Күту',
      [ChannelState.Distribute]: 'Резервтелген',
      [ChannelState.Offering]: 'Тарату',
      [ChannelState.Answered]: 'Жауап берді',
      [ChannelState.Active]: 'Белсенді',
      [ChannelState.Bridged]: 'Қосылды',
      [ChannelState.Hold]: 'Ұстап тұру',
      [ChannelState.Missed]: 'Өткізіп жіберді',
      [snakeToCamel(ChannelState.WrapTime)]: 'Кейінгі өңдеу',
      [ChannelState.Processing]: 'Өңдеу',
      [ChannelState.Transfer]: 'Ауыстыру',
    },
    type: {
      [ChannelType.Call]: 'Қоңырау',
      [ChannelType.Email]: 'Пошта',
      [ChannelType.Chat]: 'Чат',
      [ChannelType.Job]: 'Тапсырма',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Кіріс | Кірістер',
      [CallDirection.Outbound]: 'Шығыс | Шығыстар',
    },
  },
WebitelApplications: {
  [WtApplication.Agent]: { name: 'Agent Workspace' },
  [WtApplication.Audit]: {
    name: 'Audit',
    sections: {
      [AuditorSections.Scorecards]: 'Scorecards',
    },
  },
  [WtApplication.Crm]: {
    name: 'CRM',
    sections: {
      [CrmSections.Contacts]: 'Contacts',
      [CrmSections.Slas]: 'SLAS',
      [CrmSections.ServiceCatalogs]: 'Service catalogs',
      [CrmSections.Sources]: 'Case sources',
      [CrmSections.ContactGroups]: 'Contact groups',
    },
  },
  [WtApplication.History]: { name: 'Call History' },
  [WtApplication.Analytics]: { name: 'Data Visualisation Tool' },
  [WtApplication.Supervisor]: {
    name: 'Supervisor Workspace',
    sections: {
      [SupervisorSections.Queues]: 'Queues',
      [SupervisorSections.Agents]: 'Agents',
      [SupervisorSections.ActiveCalls]: 'Active calls',
    },
  },
  [WtApplication.Admin]: {
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
    },
  },
  [WebitelApplications.AGENT]: {},
  [WebitelApplications.AUDIT]: {
    sections: {},
  },
  [WebitelApplications.CRM]: {
    sections: {
      [CrmSections.CONTACTS]: 'Байланыстар',
    },
  },
  [WebitelApplications.HISTORY]: {},
  [WebitelApplications.ANALYTICS]: {},
  [WebitelApplications.SUPERVISOR]: {
    sections: {
      [SupervisorSections.QUEUES]: 'Кезектер',
      [SupervisorSections.AGENTS]: 'Операторлар',
      [SupervisorSections.ACTIVE_CALLS]: 'Белсенді қоңыраулар',
    },
  },
  [WebitelApplications.ADMIN]: {
    sections: {
      [AdminSections.USERS]: 'Пайдаланушылар',
      [AdminSections.LICENSE]: 'Лицензиялар',
      [AdminSections.DEVICES]: 'Құрылғылар',
      [AdminSections.FLOW]: 'Схемалар',
      [AdminSections.DIALPLAN]: 'Шығыс бағыттау',
      [AdminSections.GATEWAYS]: 'Шлюздер',
      [AdminSections.CHATPLAN]: 'Мәтіндік хабарламаны бағыттау қағидасы',
      [AdminSections.SKILLS]: 'Оператор дағдылары',
      [AdminSections.BUCKETS]: 'Себеттер',
      [AdminSections.MEDIA]: 'Медиафайлдар',
      [AdminSections.BLACKLIST]: 'Тізімдер',
      [AdminSections.CALENDARS]: 'Күнтізбелер',
      [AdminSections.COMMUNICATIONS]: 'Байланыс түрлері',
      [AdminSections.REGIONS]: 'Орындар',
      [AdminSections.PAUSE_CAUSE]: 'Оператор күйлері',
      [AdminSections.AGENTS]: 'Операторлар',
      [AdminSections.TEAMS]: 'Командалар',
      [AdminSections.RESOURCES]: 'Ресурстар',
      [AdminSections.RESOURCE_GROUPS]: 'Ресурстар топтары',
      [AdminSections.QUEUES]: 'Кезектер',
      [AdminSections.STORAGE]: 'Қойма',
      [AdminSections.COGNITIVE_PROFILES]: 'Дыбыстық профильдер',
      [AdminSections.EMAIL_PROFILES]: 'Email профильдері',
      [AdminSections.IMPORT_CSV]: 'CSV файлдарынан деректерді импорттау',
      [AdminSections.TRIGGERS]: 'Триггерлер',
      [AdminSections.ROLES]: 'Рөлдер',
      [AdminSections.OBJECTS]: 'Бөлімдер',
    },
  },
},
  validation: {
    required: 'Міндетті өріс',
    numeric: 'Сандық мәнді енгізу керек',
    email: 'Электрондық пошта мекенжайын енгізу қажет',
    gatewayHostValidator: 'IPv4 немесе FQDN енгізу керек',
    sipAccountValidator: 'SIP-аккаунт енгізу керек',
    ipValidator: 'IPv4 енгізу керек',
    macValidator: 'MAC-мекенжайын енгізу керек',
    minValue: 'Мәні кіші болмауы керек',
    maxValue: 'Мәні үлкен болмауы керек',
    sameAs: 'Қате құпиясөз',
    requiredArrayValue: 'Өріс бос болмауы керек',
    minLength: 'Таңбалар саны кем болмауы керек',
    url: 'Жарамды URL-мекенжайын енгізу қажет',
    regExpValidator: 'Жарамсыз тұрақты мән',
    domainValidator: 'Қате домен',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Іздеу',
    },
    timepicker: {
      hour: 'Сағат:',
      min: 'Мин:',
      sec: 'Сек:',
    },
    datetimepicker: {
      lastHour: 'Соңғы сағат',
      lastDay: 'Соңғы күн',
    },
    pagination: {
      sizeText: 'Беттегі жазбалар:',
      prev: 'Артқа',
      next: 'Әрі қарай',
    },
    appNavigator: {
      title: 'Webitel қосымшалары',
    },
    headerActions: {
      account: 'Аккаунт',
      docs: 'Құжаттама',
      settings: 'Баптау',
      logout: 'Шығу',
      buildVersion: 'Құрастыру нұсқасы',
    },
    tableActions: {
      filterReset: 'Іріктемені қалпына келтіру',
      columnSelect: 'Бағандарды қосу',
      refreshTable: 'Жаңарту',
      expandFilters: 'Іріктемені кеңейту',
    },
    tableColumnSelect: {
      title: 'Көрсетілетін бағандарды таңдаңыз',
    },
    statusSelect: {
      online: 'Онлайн',
      pause: 'Үзіліс ',
      offline: 'Оффлайн',
      breakOut: 'Мәжбүрлі үзіліс',
    },
    iconAction: {
      deleteActionHint: 'Жою',
      editActionHint: 'Редакциялау',
      addActionHint: 'Қосу',
      historyActionHint: 'Тарих',
      downloadActionHint: 'Жүктеп алу',
    },
    errorPages: {
      goBack: 'Артқа қайту',
      page403: {
        title: 'Кіруге болмайды',
        text: 'Кешіріңіз, бұл бетті көруге сізде рұқсат жоқ.',
      },
      page404: {
        title: 'Сіз адасып кеткен сияқтысыз',
        text: 'Кешіріңіз, біз сіз іздегенді таба алмадық',
      },
    },
    copyAction: {
      copy: 'Көшіру',
      copied: 'Көшірілді!',
    },
    auditForm: {
      question: 'Критерий',
      option: 'Нұсқа |Нұсқалар',
      addQuestion: 'Критерий қосу',
      answerType: 'Жауап түрі',
      type: {
        options: 'Нұсқа ',
        score: 'Бал',
      },
    },
    deleteConfirmationPopup: {
      title: 'Жоюды растаңыз',
      askingAlert:
        '{count} жазбасын  жойғыңыз келетініне сенімдісіз бе?  | {count} жазбасын  жойғыңыз келетініне сенімдісіз бе?',
      undoneActionAlert: 'Бұл әрекетті қайтару мүмкін емес.',
      deleteAll: 'БАРЛЫҒЫ',
    },
    dummy: {
      text: 'Бөлімде әлі жазбалар жазылмаған',
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Үзіліс себебін таңдаңыз',
        min: 'Мин',
        unlimited: 'Лимитсіз',
      },
    },
  },
};
