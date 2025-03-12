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
    replace: 'Замінити',
    download: 'Завантажити',
    history: 'Історія',
    filter: 'Фільтр | Фільтри',
    total: 'Всього',
    ok: 'Ок',
    object: "Об'єкт",
    save: 'Зберегти',
    saveAs: 'Зберегти як',
    saved: 'Збережено',
    send: 'Надіслати',
    start: 'Почати',
    close: 'Закрити',
    add: 'Додати',
    cancel: 'Відмінити',
    import: 'Імпорт',
    export: 'Експорт',
    true: 'Так',
    title: 'Заголовок',
    position: 'Позиція',
    delete: 'Видалити',
    search: 'Пошук',
    open: 'Відкрити',
    name: 'Назва',
    expand: 'Розгорнути',
    collapse: 'Згорнути',
    generate: 'Згенерувати',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      ua: 'Українська',
      kz: 'Қазақ',
    },
    from: 'Від',
    to: 'До',
    tts: 'Text-to-Speech',
    state: 'Стан',
    refresh: 'Оновити',
    retry: 'Повторити',
    reset: 'Скинути',
    downloadAll: 'Завантажити все',
    warning: 'Попередження',
    doNotSave: 'Не зберігати',
    required: "Обов'язковий",
    copy: 'Скопіювати',
    new: 'Новий',
    createdAt: 'Створено',
    createdBy: 'Ким створено',
    modifiedAt: 'Змінено',
    modifiedBy: 'Ким змінено',
    general: 'Загальне',
    generalInfo: 'Загальна інформація',
    all: 'Всі {entity}',
    upload: 'Завантажити',
    edit: 'Редагувати',
    back: 'Назад',
    step: 'Крок { count }',
    more: 'Більше',
    read: 'Читати',
    create: 'Створити',
    draggable: 'Перетягнути',
    unassigned: 'Непризначені',
    showUnassigned: 'Показати непризначені',
  },
  vocabulary: {
    apply: 'Застосувати',
    language: 'Мова',
    voice: 'Голос',
    format: 'Формат',
    text: 'Текст',
    yes: 'Так',
    column: 'Колонка',
    no: 'Ні',
    description: 'Опис',
    login: 'Логін',
    host: 'Хост',
    time: 'Час',
    channel: 'Канал | Канали',
    file: 'Файл',
    logout: 'Вийти',
    priority: 'Пріоритет | Пріоритети',
    color: 'Колір',
    variables: 'Змінна | Змінні',
    type: 'Тип',
    tag: 'Тег | Теги',
    output: 'Вихід | Виходи',
    values: 'Значення | Значення',
    keys: 'Ключ | Ключі',
    duration: 'Тривалість',
    errors: 'Помилка | Помилки',
    labels: 'Мітка | Мітки',
    permissions: 'Дозвіл | Дозволи',
    options: 'Опція | Опції',
    emails: 'Електронна адреса | Електронні адреси',
    phones: 'Телефон | Телефони',
    messaging: 'Повідомлення',
    emptyResultSearch: 'Пошук не дав результатів',
    contact: 'Контакт | Контакти',
  },
  // date-related texts
  date: {
    sec: 'Сек',
    timezone: 'Часова зона | Часові зони',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Управління діями',
    RbAC: 'Управління записами',
    operations: 'Дії',
    rbacDefault: 'Права доступу на записи за замовчуванням',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Заборонено',
      [AccessMode.ALLOW]: 'Дозволено',
      [AccessMode.MANAGE]: 'Управління',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Команда | Команди',
    supervisor: 'Супервізор | Супервізори',
    auditor: 'Аудитор | Аудитори',
    region: 'Регіон | Регіони',
    communicationType: "Тип зв'язку | Типи зв'язку",
    grantee: 'Власник прав | Власники прав',
    grantor: 'Надавач | Надавачі',
    user: 'Користувач | Користувачі',
    role: 'Роль | Ролі',
    calendar: 'Календар | Календарі',
    direction: 'Напрямок',
    gateway: 'Шлюз | Шлюзи',
    hangupCause: 'Причина завершення',
    hasOption: 'Has option',
    hasRecording: 'Запис розмови',
    amdResult: 'AMD результат',
    ratedBy: 'Оцінено ким',
    talkDuration: 'Тривалість розмови',
    totalDuration: 'Загальна тривалість',
    transcription: 'Транскрипція',
    attachment: 'Вкладення | Вкладення',
    queue: {
      queue: 'Черга | Черги',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Вхідна черга',
        [QueueType.OFFLINE_QUEUE]: 'Оффлайн черга',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Вихідний IVR',
        [QueueType.PREDICTIVE_DIALER]: 'Предиктивний обзвін',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогресивний обзвін',
        [QueueType.PREVIEW_DIALER]: "Прев'ю обзвін",
        [QueueType.CHAT_INBOUND_QUEUE]: 'Черга чатів',
        [QueueType.INBOUND_JOB_QUEUE]: 'Вхідна черга завдань',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Вихідна черга завдань',
      },
    },
    agent: {
      agent: 'Оператор | Оператори',
      status: {
        [AgentStatus.Online]: 'Онлайн',
        [AgentStatus.Pause]: 'Пауза',
        [AgentStatus.Offline]: 'Офлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Примусова перерва',
      },
    },
    flow: {
      name: 'Схема | Схеми',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Текстова',
        [EngineRoutingSchemaType.Voice]: 'Голосова',
        [EngineRoutingSchemaType.Service]: 'Службова',
        [EngineRoutingSchemaType.Processing]: 'Форми',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Telegram Бот',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Telegram Застосунок',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Web chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Custom Chat Gateway',
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Очікування',
      [ChannelState.Distribute]: 'Зарезервований',
      [ChannelState.Offering]: 'Розподіл',
      [ChannelState.Answered]: 'Прийнятий',
      [ChannelState.Active]: 'Активний',
      [ChannelState.Bridged]: "З'єднаний",
      [ChannelState.Hold]: 'Утримання',
      [ChannelState.Missed]: 'Пропущений',
      [snakeToCamel(ChannelState.WrapTime)]: 'Постобробка',
      [ChannelState.Processing]: 'Обробка',
      [ChannelState.Transfer]: 'Перевід',
    },
    type: {
      [ChannelType.Call]: 'Дзвінок',
      [ChannelType.Email]: 'Пошта',
      [ChannelType.Chat]: 'Чат',
      [ChannelType.Job]: 'Задача',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Вхідний | Вхідні',
      [CallDirection.Outbound]: 'Вихідний | Вихідні',
    },
  },
  cases: {
    status: 'Статус',
    source: 'Джерело',
    author: 'Автор',
    reporter: 'Ініціатор',
    impacted: 'Впливає на',
    assignee: 'Виконавець',
    group: 'Група виконавців',
    reason: 'Причина | Причини',
    rating: 'Оцінка',
    service: 'Cервіси | Cервіси',
    appliedSLA: 'Застосований SLA',
    appliedCondition: 'Застосована умова',
    reactionTime: 'Плановий час реакції',
    resolutionTime: 'Плановий час вирішення',
    actualReactionTime: 'Фактичний час реакції',
    actualResolutionTime: 'Фактичний час вирішення',
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.SCORECARDS]: 'Анкети',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.CONTACTS]: 'Контакти',
        [CrmSections.CASES]: 'Звернення',
        [CrmSections.PRIORITIES]: 'Пріоритети',
        [CrmSections.CLOSE_REASON_GROUPS]: 'Причини закриття',
        [CrmSections.STATUSES]: 'Статуси',
        [CrmSections.SLAS]: 'SLA',
        [CrmSections.SERVICE_CATALOGS]: 'Каталоги сервісів',
        [CrmSections.SOURCES]: 'Джерела звернень',
        [CrmSections.CONTACT_GROUPS]: 'Групи контактів',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.QUEUES]: 'Черги',
        [SupervisorSections.AGENTS]: 'Оператори',
        [SupervisorSections.ACTIVE_CALLS]: 'Активні дзвінки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Користувачі',
        [AdminSections.LICENSE]: 'Ліцензії',
        [AdminSections.DEVICES]: 'Пристрої',
        [AdminSections.FLOW]: 'Схеми',
        [AdminSections.DIALPLAN]: 'Правила вихідного набору',
        [AdminSections.GATEWAYS]: 'Шлюзи',
        [AdminSections.CHATPLAN]: 'Правила маршрутизації текстових повідомлень',
        [AdminSections.CHAT_GATEWAYS]: 'Текстові шлюзи',
        [AdminSections.SKILLS]: 'Навички оператора',
        [AdminSections.BUCKETS]: 'Кошики',
        [AdminSections.MEDIA]: 'Медіафайли',
        [AdminSections.SHIFT_TEMPLATES]: 'Шаблон змін',
        [AdminSections.PAUSE_TEMPLATES]: 'Шаблон пауз',
        [AdminSections.WORKING_CONDITIONS]: 'Умови роботи',
        [AdminSections.BLACKLIST]: 'Cписки',
        [AdminSections.CALENDARS]: 'Календарі',
        [AdminSections.REGIONS]: 'Розташування',
        [AdminSections.COMMUNICATIONS]: "Типи зв'язку",
        [AdminSections.PAUSE_CAUSE]: 'Статуси оператора',
        [AdminSections.AGENTS]: 'Оператори',
        [AdminSections.TEAMS]: 'Команди',
        [AdminSections.RESOURCES]: 'Ресурси',
        [AdminSections.RESOURCE_GROUPS]: 'Групи ресурсів',
        [AdminSections.QUEUES]: 'Черги',
        [AdminSections.STORAGE]: 'Сховища',
        [AdminSections.STORAGE_POLICIES]: 'Політики збереження файлів',
        [AdminSections.COGNITIVE_PROFILES]: 'Голосові профілі',
        [AdminSections.EMAIL_PROFILES]: 'Email профілі',
        [AdminSections.SINGLE_SIGN_ON]: 'Single Sign-on',
        [AdminSections.IMPORT_CSV]: 'Імпорт даних з CSV файлів',
        [AdminSections.TRIGGERS]: 'Тригери',
        [AdminSections.ROLES]: 'Ролі',
        [AdminSections.OBJECTS]: 'Розділи',
        [AdminSections.CHANGELOGS]: 'Журнал змін',
        [AdminSections.CONFIGURATION]: 'Конфігурація',
        [AdminSections.GLOBAL_VARIABLES]: 'Глобальні змінні',
      },
    },
  },
  validation: {
    required: "Обов'язкове поле",
    numeric: 'Необхідно ввести цифрові значення',
    email: 'Необхідно ввести адресу електронної пошти',
    gatewayHostValidator: 'Необхідно ввести IPv4 або FQDN',
    sipAccountValidator: 'Необхідно ввести SIP-аккаунт',
    ipValidator: 'Необхідно ввести IPv4',
    macValidator: 'Необхідно ввести MAC-адрес',
    minValue: 'Значення повинно бути не менше',
    maxValue: 'Значення повинно бути не більше',
    maxLength: 'Довжина не повинна бути більшою, ніж',
    sameAs: 'Неправильний пароль',
    requiredArrayValue: 'Поле не повинно бути пустим',
    minLength: 'Кількість символів повинна бути не меншою, ніж',
    url: 'Необхідно ввести правильну url-адресу',
    websocketValidator: 'Необхідно ввести правильну WebSocket url-адресу',
    isRegExpMatched: 'Пароль має відповідати регулярному виразу:',
    regExpValidator: 'Не правильний регулярний вираз',
    domainValidator: 'Невірний домен',
    decimalValidator:
      'Кількість десяткових знаків не повинна бути більше { count }',
    latinWithNumber:
      'Код повинен містити лише літери (A-Z, a-z) та цифри (0-9) і починатися з літери',
    integer: 'Поле повинно містити лише цілі числа',
    nameAlreadyInUse: 'Така назва вже використовується',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Пошук',
      settingsHint: 'Налаштування пошуку',
      variableSearchHint: 'Формат запиту: "ключ=значення"',
    },
    timepicker: {
      day: 'День:',
      hour: 'Год:',
      min: 'Хв:',
      sec: 'Сек:',
    },
    datetimepicker: {
      lastHour: 'Остання година',
      lastDay: 'Останній день',
    },
    pagination: {
      sizeText: 'Записів на сторінці:',
      prev: 'Назад',
      next: 'Далі',
    },
    appNavigator: {
      title: 'Застосунки Webitel',
      admin: 'Admin',
      agent: 'Agent',
      supervisor: 'Supervisor',
      audit: 'Audit',
      history: 'History',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Аккаунт',
      docs: 'Документація',
      settings: 'Налаштування',
      logout: 'Вийти',
      buildVersion: 'Версія збірки',
    },
    tableActions: {
      filterReset: 'Скинути фільтри',
      columnSelect: 'Додати колонки',
      refreshTable: 'Оновити',
      expandFilters: 'Розкрити фільтри',
    },
    tableColumnSelect: {
      title: 'Виберіть колонки',
    },
    statusSelect: {
      online: 'Онлайн',
      pause: 'Пауза',
      offline: 'Оффлайн',
      breakOut: 'Примусова перерва',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter', 2),
        [IconAction.COLUMNS]: 'Додати колонки',
        [IconAction.VARIABLES]: 'Вибрати колонки зі змінними',
        [IconAction.REFRESH]: ({ linked }) => linked('reusable.refresh'),
        [IconAction.EXPAND]: ({ linked }) => linked('reusable.expand'),
        [IconAction.COLLAPSE]: ({ linked }) => linked('reusable.collapse'),
        [IconAction.CLOSE]: ({ linked }) => linked('reusable.close'),
        [IconAction.CLEAR]: ({ linked }) =>
          linked('webitelUI.tableActions.filterReset'),
        [IconAction.ADD_FILTER]: ({ linked }) => linked('reusable.add'),
        [IconAction.SAVE]: ({ linked }) => linked('reusable.save'),
        [IconAction.CANCEL]: ({ linked }) => linked('reusable.cancel'),
      },
    },
    errorPages: {
      goBack: 'Повернутись назад',
      page403: {
        title: 'Немає доступу',
        text: 'Вибачте, у Вас недостатньо прав доступу для перегляду цієї сторінки',
      },
      page404: {
        title: 'Здається, Ви загубились',
        text: 'Вибачте, ми не можемо знайти те, що Ви шукаєте',
      },
    },
    copyAction: {
      copy: 'Копіювати',
      copied: 'Скопійовано!',
    },
    auditForm: {
      question: 'Критерій',
      option: 'Варіант | Варіанти',
      score: 'Бал | Бали',
      addQuestion: 'Додати критерій',
      answerType: 'Тип відповіді',
      type: {
        options: 'Варіант',
        score: 'Бал',
      },
      clearSelection: 'Очистити вибір',
    },
    deleteConfirmationPopup: {
      title: 'Підтвердіть видалення',
      askingAlert:
        'Ви впевнені, що хочете видалити {subject}? Ця дія не може бути скасована.',
      tableAskingAlert:
        'Ви впевнені, що хочете\n видалити {count} запис? | Ви впевнені, що хочете\n видалити {count} записів?',
      deleteAll: 'ВСІ',
    },
    dummy: {
      text: 'Записи у розділі ще не створені',
    },
    empty: {
      text: {
        empty: 'Записи у розділі ще не створені',
        filters: 'На жаль, жоден запис не відповідає вашим критеріям',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Виберіть причину паузи',
        min: 'Хв',
        unlimited: 'Безліміт',
      },
      statusSelectErrorPopup: {
        title: 'Увага',
        message:
          'Ліміт операторів в паузі перевищено. Перерва наразі недоступна.',
      },
    },
    saveFailedPopup: {
      title: 'Помилка збереження',
      label: 'Щось пішло не так. Будь ласка, спробуйте ще раз',
      exportToJson: 'Експортувати в JSON',
    },
    filters: {
      predefinedLabels: { /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */
        createdAt: {
          startOfToday: 'Від початку дня',
        },
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
        return linked('cases.group');
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
      impacted: ({ linked }) => {
        return linked('cases.impacted');
      },
      priority: ({ linked }) => {
        return linked('vocabulary.priority');
      },
      queue: ({ linked }) => {
        return linked('objects.queue.queue');
      },
      rated: 'Оцінені',
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
        preset: 'Пресет | Пресети',
        overwritePresetTitle: 'Пресет з такою назвою вже існує',
        overwritePresetText: 'Пресет з такою назвою вже існує. Бажаєте його замінити?',
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
      update: ({ entity }) => `${entity} було оновлено`,
      create: ({ entity }) => `The ${entity} було збережено`,
      delete: ({ entity }) => `The ${entity} було видалено`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Сталася помилка завантаження історії чату',
    markChatProcessed: 'Не вдалося перемістити чат у “Закриті”',
  },
};
