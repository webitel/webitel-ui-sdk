import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import AuditorSections
  from '../../enums/WebitelApplications/AuditorSections.enum';
import CrmSections from '../../enums/WebitelApplications/CrmSections.enum';
import SupervisorSections
  from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications
  from '../../enums/WebitelApplications/WebitelApplications.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

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
    required: 'Обов\'язковий',
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
    emails: 'Email | Emails',
    phones: 'Телефон | Телефони',
    messaging: 'Повідомлення',
  },
  // date-related texts
  date: {
    sec: 'Сек',
    timezone: 'Часова зона | Часові зони',
  },
  // describes Webitel system entities
  objects: {
    team: 'Команда | Команди',
    supervisor: 'Супервізор | Супервізори',
    auditor: 'Аудитор | Аудитори',
    region: 'Регіон | Регіони',
    communicationType: 'Тип зв\'язку | Типи зв\'язку',
    grantee: 'Отримувач | Отримувачі',
    queue: {
      type: {
        [QueueType.INBOUND_QUEUE]: 'Вхідна черга',
        [QueueType.OFFLINE_QUEUE]: 'Оффлайн черга',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Вихідний IVR',
        [QueueType.PREDICTIVE_DIALER]: 'Предиктивний обзвін',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогресивний обзвін',
        [QueueType.PREVIEW_DIALER]: 'Прев\'ю обзвін',
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
      type: {
        [EngineRoutingSchemaType.Chat]: 'Чат',
        [EngineRoutingSchemaType.Voice]: 'Голос',
        [EngineRoutingSchemaType.Service]: 'Сервіс',
        [EngineRoutingSchemaType.Processing]: 'Обробка',
      },
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Очікування',
      [ChannelState.Distribute]: 'Зарезервований',
      [ChannelState.Offering]: 'Розподіл',
      [ChannelState.Answered]: 'Прийнятий',
      [ChannelState.Active]: 'Активний',
      [ChannelState.Bridged]: 'З\'єднаний',
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
        [AdminSections.BLACKLIST]: 'Cписки',
        [AdminSections.CALENDARS]: 'Календарі',
        [AdminSections.REGIONS]: 'Розташування',
        [AdminSections.COMMUNICATIONS]: 'Типи зв\'язку',
        [AdminSections.PAUSE_CAUSE]: 'Статуси оператора',
        [AdminSections.AGENTS]: 'Оператори',
        [AdminSections.TEAMS]: 'Команди',
        [AdminSections.RESOURCES]: 'Ресурси',
        [AdminSections.RESOURCE_GROUPS]: 'Групи ресурсів',
        [AdminSections.QUEUES]: 'Черги',
        [AdminSections.STORAGE]: 'Сховища',
        [AdminSections.COGNITIVE_PROFILES]: 'Голосові профілі',
        [AdminSections.EMAIL_PROFILES]: 'Email профілі',
        [AdminSections.IMPORT_CSV]: 'Імпорт даних з CSV файлів',
        [AdminSections.TRIGGERS]: 'Тригери',
        [AdminSections.ROLES]: 'Ролі',
        [AdminSections.OBJECTS]: 'Розділи',
        [AdminSections.CHANGELOGS]: 'Журнали змін',
      },
    },
  },
  validation: {
    required: 'Обов\'язкове поле',
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
    regExpValidator: 'Не правильний регулярний вираз',
    domainValidator: 'Невірний домен',
    decimalValidator: 'Кількість десяткових знаків не повинна бути більше 2',
    integer: 'Поле повинно містити лише цілі числа',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Пошук',
      settingsHint: 'Налаштування пошуку',
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
      agent: 'Agent Workspace',
      supervisor: 'Supervisor Workspace',
      audit: 'Audit',
      history: 'Call History',
      grafana: 'Grafana',
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
    },
    deleteConfirmationPopup: {
      title: 'Підтвердіть видалення',
      askingAlert: 'Ви впевнені, що хочете видалити {count} запис? | Ви впевнені, що хочете видалити {count} записів?',
      undoneActionAlert: 'Дана дія не може бути скасована.',
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
  },
};
