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
    comment: 'Түсініктеме',
    replace: 'Ауыстыру',
    download: 'Жүктеу',
    history: 'Тарих',
    filter: ({ plural }) => plural(['Сүзгі', 'Сүзгілер']),
    total: 'Барлығы',
    ok: 'ОК',
    object: 'Объект',
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
    title: 'Атауы',
    position: 'Позиция',
    delete: 'Жою',
    search: 'Іздеу',
    open: 'Ашу',
    name: 'Атауы',
    expand: 'Жаю',
    collapse: 'Жию',
    generate: 'Генерациялау',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      uk: 'Українська',
      kz: 'Қазақ',
    },
    from: 'Бастап',
    to: 'Дейін',
    tts: 'Мәтіннен сөзге',
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
    createdBy: 'Құрған',
    modifiedAt: 'Өзгертілген күні',
    modifiedBy: 'Өзгерткен',
    general: 'Жалпы',
    generalInfo: 'Жалпы ақпарат',
    all: 'Барлық {entity}',
    upload: 'Жүктеу',
    edit: 'Өңдеу',
    back: 'Артқа',
    step: 'Қадам { count }',
    more: 'Тағы',
    read: 'Оқу',
    create: 'Құру',
    update: 'Жаңарту',
    draggable: 'Жылжымалы',
    unassigned: 'Тағайындалмаған',
    showUnassigned: 'Тағайындалмағандарды көрсету',
    group: 'Топ',
    updatedBy: (/*{ named }*/) => {
      return 'Өзгертілген';
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
    channel: 'Арна | Арналар',
    file: 'Файл',
    logout: 'Шығу',
    priority: 'Басымдылық | Басымдылықтар',
    color: 'Түс',
    variables: 'Айнымалы | Айнымалылар',
    type: 'Түрі',
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
    emails: 'Email | Emails',
    phones: 'Телефон | Телефондар',
    messaging: 'Хабарлама',
    emptyResultSearch: 'Іздеу нәтижесі табылмады',
    contact: 'Байланыс | Байланыстар',
    column: 'Баған | Бағандар',
    notification: 'Хабарландыру | Хабарландырулар',
  },
    appNavigator: {
      title: 'Webitel қосымшалары',
      admin: 'Әкімші',
      agent: 'Агент',
      supervisor: 'Бақылаушы',
      audit: 'Тексеру',
      history: 'Тарих',
      grafana: 'Графана',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Аккаунт',
      docs: 'Құжаттар',
      settings: 'Параметрлер',
      logout: 'Шығу',
      buildVersion: 'Құрылым нұсқасы',
    },
    tableActions: {
      filterReset: 'Сүзгілерді қалпына келтіру',
      columnSelect: 'Бағандарды таңдау',
      refreshTable: 'Кестені жаңарту',
      expandFilters: 'Сүзгілерді кеңейту',
    },
    tableColumnSelect: {
      title: 'Көрінетін бағандарды таңдаңыз',
    },
    statusSelect: {
      online: 'Желіде',
      pause: 'Кідіріс',
      offline: 'Желіден тыс',
      breakOut: 'Үзіліс',
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
          return `${linked('reusable.add')} контактілер`;
        },
      },
    },
    errorPages: {
      goBack: 'Артқа қайту',
      page403: {
        title: 'Рұқсат жоқ',
        text: 'Кешіріңіз, бұл бетті көру үшін рұқсатыңыз жеткіліксіз.',
      },
      page404: {
        title: 'Сіз адасып қалған сияқтысыз',
        text: 'Кешіріңіз, сіз іздеген бетті таба алмадық.',
      },
    },
    copyAction: {
      copy: 'Көшіру',
      copied: 'Буферге көшірілді!',
    },
    auditForm: {
      question: 'Критерий',
      option: 'Нұсқа | Нұсқалар',
      score: 'Ұпай | Ұпайлар',
      addQuestion: 'Критерий қосу',
      answerType: 'Жауап түрі',
      type: {
        options: 'Нұсқалар',
        score: 'Ұпай',
      },
      clearSelection: 'Таңдауды тазарту',
    },
    deleteConfirmationPopup: {
      title: 'Жоюды растау',
      askingAlert:
        '{subject} жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.',
      tableAskingAlert:
        '{count} жазбаны жойғыңыз келетініне сенімдісіз бе? | {count} жазбаны жойғыңыз келетініне сенімдісіз бе?',
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
        title: 'Кідіріс себебін таңдаңыз',
        min: 'Мин',
        unlimited: 'Шексіз',
      },
      statusSelectErrorPopup: {
        title: 'Назар аударыңыз',
        message:
          'Агенттердің кідіріске шығу шегі асып кетті. Қазір кідіріске шығу мүмкін емес.',
      },
    },
    saveFailedPopup: {
      title: 'Сақтау сәтсіз аяқталды',
      label: 'Бір нәрсе дұрыс болмады, қайталап көріңіз',
      exportToJson: 'JSON форматында экспорттау',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Бүгін',
        [RelativeDatetimeValue.ThisWeek]: 'Осы апта',
        [RelativeDatetimeValue.ThisMonth]: 'Осы ай',
        [RelativeDatetimeValue.Custom]: 'Таңдамалы күн аралығы',
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} сүзгі`;
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
      rated: 'Бағаланған',
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
