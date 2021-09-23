import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Всього',
    ok: 'Ок',
    Save: 'Зберегти',
    close: 'Закрити',
    add: 'Додати',
    cancel: 'Відмінити',
    import: 'Імпорт',
    export: 'Експорт',
    true: 'Так',
    delete: 'Видалити',
    search: 'Пошук',
    open: 'Відкрити',
    lang: {
      en: 'English',
      ru: 'Русский',
      ua: 'Українська',
    },
  },
  // date-related texts
  date: {
    sec: 'Сек',
  },
  // describes Webitel system entities
  objects: {
    team: 'Команда | Команди',
    supervisor: 'Супервізор | Супервізори',
    auditor: 'Аудитор | Аудитори',
    region: 'Регіон | Регіони',
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: { name: 'Audit' },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.QUEUES]: 'Черги',
        [SupervisorSections.AGENTS]: 'Агенти',
        [SupervisorSections.ACTIVE_CALLS]: 'Активні дзвінки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Користувачі',
        [AdminSections.LICENSE]: 'Ліцензії',
        [AdminSections.DEVICES]: 'Пристрої',
        [AdminSections.FLOW]: 'Схеми дзвінка',
        [AdminSections.DIALPLAN]: 'Правила вихідного набору',
        [AdminSections.GATEWAYS]: 'Шлюзи',
        [AdminSections.CHAT_GATEWAYS]: 'Текстові шлюзи',
        [AdminSections.SKILLS]: 'Навички оператора',
        [AdminSections.BUCKETS]: 'Кошики',
        [AdminSections.MEDIA]: 'Медіафайли',
        [AdminSections.BLACKLIST]: 'Cписки обдзвону',
        [AdminSections.CALENDARS]: 'Календарі',
        [AdminSections.REGIONS]: 'Розміщення',
        [AdminSections.COMMUNICATIONS]: 'Типи зв\'язку',
        [AdminSections.PAUSE_CAUSE]: 'Статуси оператора',
        [AdminSections.AGENTS]: 'Оператори',
        [AdminSections.TEAMS]: 'Команди',
        [AdminSections.RESOURCES]: 'Ресурси',
        [AdminSections.RESOURCE_GROUPS]: 'Групи ресурсів',
        [AdminSections.QUEUES]: 'Черги',
        [AdminSections.STORAGE]: 'Сховища',
        [AdminSections.ROLES]: 'Ролі',
        [AdminSections.OBJECTS]: 'Розділи',
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
  },
  webitelUI: {
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
      next: 'Вперед',
    },
    appNavigator: {
      title: 'Аплікації Webitel',
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
      title: 'Виберіть відображені колонки',
    },
    statusSelect: {
      online: 'Онлайн',
      pause: 'Пауза',
      offline: 'Оффлайн',
      breakOut: 'Примусова перерва',
    },
    table: {
      tableCells: {
        deleteActionHint: 'Видалити',
        editActionHint: 'Редагувати',
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
  },
};
