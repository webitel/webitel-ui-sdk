import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Всего',
    ok: 'Ок',
    save: 'Сохранить',
    close: 'Закрыть',
    add: 'Добавить',
    cancel: 'Отменить',
    import: 'Импорт',
    export: 'Экспорт',
    true: 'Да',
    delete: 'Удалить',
    search: 'Поиск',
    open: 'Открыть',
    name: 'Имя',
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
    team: 'Команда | Команды',
    supervisor: 'Супервизор | Супервизоры',
    auditor: 'Аудитор | Аудиторы',
    region: 'Регион | Регионы',
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
        [SupervisorSections.QUEUES]: 'Очереди',
        [SupervisorSections.AGENTS]: 'Агенты',
        [SupervisorSections.ACTIVE_CALLS]: 'Активные звонки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Пользователи',
        [AdminSections.LICENSE]: 'Лицензии',
        [AdminSections.DEVICES]: 'Устройства',
        [AdminSections.FLOW]: 'Схемы звонка',
        [AdminSections.DIALPLAN]: 'Исходящая маршрутизация',
        [AdminSections.GATEWAYS]: 'Шлюзы',
        [AdminSections.CHAT_GATEWAYS]: 'Текстовые шлюзы',
        [AdminSections.SKILLS]: 'Навыки оператора',
        [AdminSections.BUCKETS]: 'Корзины',
        [AdminSections.MEDIA]: 'Медиафайлы',
        [AdminSections.BLACKLIST]: 'Cписки обзвона',
        [AdminSections.CALENDARS]: 'Календари',
        [AdminSections.COMMUNICATIONS]: 'Типы связи',
        [AdminSections.REGIONS]: 'Площадки',
        [AdminSections.PAUSE_CAUSE]: 'Статусы оператора',
        [AdminSections.AGENTS]: 'Операторы',
        [AdminSections.TEAMS]: 'Команды',
        [AdminSections.RESOURCES]: 'Ресурсы',
        [AdminSections.RESOURCE_GROUPS]: 'Группы ресурсов',
        [AdminSections.QUEUES]: 'Очереди',
        [AdminSections.STORAGE]: 'Хранилища',
        [AdminSections.ROLES]: 'Роли',
        [AdminSections.OBJECTS]: 'Разделы',
      },
    },
  },
  validation: {
    required: 'Обязательное поле',
    numeric: 'Необходимо ввести цифровое значение',
    email: 'Необходимо ввести адрес электронной почты',
    gatewayHostValidator: 'Необходимо ввести IPv4 или FQDN',
    sipAccountValidator: 'Необходимо ввести SIP-аккаунт',
    ipValidator: 'Необходимо ввести IPv4',
    macValidator: 'Необходимо ввести MAC-адрес',
    minValue: 'Значение должно быть не меньше',
    maxValue: 'Значение должно быть не больше',
    sameAs: 'Неверный пароль',
    requiredArrayValue: 'Поле не должно быть пустым',
    minLength: 'Количество символов не должно быть меньше, чем',
    url: 'Необходимо ввести корректный url-адрес',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Поиск',
    },
    timepicker: {
      hour: 'Час:',
      min: 'Мин:',
      sec: 'Сек:',
    },
    datetimepicker: {
      lastHour: 'Последний час',
      lastDay: 'Последний день',
    },
    pagination: {
      sizeText: 'Записей на странице:',
      prev: 'Назад',
      next: 'Вперед',
    },
    appNavigator: {
      title: 'Приложения Webitel',
      admin: 'Admin',
      agent: 'Agent Workspace',
      supervisor: 'Supervisor Workspace',
      audit: 'Audit',
      history: 'Call History',
      grafana: 'Grafana',
    },
    headerActions: {
      account: 'Аккаунт',
      docs: 'Документация',
      settings: 'Настройки',
      logout: 'Выйти',
      buildVersion: 'Версия сборки',
    },
    tableActions: {
      filterReset: 'Сбросить фильтры',
      columnSelect: 'Добавить колонки',
      refreshTable: 'Обновить',
      expandFilters: 'Раскрыть фильтры',
    },
    tableColumnSelect: {
      title: 'Выберите отображаемые колонки',
    },
    statusSelect: {
      online: 'Онлайн',
      pause: 'Пауза',
      offline: 'Оффлайн',
      breakOut: 'Принудительный перерыв',
    },
    table: {
      tableCells: {
        deleteActionHint: 'Удалить',
        editActionHint: 'Редактировать',
      },
    },
    errorPages: {
      goBack: 'Вернуться назад',
      page403: {
        title: 'Нет доступа',
        text: 'Извините, у вас недостаточно прав доступа для просмотра этой страницы.',
      },
      page404: {
        title: 'Похоже, вы потерялись',
        text: 'Извините, мы не можем найти то, что вы ищете',
      },
    },
  },
};
