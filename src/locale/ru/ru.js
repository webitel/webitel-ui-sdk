export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Всего',
    ok: 'Ок',
    Save: 'Сохранить',
    close: 'Закрыть',
    add: 'Добавить',
    cancel: 'Отменить',
    import: 'Импорт',
    export: 'Экспорт',
    true: 'Да',
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
  },
  webitelUI: {
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
      title: 'Выберите отоброжаемые колонки',
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
  },
};
