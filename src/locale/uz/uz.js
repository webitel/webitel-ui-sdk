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
    comment: 'Izoh',
    replace: 'Almashtirish',
    download: 'Yuklab olish',
    history: 'Tarix',
    filter: ({ plural }) => plural(['Filter', 'Filterlar']),
    total: 'Jami',
    ok: 'Ok',
    object: 'Obyekt',
    save: 'Saqlash',
    saveAs: 'Boshqa nom bilan saqlash',
    saved: 'Saqlandi',
    send: "Jo'natish",
    start: 'Boshlash',
    close: 'Yopish',
    add: "Qo'shish",
    cancel: 'Bekor qilish',
    import: 'Import',
    export: 'Eksport',
    true: 'Ha',
    title: 'Sarlavha',
    position: "O'rin",
    delete: "O'chirish",
    search: 'Qidirish',
    open: 'Ochish',
    name: 'Nomi',
    expand: 'Kengaytirish',
    collapse: 'Yigʻish',
    generate: 'Generatsiya',
    from: 'Dan',
    to: 'Gacha',
    tts: 'Matnni ovozga aylantirish',
    state: 'Holat',
    refresh: 'Yangilash',
    retry: 'Qayta urinish',
    downloadAll: 'Hammasini yuklab olish',
    warning: 'Ogohlantirish',
    doNotSave: 'Saqlamaslik',
    required: 'Majburiy',
    copy: 'Nusxa olish',
    new: 'Yangi',
    createdAt: 'Yaratilgan sana',
    createdBy: 'Yaratgan',
    modifiedAt: "O'zgartirilgan sana",
    modifiedBy: "O'zgartirgan",
    general: 'Umumiy',
    generalInfo: "Umumiy ma'lumot",
    all: 'Barcha {entity}',
    upload: 'Yuklash',
    edit: 'Tahrirlash',
    back: 'Orqaga',
    step: 'Qadam { count }',
    more: "Ko'proq",
    read: "O'qish",
    create: 'Yaratish',
    update: 'Yangilash',
    draggable: 'Sudraluvchi',
    unassigned: 'Tayinlanmagan',
    showUnassigned: "Tayinlanmaganlarni ko'rsatish",
    group: 'Guruh',
    dateTime: 'Sana va vaqt',
    updatedBy: (/*{ named }*/) => {
      return 'Tahrirlangan';
    },
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: "Qo'llash",
    language: 'Til',
    voice: 'Ovoz',
    format: 'Format',
    text: 'Matn',
    yes: 'Ha',
    no: "Yo'q",
    description: 'Tavsif',
    login: 'Kirish',
    host: 'Host',
    time: 'Vaqt',
    channel: 'Kanal | Kanallar',
    file: 'Fayl | Fayllar',
    logout: 'Chiqish',
    priority: 'Muhimlik | Muhimliklar',
    color: 'Rang',
    variables: "O'zgaruvchi | O'zgaruvchilar",
    type: 'Tur',
    tag: 'Teg | Teglar',
    output: 'Chiqish | Chiqishlar',
    values: 'Qiymat | Qiymatlar',
    keys: 'Kalit | Kalitlar',
    duration: 'Davomiyligi',
    reset: "Qayta o'rnatish",
    errors: 'Xato | Xatolar',
    labels: 'Yorliq | Yorliqlar',
    permissions: 'Ruxsat | Ruxsatlar',
    options: 'Parametr | Parametrlar',
    emails: 'Email | Emaillar',
    phones: 'Telefon | Telefonlar',
    messaging: 'Xabar yuborish',
    emptyResultSearch: 'Qidiruv natija bermadi',
    contact: 'Kontakt | Kontaktlar',
    column: 'Ustun | Ustunlar',
    notification: 'Bildirishnoma | Bildirishnomalar',
    screencast: 'Ekran yozuvi',
  },
  // date-related texts
  date: {
    sec: 'Soniya',
    timezone: 'Vaqt mintaqasi | Vaqt mintaqalari',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Operatsiyalar orqali boshqariladigan',
    RbAC: 'Yozuvlar orqali boshqariladigan',
    operations: 'Operatsiyalar',
    rbacDefault: 'Standart yozuvga asoslangan kirish',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Taqiqlangan',
      [AccessMode.ALLOW]: 'Ruxsat etilgan',
      [AccessMode.MANAGE]: 'Delegatsiya bilan ruxsat etilgan',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Jamoa | Jamoalar',
    supervisor: 'Nazoratchi | Nazoratchilar',
    auditor: 'Auditor | Auditorlar',
    region: 'Viloyat | Viloyatlar',
    communicationType: 'Aloqa turi | Aloqa turlari',
    grantee: 'Huquq oluvchi | Huquq oluvchilar',
    grantor: 'Huquq beruvchi | Huquq beruvchilar',
    role: 'Rol | Rollar',
    user: 'Foydalanuvchi | Foydalanuvchilar',
    list: "Ro'yxat | Ro'yxatlar",
    contact: 'Kontakt | Kontaktlar',
    case: 'Murojaat | Murojaatlar',
    calendar: 'Taqvim | Taqvimlar',
    direction: "Yo'nalish",
    gateway: 'Gateway | Gatewaylar',
    hangupCause: 'Uzilish sababi',
    hasOption: 'Variantlari bor',
    hasRecording: 'Yozuv',
    amdResult: 'AMD natijasi',
    ratedBy: 'Baholagan',
    talkDuration: 'Suhbat davomiyligi',
    totalDuration: 'Umumiy davomiyligi',
    transcription: 'Transkriptsiya',
    attachment: 'Ilova | Ilovalar',
    owner: 'Egasi | Egalari',
    customization: {
      customization: 'Maxsuslash | Maxsuslashlar',
    },
    customLookup: {
      customLookup: 'Maxsuslash | Maxsuslashlar',
    },
    queue: {
      queue: 'Navbat | Navbatlar',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Kiruvchi navbat',
        [QueueType.OFFLINE_QUEUE]: 'Oflayn navbat',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Chiquvchi IVR navbati',
        [QueueType.PREDICTIVE_DIALER]: 'Predictive dialer',
        [QueueType.PROGRESSIVE_DIALER]: 'Progressive dialer',
        [QueueType.PREVIEW_DIALER]: 'Preview dialer',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Chat navbati',
        [QueueType.INBOUND_JOB_QUEUE]: 'Kiruvchi vazifalar navbati',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Chiquvchi vazifalar navbati',
      },
    },
    agent: {
      agent: 'Agent | Agentlar',
      status: {
        [AgentStatus.Online]: 'Onlayn',
        [AgentStatus.Pause]: 'Pauza',
        [AgentStatus.Offline]: 'Oflayn',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Tanaffus',
      },
    },
    flow: {
      name: 'Oqim sxemasi | Oqim sxemalari',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Ovozli',
        [EngineRoutingSchemaType.Service]: 'Xizmat',
        [EngineRoutingSchemaType.Processing]: 'Shakllar',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Telegram Bot',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Telegram Ilova',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Veb chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Maxsus chat shlyuzi',
    },
    quickReplies: {
      quickReplies: 'Tezkor javob | Tezkor javoblar',
      quickRepliesEmpty: 'Hali tezkor javoblar mavjud emas',
    },
    screenRecordings: 'Ekran yozuvi | Ekran yozuvlari',
    screenshots: 'Ekran rasmi | Ekran rasmlari',
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Kutmoqda',
      [ChannelState.Distribute]: 'Taqsimlanmoqda',
      [ChannelState.Offering]: 'Taklif qilinmoqda',
      [ChannelState.Answered]: 'Javob berildi',
      [ChannelState.Active]: 'Faol',
      [ChannelState.Bridged]: 'Ulangan',
      [ChannelState.Hold]: 'Ushlab turilgan',
      [ChannelState.Missed]: "O'tkazib yuborilgan",
      [snakeToCamel(ChannelState.WrapTime)]: 'Yakuniy vaqt',
      [ChannelState.Processing]: 'Qayta ishlanmoqda',
      [ChannelState.Transfer]: "O'tkazish",
    },
    type: {
      [ChannelType.Call]: "Qo'ng'iroq",
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Chat',
      [ChannelType.Job]: 'Vazifa',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Kiruvchi',
      [CallDirection.Outbound]: 'Chiquvchi',
    },
  },
  cases: {
    status: 'Holat',
    source: 'Manba',
    author: 'Muallif',
    reporter: 'Xabar beruvchi',
    impacted: "Ta'sirlangan",
    assignee: 'Ijrochi',
    groupPerformers: 'Guruh',
    reason: 'Sabab | Sabablar',
    rating: 'Reyting',
    service: 'Xizmat | Xizmatlar',
    selectAService: 'Xizmatni tanlang',
    appliedSLA: "Qo'llanilgan SLA",
    appliedCondition: "Qo'llanilgan shart",
    reactionTime: 'Javob vaqti',
    resolutionTime: 'Hal qilish vaqti',
    actualReactionTime: 'Haqiqiy javob vaqti',
    actualResolutionTime: 'Haqiqiy hal qilish vaqti',
  },
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
            'Maxsuslashlar', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Agent ish joyi' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.Scorecards]: 'Baholash jadvallari',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Kontaktlar',
        [CrmSections.Cases]: 'Murojaatlar',
        [CrmSections.Priorities]: 'Muhimliklar',
        [CrmSections.CloseReasonGroups]: 'Yopish sabablari',
        [CrmSections.Statuses]: 'Holatlar',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Xizmatlar katalogi',
        [CrmSections.Sources]: 'Murojaat manbalari',
        [CrmSections.ContactGroups]: 'Kontakt guruhlari',
      },
    },
    [WebitelApplications.HISTORY]: { name: "Qo'ng'iroqlar tarixi" },
    [WebitelApplications.ANALYTICS]: {
      name: "Ma'lumotlarni vizualizatsiya qilish",
    },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Nazoratchi ish joyi',
      sections: {
        [SupervisorSections.Queues]: 'Navbatlar',
        [SupervisorSections.Agents]: 'Agentlar',
        [SupervisorSections.ActiveCalls]: "Faol qo'ng'iroqlar",
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Foydalanuvchilar',
        [AdminSections.License]: 'Litsenziyalar',
        [AdminSections.Devices]: 'Qurilmalar',
        [AdminSections.Flow]: 'Oqim sxemalari',
        [AdminSections.Dialplan]: "Qo'ng'iroqlar rejasi",
        [AdminSections.Gateways]: 'Shlyuzlar',
        [AdminSections.Chatplan]: 'Chat rejasi',
        [AdminSections.ChatGateways]: 'Chat shlyuzlari',
        [AdminSections.Skills]: "Agent ko'nikmalari",
        [AdminSections.Buckets]: 'Savatlar',
        [AdminSections.Media]: 'Media fayllar',
        [AdminSections.ShiftTemplates]: 'Smena shablonlari',
        [AdminSections.PauseTemplates]: 'Pauza shablonlari',
        [AdminSections.WorkingConditions]: 'Ish sharoitlari',
        [AdminSections.Blacklist]: "Ro'yxatlar",
        [AdminSections.Calendars]: 'Taqvimlar',
        [AdminSections.Regions]: 'Joylashuvlar',
        [AdminSections.Communications]: 'Aloqa turlari',
        [AdminSections.PauseCause]: 'Agent holatlari',
        [AdminSections.Agents]: 'Agentlar',
        [AdminSections.Teams]: 'Jamoalar',
        [AdminSections.Resources]: 'Resurslar',
        [AdminSections.ResourceGroups]: 'Resurs guruhlari',
        [AdminSections.Queues]: 'Navbatlar',
        [AdminSections.Storage]: 'Saqlash',
        [AdminSections.StoragePolicies]: 'Saqlash siyosatlari',
        [AdminSections.CognitiveProfiles]: 'Kognitiv profillar',
        [AdminSections.EmailProfiles]: 'Email profillar',
        [AdminSections.SingleSignOn]: 'Yagona kirish',
        [AdminSections.ImportCsv]: 'CSV fayldan import',
        [AdminSections.Triggers]: 'Triggerlar',
        [AdminSections.Media]: 'Media fayllar',
        [AdminSections.Roles]: 'Rollar',
        [AdminSections.Objects]: 'Obyektlar',
        [AdminSections.Changelogs]: "O'zgarishlar jurnali",
        [AdminSections.Configuration]: 'Konfiguratsiya',
        [AdminSections.GlobalVariables]: "Global o'zgaruvchilar",
        [AdminSections.QuickReplies]: 'Tezkor javoblar',
      },
    },
  },
  validation: {
    required: "Maydon to'ldirilishi shart",
    numeric: "Raqam bo'lishi kerak",
    email: "Email ko'rinishida bo'lishi kerak",
    gatewayHostValidator: "IPv4 yoki FQDN ko'rinishida bo'lishi kerak",
    sipAccountValidator: "SIP akkaunt ko'rinishida bo'lishi kerak",
    ipValidator: "IPv4 ko'rinishida bo'lishi kerak",
    macValidator: "MAC ko'rinishida bo'lishi kerak",
    minValue: ({ named }) => {
      let text = "Qiymat dan kam bo'lmasligi kerak";
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = "Qiymat dan ko'p bo'lmasligi kerak";
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = "Uzunlik dan kam bo'lmasligi kerak";
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = "Uzunlik dan ko'p bo'lmasligi kerak";
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: "Noto'g'ri parol",
    requiredArrayValue: "Massiv bo'sh bo'lmasligi kerak",
    url: "URL ko'rinishida bo'lishi kerak",
    websocketValidator: "WebSocket url ko'rinishida bo'lishi kerak",
    isRegExpMatched: 'Parol quyidagi formatga mos kelishi kerak:',
    regExpValidator: 'Ushbu muntazam ifoda yaroqsiz',
    domainValidator: "Noto'g'ri domen",
    decimalValidator:
      "O'nlik son aniqlik darajasi { count } tadan oshmasligi kerak",
    latinWithNumber:
      "Kod faqat harflar (A-Z, a-z) va raqamlar (0-9) dan iborat bo'lishi va harf bilan boshlanishi kerak",
    integer: "Maydon faqat butun sonlardan iborat bo'lishi kerak",
    nameAlreadyInUse: 'Ushbu nom allaqachon mavjud',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Qidirish',
      settingsHint: 'Qidirish rejimi',
      variableSearchHint: 'So\'rov formati: "kalit=qiymat"',
    },
    timepicker: {
      day: 'Kun:',
      hour: 'Soat:',
      min: 'Min:',
      sec: 'Sek:',
    },
    datetimepicker: {
      lastHour: 'Oxirgi soat',
      lastDay: 'Oxirgi kun',
    },
    pagination: {
      sizeText: 'Sahifadagi qatorlar soni:',
      prev: 'Oldingi',
      next: 'Keyingi',
    },
    appNavigator: {
      title: 'Webitel ilovalari',
      admin: 'Admin',
      agent: 'Agent',
      supervisor: 'Nazoratchi',
      audit: 'Audit',
      history: 'Tarix',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Hisob',
      docs: 'Hujjatlar',
      settings: 'Sozlamalar',
      logout: 'Chiqish',
      buildVersion: 'Versiya',
    },
    tableActions: {
      filterReset: 'Filterlarni tozalash',
      columnSelect: 'Ustunlarni tanlash',
      refreshTable: 'Jadvalni yangilash',
      expandFilters: 'Filterlarni kengaytirish',
    },
    tableColumnSelect: {
      title: "Ko'rinadigan ustunlarni tanlash",
    },
    statusSelect: {
      online: 'Onlayn',
      pause: 'Pauza',
      offline: 'Oflayn',
      breakOut: 'Tanaffus',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.DOWNLOAD_PDF]: 'PDF yuklab olish',
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Ustunlarni tanlang',
        [IconAction.VARIABLES]: "O'zgaruvchilar ustunlarini tanlash",
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
          return `${linked('reusable.add')} kontaktlar`;
        },
      },
    },
    errorPages: {
      goBack: 'Orqaga qaytish',
      page403: {
        title: 'Ruxsat rad etildi',
        text: "Kechirasiz, sizda ushbu sahifani ko'rish uchun yetarli huquqlar yo'q.",
      },
      page404: {
        title: "Siz adashganga o'xshaysiz",
        text: 'Kechirasiz, siz xohlagan sahifani topa olmadik.',
      },
    },
    copyAction: {
      copy: 'Nusxa olish',
      copied: 'Nusxa olindi!',
    },
    auditForm: {
      question: 'Mezon',
      option: 'Variant | Variantlar',
      score: 'Ball | Ballar',
      addQuestion: "Mezon qo'shish",
      answerType: 'Javob turi',
      type: {
        options: 'Variantlar',
        score: 'Ball',
      },
      clearSelection: 'Tanlovni tozalash',
    },
    deleteConfirmationPopup: {
      title: "O'chirishni tasdiqlang",
      askingAlert:
        "{subject}ni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.",
      tableAskingAlert:
        "{count} ta yozuvni o'chirishni xohlaysizmi? | {count} ta yozuvni o'chirishni xohlaysizmi?",
      deleteAll: 'HAMMASI',
    },
    dummy: {
      text: "Hali yozuvlar yo'q",
    },
    empty: {
      text: {
        empty: "Hali yozuvlar yo'q",
        filters: 'Afsuski, sizning mezonlaringizga mos yozuvlar topilmadi',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Tanaffus sababini tanlang',
        min: 'Min',
        unlimited: 'Cheklanmagan',
      },
      statusSelectErrorPopup: {
        title: 'Diqqat',
        message:
          'Agentlarning tanaffusga chiqish limiti oshib ketdi. Hozir tanaffus imkonsiz.',
      },
    },
    pdfGeneration: {
      generationStarted: 'Sizning PDF faylingiz yaratilmoqda…'
    },
    saveFailedPopup: {
      title: 'Saqlash muvaffaqiyatsiz tugadi',
      label: "Xatolik yuz berdi, iltimos qayta urinib ko'ring",
      exportToJson: 'JSONga eksport qilish',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Bugun',
        [RelativeDatetimeValue.ThisWeek]: 'Ushbu hafta',
        [RelativeDatetimeValue.ThisMonth]: 'Ushbu oy',
        [RelativeDatetimeValue.Custom]: "Boshqa sana oralig'i",
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} ${linked(
          'reusable.filter',
        ).toLowerCase()}`;
      },
      filterName: ({ linked }) => {
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
      rated: 'Baholangan',
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
        preset: 'Andoza | Andozalar',
        overwritePresetTitle: 'Bu nomdagi andoza allaqachon mavjud.',
        overwritePresetText: 'Uni almashtirmoqchimisiz?',
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
      update: ({ named }) => `${named('entity').toLowerCase()} yangilandi`,
      create: ({ named }) => `${named('entity').toLowerCase()} saqlandi`,
      delete: ({ named }) => `${named('entity').toLowerCase()} o'chirildi`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Chat tarixini yuklashda xatolik yuz berdi',
    markChatProcessed: 'Chatni "Yopilgan" holatiga o\'tkazib bo\'lmadi',
  },
};
