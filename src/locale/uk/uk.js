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
    comment: 'Коментар',
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
    from: 'Від',
    to: 'До',
    tts: 'Text-to-Speech',
    state: 'Стан',
    refresh: 'Оновити',
    retry: 'Повторити',
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
    update: 'Оновити',
    draggable: 'Перетягнути',
    unassigned: 'Непризначені',
    showUnassigned: 'Показати непризначені',
    group: 'Група',
    dateTime: 'Дата і час',
    updatedBy: (/*{ named }*/) => {
      return 'Редаговано';
    },
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
    file: 'Файл | Файли',
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
    reset: 'Скинути',
    errors: 'Помилка | Помилки',
    labels: 'Мітка | Мітки',
    permissions: 'Дозвіл | Дозволи',
    options: 'Опція | Опції',
    emails: 'Електронна адреса | Електронні адреси',
    phones: 'Телефон | Телефони',
    messaging: 'Повідомлення',
    emptyResultSearch: 'Пошук не дав результатів',
    contact: 'Контакт | Контакти',
    notification: 'Сповіщення',
    screencast: 'Запис екрану',
    extension: 'Розширення',
    password: 'Пароль',
    number: 'Номер',
    expireAt: 'Закінчується',
    destination: 'Призначення',
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
    list: 'Список | Списки',
    contact: 'Контакт | Контакти',
    case: 'Звернення | Звернення',
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
    owner: 'Власник | Власники',
    customization: {
      customization: 'Персоналізація | Персоналізації',
    },
    customLookup: {
      customLookup: 'Користувацький довідник | Користувацькі довідники',
    },
    chatGateway: 'Текстовий шлюз | Текстові шлюзи',
    chat: {
      chat: 'Чат | Чати',
      draftPlaceholder: 'Напишіть повідомлення...',
    },
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
    quickReplies: {
      quickReplies: 'Швидка відповідь | Швидкі відповіді',
      quickRepliesEmpty: 'Ще немає швидких відповідей',
    },
    screenRecordings: 'Запис екрану | Записи екрану',
    screenshots: 'Знімок екрана | Знімки екрана',
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
    groupPerformers: 'Група виконавців',
    reason: 'Причина | Причини',
    rating: 'Оцінка',
    service: 'Cервіси | Cервіси',
    selectAService: 'Вибрати сервіс',
    appliedSLA: 'Застосований SLA',
    appliedCondition: 'Застосована умова',
    reactionTime: 'Плановий час реакції',
    resolutionTime: 'Плановий час вирішення',
    actualReactionTime: 'Фактичний час реакції',
    actualResolutionTime: 'Фактичний час вирішення',
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
            'Користувацькі довідники', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.Scorecards]: 'Анкети',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Контакти',
        [CrmSections.Cases]: 'Звернення',
        [CrmSections.Priorities]: 'Пріоритети',
        [CrmSections.CloseReasonGroups]: 'Причини закриття',
        [CrmSections.Statuses]: 'Статуси',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Каталоги сервісів',
        [CrmSections.Sources]: 'Джерела звернень',
        [CrmSections.ContactGroups]: 'Групи контактів',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.Queues]: 'Черги',
        [SupervisorSections.Agents]: 'Оператори',
        [SupervisorSections.ActiveCalls]: 'Активні дзвінки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Користувачі',
        [AdminSections.License]: 'Ліцензії',
        [AdminSections.Devices]: 'Пристрої',
        [AdminSections.Flow]: 'Схеми',
        [AdminSections.Dialplan]: 'Правила вихідного набору',
        [AdminSections.Gateways]: 'Шлюзи',
        [AdminSections.Chatplan]: 'Правила маршрутизації текстових повідомлень',
        [AdminSections.ChatGateways]: 'Текстові шлюзи',
        [AdminSections.Skills]: 'Навички оператора',
        [AdminSections.Buckets]: 'Кошики',
        [AdminSections.Media]: 'Медіафайли',
        [AdminSections.ShiftTemplates]: 'Шаблон змін',
        [AdminSections.PauseTemplates]: 'Шаблон пауз',
        [AdminSections.WorkingConditions]: 'Умови роботи',
        [AdminSections.Blacklist]: 'Cписки',
        [AdminSections.Calendars]: 'Календарі',
        [AdminSections.Regions]: 'Розташування',
        [AdminSections.Communications]: "Типи зв'язку",
        [AdminSections.PauseCause]: 'Статуси оператора',
        [AdminSections.Agents]: 'Оператори',
        [AdminSections.Teams]: 'Команди',
        [AdminSections.Resources]: 'Ресурси',
        [AdminSections.ResourceGroups]: 'Групи ресурсів',
        [AdminSections.Queues]: 'Черги',
        [AdminSections.Storage]: 'Сховища',
        [AdminSections.StoragePolicies]: 'Політики збереження файлів',
        [AdminSections.CognitiveProfiles]: 'Голосові профілі',
        [AdminSections.EmailProfiles]: 'Email профілі',
        [AdminSections.SingleSignOn]: 'Single Sign-on',
        [AdminSections.ImportCsv]: 'Імпорт даних з CSV файлів',
        [AdminSections.Triggers]: 'Тригери',
        [AdminSections.Roles]: 'Ролі',
        [AdminSections.Objects]: 'Розділи',
        [AdminSections.Changelogs]: 'Журнал змін',
        [AdminSections.Configuration]: 'Конфігурація',
        [AdminSections.GlobalVariables]: 'Глобальні змінні',
        [AdminSections.QuickReplies]: 'Швидкі відповіді',
      },
    },
    [WebitelApplications.WFM]: { name: 'WFM' },
  },
  validation: {
    required: "Обов'язкове поле",
    numeric: 'Необхідно ввести цифрові значення',
    email: 'Необхідно ввести адресу електронної пошти',
    gatewayHostValidator: 'Необхідно ввести IPv4 або FQDN',
    sipAccountValidator: 'Необхідно ввести SIP-аккаунт',
    ipValidator: 'Необхідно ввести IPv4',
    macValidator: 'Необхідно ввести MAC-адрес',
    minValue: ({ named }) => {
      let text = 'Значення повинно бути не менше';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Значення повинно бути не більше';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Довжина не повинна бути більшою, ніж';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Неправильний пароль',
    requiredArrayValue: 'Поле не повинно бути пустим',
    minLength: ({ named }) => {
      let text = 'Кількість символів повинна бути не меншою, ніж';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    url: 'Необхідно ввести правильну URL-адресу',
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
        [IconAction.DOWNLOAD_PDF]: 'Завантажити PDF',
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
        [IconAction.SAVE_PRESET]: ({ linked }) => {
          return `${linked('reusable.save')} ${linked('webitelUI.filters.presets.preset').toLowerCase()}`;
        },
        [IconAction.APPLY_PRESET]: ({ linked }) => {
          return `${linked('vocabulary.apply')} ${linked('webitelUI.filters.presets.preset').toLowerCase()}`;
        },
        [IconAction.ADD_CONTACT]: ({ linked }) => {
          return `${linked('reusable.add')} контакти`;
        },
        [IconAction.CHAT]: ({linked}) => linked('objects.chat.chat')
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
        empty: 'Записи ще не створені',
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
    pdfGeneration: {
      generationStarted: 'Ваш PDF-файл генерується…'
    },
    saveFailedPopup: {
      title: 'Помилка збереження',
      label: 'Щось пішло не так. Будь ласка, спробуйте ще раз',
      exportToJson: 'Експортувати в JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Сьогодні',
        [RelativeDatetimeValue.ThisWeek]: 'Цей тиждень',
        [RelativeDatetimeValue.ThisMonth]: 'Цей місяць',
        [RelativeDatetimeValue.Custom]: 'Власний діапазон дат',
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
        overwritePresetTitle: 'Пресет з такою назвою вже існує.',
        overwritePresetText: 'Бажаєте його замінити?',
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
      update: ({ named }) => `${named('entity')} було оновлено`,
      create: ({ named }) => `${named('entity')} було збережено`,
      delete: ({ named }) => `${named('entity')} було видалено`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Сталася помилка завантаження історії чату',
    markChatProcessed: 'Не вдалося перемістити чат у "Закриті"',
  },
};
