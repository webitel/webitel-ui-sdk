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
  CrmSections as CrmSectionsNew,
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
    comment: 'Пікір',
    replace: 'Ауыстыру',
    download: 'Жүктеу',
    history: 'Тарих',
    filter: ({ plural }) => plural(['Сүзгі', 'Сүзгілер']),
    total: 'Барлығы',
    ok: 'Жарайды',
    object: 'Объект',
    save: 'Сақтау',
    saveAs: 'Басқаша сақтау',
    saved: 'Сақталды',
    send: 'Жіберу',
    start: 'Бастау',
    close: 'Жабу',
    add: 'Қосу',
    cancel: 'Бас тарту',
    import: 'Импорт',
    export: 'Экспорт',
    true: 'Иә',
    title: 'Тақырып',
    position: 'Позиция',
    delete: 'Жою',
    search: 'Іздеу',
    open: 'Ашу',
    name: 'Атау',
    expand: 'Кеңейту',
    collapse: 'Жігу',
    generate: 'Жасау',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      uk: 'Українська',
      kz: 'Қазақ',
    },
    from: 'Бастап',
    to: 'Дейін',
    tts: 'Мәтін-дауыс',
    state: 'Күй',
    refresh: 'Жаңарту',
    retry: 'Қайталау',
    downloadAll: 'Барлығын жүктеу',
    warning: 'Ескерту',
    doNotSave: 'Сақтамау',
    required: 'Міндетті',
    copy: 'Көшіру',
    new: 'Жаңа',
    createdAt: 'Құрылған күні',
    createdBy: 'Құрушы',
    modifiedAt: 'Өзгертілген күні',
    modifiedBy: 'Өзгерткен',
    general: 'Жалпы',
    generalInfo: 'Жалпы ақпарат',
    all: 'Барлық {entity}',
    upload: 'Жүктеу',
    edit: 'Өңдеу',
    back: 'Артқа',
    step: 'Қадам { count }',
    more: 'Көбірек',
    read: 'Оқу',
    create: 'Құру',
    update: 'Жаңарту',
    draggable: 'Сүйретілетін',
    unassigned: 'Тағайындалмаған',
    showUnassigned: 'Тағайындалмағандарды көрсету',
    group: 'Топ',
    updatedBy: (/*{ named }*/) => {
      return 'Өңделген';
    },
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: 'Қолдану',
    language: 'Тіл',
    voice: 'Дауыс',
    format: 'Пішім',
    text: 'Мәтін',
    yes: 'Иә',
    no: 'Жоқ',
    description: 'Сипаттама',
    login: 'Кіру',
    host: 'Хост',
    time: 'Уақыт',
    channel: 'Канал | Каналдар',
    file: 'Файл | файлдар',
    logout: 'Шығу',
    priority: 'Басымдық | Басымдықтар',
    color: 'Түс',
    variables: 'Айнымалы | Айнымалылар',
    type: 'Түр',
    tag: 'Тег | Тегтер',
    output: 'Шығыс | Шығыстар',
    values: 'Мән | Мәндер',
    keys: 'Кілт | Кілттер',
    duration: 'Ұзақтық',
    reset: 'Қалпына келтіру',
    errors: 'Қате | Қателер',
    labels: 'Белгі | Белгілер',
    permissions: 'Рұқсат | Рұқсаттар',
    options: 'Опция | Опциялар',
    emails: 'Email | Email-дер',
    phones: 'Телефон | Телефондар',
    messaging: 'Хабарлама',
    emptyResultSearch: 'Іздеу нәтижесі табылмады',
    contact: 'Байланыс | Байланыстар',
    column: 'Баған | Бағандар',
    notification: 'Хабарландыру | Хабарландырулар',
    screencast: 'Экран жазбасы',
  },
  // date-related texts
  date: {
    sec: 'Сек',
    timezone: 'Уақыт белдеуі | Уақыт белдеулері',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Операциялар арқылы басқарылады',
    RbAC: 'Жазбалар арқылы басқарылады',
    operations: 'Операциялар',
    rbacDefault: 'Жазбаға негізделген рұқсаттың әдепкі баптауы',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Тыйым салынған',
      [AccessMode.ALLOW]: 'Рұқсат ету',
      [AccessMode.MANAGE]: 'Тапсырумен рұқсат ету',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Топ | Топтар',
    supervisor: 'Супервайзер | Супервайзерлер',
    auditor: 'Аудитор | Аудиторлар',
    region: 'Аймақ | Аймақтар',
    communicationType: 'Байланыс түрі | Байланыс түрлері',
    grantee: 'Тапсырылған | Тапсырылғандар',
    grantor: 'Тапсырушы | Тапсырушылар',
    role: 'Рөл | Рөлдер',
    user: 'Пайдаланушы | Пайдаланушылар',
    list: 'Тізім | Тізімдер',
    contact: 'Байланыс | Байланыстар',
    case: 'Іс | Істер',
    calendar: 'Күнтізбе | Күнтізбелер',
    direction: 'Бағыт',
    gateway: 'Шлюз | Шлюздер',
    hangupCause: 'Қоңырауды тоқтату себебі',
    hasOption: 'Опциясы бар',
    hasRecording: 'Жазу',
    amdResult: 'AMD нәтижесі',
    ratedBy: 'Бағалаған',
    talkDuration: 'Сөйлесу уақыты',
    totalDuration: 'Жалпы уақыт',
    transcription: 'Транскрипция',
    attachment: 'Тіркеме | Тіркемелер',
    owner: 'Ие | Иелер',
    customization: {
      customization: 'Жекелендіру | Жекелендірулер',
    },
    customLookup: {
      customLookup: 'Жекелендіру | Жекелендірулер',
    },
    queue: {
      queue: 'Кезек | Кезектер',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Кіріс кезегі',
        [QueueType.OFFLINE_QUEUE]: 'Офлайн кезегі',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Шығыс IVR кезегі',
        [QueueType.PREDICTIVE_DIALER]: 'Болжамды дәйек',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогрессивті дәйек',
        [QueueType.PREVIEW_DIALER]: 'Алдын ала қарау дәйегі',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Чат кезегі',
        [QueueType.INBOUND_JOB_QUEUE]: 'Кіріс тапсырма кезегі',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Шығыс тапсырма кезегі',
      },
    },
    agent: {
      agent: 'Оператор | Операторлар',
      status: {
        [AgentStatus.Online]: 'Онлайн',
        [AgentStatus.Pause]: 'Пауза',
        [AgentStatus.Offline]: 'Офлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Принудительный перерыв',
      },
    },
    flow: {
      name: 'Ағын схемасы | Ағын схемалары',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Чат',
        [EngineRoutingSchemaType.Voice]: 'Дауыс',
        [EngineRoutingSchemaType.Service]: 'Қызмет',
        [EngineRoutingSchemaType.Processing]: 'Пішіндер',
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
      quickReplies: 'Жылдам жауап | Жылдам жауаптар',
      quickRepliesEmpty: 'Жылдам жауаптар әлі жоқ',
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Күту',
      [ChannelState.Distribute]: 'Тарату',
      [ChannelState.Offering]: 'Ұсыну',
      [ChannelState.Answered]: 'Жауап берілді',
      [ChannelState.Active]: 'Белсенді',
      [ChannelState.Bridged]: 'Қосылды',
      [ChannelState.Hold]: 'Ұстап тұру',
      [ChannelState.Missed]: 'Жіберіп алды',
      [snakeToCamel(ChannelState.WrapTime)]: 'Орау уақыты',
      [ChannelState.Processing]: 'Өңдеу',
      [ChannelState.Transfer]: 'Ауыстыру',
    },
    type: {
      [ChannelType.Call]: 'Қоңырау',
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Чат',
      [ChannelType.Job]: 'Тапсырма',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Кіріс',
      [CallDirection.Outbound]: 'Шығыс',
    },
  },
  cases: {
    status: 'Мәртебе',
    source: 'Көз',
    author: 'Автор',
    reporter: 'Есеп беруші',
    impacted: 'Әсер еткен',
    assignee: 'Тапсырылған',
    groupPerformers: 'Топ',
    reason: 'Себеп | Себептер',
    rating: 'Бағалау',
    service: 'Қызмет | Қызметтер',
    selectAService: 'Қызметті таңдаңыз',
    appliedSLA: 'Қолданылған SLA',
    appliedCondition: 'Қолданылған шарт',
    reactionTime: 'Реакция уақыты',
    resolutionTime: 'Шешу уақыты',
    actualReactionTime: 'Нақты реакция уақыты',
    actualResolutionTime: 'Нақты шешу уақыты',
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    overrideApplicationsAccess: {
      [WebitelApplications.CRM]: {
        sections: {
          [CrmSectionsNew.CasesExtensions]: ({ linked }) =>
            linked('objects.customization.customization') +
            ': ' +
            linked('objects.case'),
          [CrmSectionsNew.ContactsExtensions]: ({ linked }) =>
            linked('objects.customization.customization') +
            ': ' +
            linked('objects.contact'),
          [CrmSectionsNew.CustomLookups]: ({ linked }) =>
            linked('objects.customization.customization') +
            ': ' +
            linked('objects.customLookup'),
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Оператор жұмыс орны' },
    [WebitelApplications.AUDIT]: {
      name: 'Аудит',
      sections: {
        [AuditorSections.Scorecards]: 'Бағалау карточкалары',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Байланыстар',
        [CrmSections.Cases]: 'Істер',
        [CrmSections.Priorities]: 'Басымдықтар',
        [CrmSections.CloseReasonGroups]: 'Жабу себептері',
        [CrmSections.Statuses]: 'Мәртебелер',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Қызмет каталогтары',
        [CrmSections.Sources]: 'Іс көздері',
        [CrmSections.ContactGroups]: 'Байланыс топтары',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Қоңырау тарихы' },
    [WebitelApplications.ANALYTICS]: { name: 'Деректерді көрсету құралы' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Супервайзер жұмыс орны',
      sections: {
        [SupervisorSections.Queues]: 'Кезектер',
        [SupervisorSections.Agents]: 'Операторлар',
        [SupervisorSections.ActiveCalls]: 'Белсенді қоңыраулар',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Әкімші',
      sections: {
        [AdminSections.Users]: 'Пайдаланушылар',
        [AdminSections.License]: 'Лицензиялар',
        [AdminSections.Devices]: 'Құрылғылар',
        [AdminSections.Flow]: 'Ағын схемалары',
        [AdminSections.Dialplan]: 'Диалпландар',
        [AdminSections.Gateways]: 'Шлюздер',
        [AdminSections.Chatplan]: 'Чатпландар',
        [AdminSections.ChatGateways]: 'Чат шлюздері',
        [AdminSections.Skills]: 'Оператор дағдылары',
        [AdminSections.Buckets]: 'Шелектер',
        [AdminSections.Media]: 'Медиа файлдары',
        [AdminSections.ShiftTemplates]: 'Ауысым үлгілері',
        [AdminSections.PauseTemplates]: 'Пауза үлгілері',
        [AdminSections.WorkingConditions]: 'Жұмыс шарттары',
        [AdminSections.Blacklist]: 'Тізімдер',
        [AdminSections.Calendars]: 'Күнтізбелер',
        [AdminSections.Regions]: 'Орналасулар',
        [AdminSections.Communications]: 'Байланыс түрлері',
        [AdminSections.PauseCause]: 'Оператор мәртебелері',
        [AdminSections.Agents]: 'Операторлар',
        [AdminSections.Teams]: 'Топтар',
        [AdminSections.Resources]: 'Ресурстар',
        [AdminSections.ResourceGroups]: 'Ресурс топтары',
        [AdminSections.Queues]: 'Кезектер',
        [AdminSections.Storage]: 'Сақтау',
        [AdminSections.StoragePolicies]: 'Сақтау саясаттары',
        [AdminSections.CognitiveProfiles]: 'Когнитивті профильдер',
        [AdminSections.EmailProfiles]: 'Email профильдері',
        [AdminSections.SingleSignOn]: 'Бір рет кіру',
        [AdminSections.ImportCsv]: 'CSV файлдан импорт',
        [AdminSections.Triggers]: 'Триггерлер',
        [AdminSections.Media]: 'Медиа файлдары',
        [AdminSections.Roles]: 'Рөлдер',
        [AdminSections.Objects]: 'Объектілер',
        [AdminSections.Changelogs]: 'Өзгеріс журналы',
        [AdminSections.Configuration]: 'Конфигурация',
        [AdminSections.GlobalVariables]: 'Жалпы айнымалылар',
        [AdminSections.QuickReplies]: 'Жылдам жауаптар',
      },
    },
  },
  validation: {
    required: 'Өріс міндетті',
    numeric: 'Сандық болуы керек',
    email: 'Email сияқты болуы керек',
    gatewayHostValidator: 'IPv4 немесе FQDN сияқты болуы керек',
    sipAccountValidator: 'SIP есеп сияқты болуы керек',
    ipValidator: 'IPv4 сияқты болуы керек',
    macValidator: 'MAC сияқты болуы керек',
    sameAs: 'Қате құпия сөз',
    requiredArrayValue: 'Массив бос болмауы керек',
    minValue: ({ named }) => {
      let text = 'Мәні кем болмауы керек';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Мәні артық болмауы керек';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = 'Ұзындығы кем болмауы керек';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Ұзындығы артық болмауы керек';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    url: 'URL сияқты болуы керек',
    websocketValidator: 'WebSocket url сияқты болуы керек',
    isRegExpMatched: 'Құпия сөз тұрақты өрнекке сәйкес болуы керек:',
    regExpValidator: 'Бұл тұрақты өрнек жарамсыз',
    domainValidator: 'Қате домен',
    decimalValidator: 'Ондық дәлдік { count } таңбадан артық болмауы керек',
    latinWithNumber:
      'Код тек әріптерден (A-Z, a-z) және сандардан (0-9) тұруы керек және әріптен басталуы керек',
    integer: 'Өріс тек бүтін сандарды қамтуы керек',
    nameAlreadyInUse: 'Бұл атау қолданыста',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Іздеу',
      settingsHint: 'Іздеу режимі',
      variableSearchHint: 'Сұрау форматы: "кілт=мән"',
    },
    timepicker: {
      day: 'Күн:',
      hour: 'Сағат:',
      min: 'Мин:',
      sec: 'Сек:',
    },
    datetimepicker: {
      lastHour: 'Соңғы сағат',
      lastDay: 'Соңғы күн',
    },
    pagination: {
      sizeText: 'Бетке жолдар:',
      prev: 'Алдыңғы',
      next: 'Келесі',
    },
    appNavigator: {
      title: 'Webitel қосымшалары',
      admin: 'Әкімші',
      agent: 'Оператор',
      supervisor: 'Супервайзер',
      audit: 'Аудит',
      history: 'Тарих',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Есеп',
      docs: 'Құжаттар',
      settings: 'Баптаулар',
      logout: 'Шығу',
      buildVersion: 'Жоба нұсқасы',
    },
    tableActions: {
      filterReset: 'Сүзгілерді қалпына келтіру',
      columnSelect: 'Бағандарды таңдау',
      refreshTable: 'Кестені жаңарту',
      expandFilters: 'Сүзгілерді кеңейту',
    },
    tableColumnSelect: {
      title: 'Көрінетін бағандарды таңдау',
    },
    statusSelect: {
      online: 'Онлайн',
      pause: 'Пауза',
      offline: 'Офлайн',
      breakOut: 'Принудительный перерыв',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Бағандарды таңдау',
        [IconAction.VARIABLES]: 'Айнымалы бағандарды таңдау',
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
      goBack: 'Артқа қайту',
      page403: {
        title: 'Рұқсат жоқ',
        text: 'Кешіріңіз, бұл бетті көруге жеткілікті құқықтарыңыз жоқ.',
      },
      page404: {
        title: 'Сіз адасып кеткен сияқтысыз',
        text: 'Кешіріңіз, сіз іздеген бетті таба алмаймыз.',
      },
    },
    copyAction: {
      copy: 'Көшіру',
      copied: 'Буферге көшірілді!',
    },
    auditForm: {
      question: 'Критерий',
      option: 'Опция | Опциялар',
      score: 'Баға | Бағалар',
      addQuestion: 'Критерий қосу',
      answerType: 'Жауап түрі',
      type: {
        options: 'Опциялар',
        score: 'Баға',
      },
      clearSelection: 'Таңдауды тазалау',
    },
    deleteConfirmationPopup: {
      title: 'Жоюды растау',
      askingAlert:
        'Сіз шынымен {subject} жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.',
      tableAskingAlert:
        'Сіз шынымен {count} жазбаны жойғыңыз келетініне сенімдісіз бе? | Сіз шынымен {count} жазбаны жойғыңыз келетініне сенімдісіз бе?',
      deleteAll: 'БАРЛЫҒЫ',
    },
    dummy: {
      text: 'Әзірге жазбалар жоқ',
    },
    empty: {
      text: {
        empty: 'Әзірге жазбалар жоқ',
        filters:
          'Өкінішке орай, сіздің критерийлеріңізге сәйкес жазбалар табылмады',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Пауза себебін таңдау',
        min: 'Мин',
        unlimited: 'Шексіз',
      },
      statusSelectErrorPopup: {
        title: 'Назар аударыңыз',
        message:
          'Операторлардың паузаға шығу шегі асып кетті. Қазір пауза мүмкін емес.',
      },
    },
    saveFailedPopup: {
      title: 'Сақтау сәтсіз',
      label: 'Бір нәрсе дұрыс болмады, қайталап көріңіз',
      exportToJson: 'JSON форматында экспорттау',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Бүгін',
        [RelativeDatetimeValue.ThisWeek]: 'Осы апта',
        [RelativeDatetimeValue.ThisMonth]: 'Осы ай',
        [RelativeDatetimeValue.Custom]: 'Жеке күн аралығы',
      },
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
      rated: 'Бағалалған',
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
        preset: 'Алдын ала орнату | Алдын ала орнатулар',
        overwritePresetTitle: 'Бұл атаумен алдын ала орнату бар.',
        overwritePresetText: 'Оны ауыстырғыңыз келе ме?',
        notifications: {
          success: {
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
      update: ({ named }) => `${named('entity').toLowerCase()} жаңартылды`,
      create: ({ named }) => `${named('entity').toLowerCase()} сақталды`,
      delete: ({ named }) => `${named('entity').toLowerCase()} жойылды`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Чат тарихын жүктеу кезінде қате орын алды',
    markChatProcessed: 'Чатты "Жабылған" күйіне ауыстыру сәтсіз аяқталды',
  },
};
