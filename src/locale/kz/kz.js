import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import CrmSections from '../../enums/WebitelApplications/CrmSections.enum';
import SupervisorSections
  from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications
  from '../../enums/WebitelApplications/WebitelApplications.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

export default {
  reusable: {
    total: 'Жалпы',
    ok: 'ок',
    save: 'Сақтау',
    saveAs: 'Басқаша сақтау',
    saved: 'Сақталды',
    send: 'Жіберу',
    start: 'Бастау',
    close: 'Жабу',
    add: 'Қосу',
    cancel: 'Болдырмау',
    import: 'Импорттау',
    export: 'Экспорттау',
    true: 'Иә',
    delete: 'Жою',
    search: 'Іздеу',
    open: 'Ашық',
    name: 'Аты',
    expand: 'Кеңейту',
    collapse: 'Жабу',
    generate: 'Жасау',
    lang: {
      ru: 'Орысша',
    },
    from: 'Бастап',
    to: 'Бұрын/Дейін',
    state: 'Жағдай/Күй',
    refresh: 'Жаңарту',
    retry: 'Қайталау',
    downloadAll: 'Барлығын жүктеп алыңыз',
    warning: 'Ескерту',
    doNotSave: 'Сақтамаңыз',
    required: 'Міндетті',
    copy: 'Көшіру',
    new: 'Жаңа',
    createdAt: 'Құрылды',
    createdBy: 'Жасалған',
    modifiedAt: 'Өзгертілді',
    modifiedBy: 'Өзгерткен',
    general: 'Жалпы',
    generalInfo: 'жалпы ақпарат',
    all: 'Барлығы { entity }',
    upload: 'Жүктеп алу',
    edit: 'Өңдеу',
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
    login: 'Пайдаланушы аты ',
    host: 'Хост',
    time: 'Уақыт',
    channel: 'Арна',
    file: 'Файл',
    logout: 'Шығу',
    priority: 'Басымдық',
    variables: 'Айнымалы | Айнымалылар',
    type: 'Түр',
    tag: 'Тег | Теги',
    output: 'Шығу',
    values: 'Мағынасы | Мағыналар',
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
        [QueueType.PREDICTIVE_DIALER]: 'Болжалды қоңырау',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогрессивті теру',
        [QueueType.PREVIEW_DIALER]: 'Қоңырауды алдын ала қарау',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Чат кезегі',
        [QueueType.INBOUND_JOB_QUEUE]: 'Кіріс жұмыс кезегі',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Шығыс жұмыс кезегі',
      },
    },
    agent: {
      status: {
        [AgentStatus.Online]: 'Желіде',
        [AgentStatus.Pause]: 'Кідірту',
        [AgentStatus.Offline]: 'Оффлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Мәжбүрлі үзіліс',
      },
    },
    flow: {
      type: {
        [EngineRoutingSchemaType.Chat]: 'Чат',
        [EngineRoutingSchemaType.Voice]: 'Дауыс',
        [EngineRoutingSchemaType.Service]: 'Қызмет',
        [EngineRoutingSchemaType.Processing]: 'Емдеу',
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
      [ChannelState.Hold]: 'Ұстаңыз',
      [ChannelState.Missed]: 'Өткізіп жіберді',
      [snakeToCamel(ChannelState.WrapTime)]: 'Кейінгі өңдеу',
      [ChannelState.Processing]: 'Емдеу',
      [ChannelState.Transfer]: 'Аударма',
    },
    type: {
      [ChannelType.Call]: 'Қоңырау',
      [ChannelType.Email]: 'Пошта',
      [ChannelType.Chat]: 'Чат',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Кіріс | Кірістер',
      [CallDirection.Outbound]: 'Шығыс | Шығыстар',
    },
  },
  WebitelApplications: {
    [WebitelApplications.AGENT]: {},
    [WebitelApplications.AUDIT]: {
      sections: {},
    },
    [WebitelApplications.CRM]: {
      sections: {
        [CrmSections.CONTACTS]: 'Сауалнамалар',
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
        [AdminSections.DIALPLAN]: 'Шығыс маршруттау',
        [AdminSections.GATEWAYS]: 'Шлюздар',
        [AdminSections.CHATPLAN]: 'Мәтіндік хабарламаны бағыттау ережелері',
        [AdminSections.CHAT_GATEWAYS]: 'Мәтіндік шлюздар',
        [AdminSections.SKILLS]: 'Оператор дағдылары',
        [AdminSections.BUCKETS]: 'Себеттер',
        [AdminSections.MEDIA]: 'Медиафайлдар',
        [AdminSections.BLACKLIST]: 'Хаттар',
        [AdminSections.CALENDARS]: 'Күнтізбелер',
        [AdminSections.COMMUNICATIONS]: 'Қарым-қатынас түрлері',
        [AdminSections.REGIONS]: 'Орындар',
        [AdminSections.PAUSE_CAUSE]: 'Оператор күйлері',
        [AdminSections.AGENTS]: 'Операторлар',
        [AdminSections.TEAMS]: 'Командалар',
        [AdminSections.RESOURCES]: 'Ресурстар',
        [AdminSections.RESOURCE_GROUPS]: 'Ресурстар топтары',
        [AdminSections.QUEUES]: 'Кезектер',
        [AdminSections.STORAGE]: 'Сақтау',
        [AdminSections.COGNITIVE_PROFILES]: 'Дауыс профильдері',
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
    email: 'Электрондық пошта мекенжайы қажет',
    gatewayHostValidator: 'IPv4 немесе FQDN енгізу керек',
    sipAccountValidator: 'SIP тіркелгісін енгізу керек',
    ipValidator: 'IPv4 енгізу керек',
    macValidator: 'MAC мекенжайын енгізу керек',
    minValue: 'Мән төмен болмауы керек',
    maxValue: 'Мән үлкен болмауы керек',
    sameAs: 'Қате құпия сөз',
    requiredArrayValue: 'Өріс бос болмауы керек',
    minLength: 'Таңбалар саны кем болмауы керек',
    url: 'Жарамды URL мекенжайын енгізуіңіз керек',
    regExpValidator: 'Жарамсыз тұрақты өрнек',
    domainValidator: 'Қате домен',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Іздеу',
    },
    timepicker: {
      hour: 'Сағат',
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
      title: 'Webitel қолданбалары',
    },
    headerActions: {
      account: 'Есептік жазба',
      docs: 'Құжаттама',
      settings: 'Параметрлер',
      logout: 'Шағу',
      buildVersion: 'Құрастыру нұсқасы',
    },
    tableActions: {
      filterReset: 'Сұрыптауды қалпына келтіру',
      columnSelect: 'Бағандарды қосу',
      refreshTable: 'Жаңарту',
      expandFilters: 'Сұрыптауды кеңейту',
    },
    tableColumnSelect: {
      title: 'Көрсетілетін бағандарды таңдаңыз',
    },
    statusSelect: {
      online: 'Желіде',
      pause: 'Кідірту',
      offline: 'Желіден шыққан',
      breakOut: 'Мәжбүрлі үзіліс',
    },
    iconAction: {
      deleteActionHint: 'Жою',
      editActionHint: 'Өңдеу',
      addActionHint: 'Қосу',
      historyActionHint: 'Тарих',
      downloadActionHint: 'Жүктеп алу',
    },
    errorPages: {
      goBack: 'Артқа қайту',
      page403: {
        title: 'Кіру жоқ',
        text: 'Кешіріңіз, сізде бұл бетті қарауға жеткілікті рұқсаттарыңыз жоқ.',
      },
      page404: {
        title: 'Сіз адасып кеткен сияқтысыз',
        text: 'Кешіріңіз, біз сіз іздеген нәтижені таба алмаймыз',
      },
    },
    copyAction: {
      copy: 'Көшіру',
      copied: 'Көшірілген',
    },
    auditForm: {
      question: 'Критерий',
      option: 'Вариант | Варианттар',
      addQuestion: 'Критерий қосу',
      answerType: 'Жауап түрі',
      type: {
        options: 'Вариант',
      },
    },
    deleteConfirmationPopup: {
      title: 'Жоюды растаңыз',
      askingAlert: '{count} жазбасын шынымен жойғыңыз келе ме? | {count} жазбаларын шынымен жойғыңыз келе ме?',
      undoneActionAlert: 'Бұл әрекетті қайтару мүмкін емес.',
      deleteAll: 'БАРЛЫҚ',
    },
    dummy: {
      text: 'Бөлімде әлі жазбалар жасалмаған',
    },
  },
};
