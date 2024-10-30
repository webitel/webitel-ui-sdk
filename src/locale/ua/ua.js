import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';
import ChatGatewayProvider
  from '../../enums/ChatGatewayProvider/ChatGatewayProvider.enum.js';
import QueueType from '../../enums/QueueType/QueueType.enum.js';
import AdminSections
  from '../../enums/WebitelApplications/AdminSections.enum.js';
import AuditorSections
  from '../../enums/WebitelApplications/AuditorSections.enum.js';
import CrmSections from '../../enums/WebitelApplications/CrmSections.enum.js';
import SupervisorSections
  from '../../enums/WebitelApplications/SupervisorSections.enum.js';
import WebitelApplications
  from '../../enums/WebitelApplications/WebitelApplications.enum.js';
import {
  AccessMode,
} from '../../modules/ObjectPermissions/_internals/enums/AccessMode.enum.js';
import { snakeToCamel } from '../../scripts/caseConverters.js';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Всього',
    ok: 'Ок',
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
  },
  vocabulary: {
    language: 'Мова',
    voice: 'Голос',
    format: 'Формат',
    text: 'Текст',
    yes: 'Так',
    no: 'Ні',
    description: 'Опис',
    login: 'Логін',
    host: 'Хост',
    time: 'Час',
    channel: 'Канал',
    file: 'Файл',
    logout: 'Вийти',
    priority: 'Приорітет',
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
    grantee: 'Отримувач | Отримувачі',
    grantor: 'Надавач | Надавачі',
    user: 'Користувач | Користувачі',
    role: 'Роль | Ролі',
    queue: {
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
        [CrmSections.SLAS]: 'SLAS',
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
    sameAs: 'Неправильний пароль',
    requiredArrayValue: 'Поле не повинно бути пустим',
    minLength: 'Кількість символів повинна бути не меншою, ніж',
    url: 'Необхідно ввести правильну url-адресу',
    websocketValidator: 'Необхідно ввести правильну WebSocket url-адресу',
    isRegExpMatched: 'Пароль має відповідати регулярному виразу:',
    regExpValidator: 'Не правильний регулярний вираз',
    domainValidator: 'Невірний домен',
    decimalValidator: 'Кількість десяткових знаків не повинна бути більше { count }',
    integer: 'Поле повинно містити лише цілі числа',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Пошук',
      settingsHint: 'Налаштування пошуку',
      variableSearchHint: 'Формат запиту: "ключ=значення"',
    },
    timepicker: {
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
      deleteActionHint: 'Видалити',
      editActionHint: 'Редагувати',
      addActionHint: 'Додати',
      historyActionHint: 'Історія',
      downloadActionHint: 'Скачати',
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
        'Ви впевнені, що хочете\n видалити {count} запис? | Ви впевнені, що хочете\n видалити {count} записів?',
      deleteAll: 'ВСІ',
    },
    dummy: {
      text: 'Записи у розділі ще не створені',
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Виберіть причину паузи',
        min: 'Хв',
        unlimited: 'Безліміт',
      },
      statusSelectErrorPopup: {
        title: 'Увага',
        message: 'Ліміт операторів в паузі перевищено. Перерва наразі недоступна.',
      },
    },
    saveFailedPopup: {
      title: 'Помилка збереження',
      label: 'Щось пішло не так. Будь ласка, спробуйте ще раз',
      exportToJson: 'Експортувати в JSON',
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Сталася помилка завантаження історії чату',
  },
};
