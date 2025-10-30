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
    comment: 'Коментарий',
    replace: 'Заменить',
    download: 'Скачать',
    history: 'История',
    filter: 'Фильтр | Фильтры',
    total: 'Всего',
    ok: 'Ок',
    object: 'Объект',
    save: 'Сохранить',
    saveAs: 'Сохранить как',
    saved: 'Сохранено',
    send: 'Отправить',
    start: 'Начать',
    close: 'Закрыть',
    add: 'Добавить',
    cancel: 'Отменить',
    import: 'Импорт',
    export: 'Экспорт',
    true: 'Да',
    title: 'Заголовок',
    position: 'Позиция',
    delete: 'Удалить',
    search: 'Поиск',
    open: 'Открыть',
    name: 'Название',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    generate: 'Сгенерировать',
    from: 'От',
    to: 'До',
    tts: 'Text-to-Speech',
    state: 'Состояние',
    refresh: 'Обновить',
    retry: 'Повторить',
    downloadAll: 'Скачать всё',
    warning: 'Предупреждение',
    doNotSave: 'Не сохранять',
    required: 'Обязательное',
    copy: 'Скопировать',
    new: 'Новый',
    createdAt: 'Создано',
    createdBy: 'Кем создано',
    modifiedAt: 'Изменено',
    modifiedBy: 'Кем изменено',
    general: 'Общее',
    generalInfo: 'Общая информация',
    all: 'Все {entity}',
    upload: 'Загрузить',
    edit: 'Редактировать',
    back: 'Назад',
    step: 'Шаг { count }',
    more: 'Больше',
    read: 'Читать',
    create: 'Создать',
    update: 'Обновить',
    draggable: 'Перетащить',
    unassigned: 'Неназначенные',
    showUnassigned: 'Показать неназначенные',
    group: 'Группа',
    dateTime: 'Дата и время',
    updatedBy: (/*{ named }*/) => {
      return 'Редактировано';
    },
  },
  vocabulary: {
    apply: 'Применить',
    language: 'Язык',
    column: 'Колонка',
    voice: 'Голос',
    format: 'Формат',
    text: 'Текст',
    yes: 'Да',
    no: 'Нет',
    description: 'Описание',
    login: 'Логин',
    host: 'Хост',
    time: 'Время',
    channel: 'Канал | Каналы',
    file: 'Файл | Файлы',
    logout: 'Выйти',
    priority: 'Приоритет | Приоритеты',
    color: 'Цвет',
    variables: 'Переменная | Переменные',
    type: 'Тип',
    tag: 'Тег | Теги',
    output: 'Выход | Выходы',
    values: 'Значение | Значения',
    keys: 'Ключ | Ключи',
    duration: 'Длительность',
    reset: 'Сбросить',
    errors: 'Ошибка | Ошибки',
    labels: 'Метка | Метки',
    permissions: 'Разрешение | Разрешения',
    options: 'Опция | Опции',
    emails: 'Электронный адрес | Электронные адреса',
    phones: 'Телефон | Телефоны',
    messaging: 'Сообщения',
    emptyResultSearch: 'Поиск не дал результатов',
    contact: 'Контакт | Контакты',
    notification: 'Уведомление | Уведомления',
    screencast: 'Запись экрана',
    extension: 'Расширение',
    password: 'Пароль',
    number: 'Номер',
    expireAt: 'Истекает',
    destination: 'Назначение',
  },
  // date-related texts
  date: {
    sec: 'Сек',
    timezone: 'Часовая зона | Часовые зоны',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Управление действиями',
    RbAC: 'Управление записями',
    operations: 'Действия',
    rbacDefault: 'Права доступа по записям по умолчанию',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Запрещено',
      [AccessMode.ALLOW]: 'Разрешено',
      [AccessMode.MANAGE]: 'Управление',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Команда | Команды',
    supervisor: 'Супервизор | Супервизоры',
    auditor: 'Аудитор | Аудиторы',
    region: 'Регион | Регионы',
    communicationType: 'Тип связи | Типы связи',
    grantee: 'Владелец прав | Владельцы прав',
    grantor: 'Праводатель | Праводатели',
    user: 'Пользователь | Пользователи',
    list: 'Список | Списки',
    contact: 'Контакт | Контакты',
    case: 'Обращение | Обращения',
    role: 'Роль | Роли',
    calendar: 'Календарь | Календари',
    direction: 'Направление',
    gateway: 'Шлюз | Шлюзы',
    hangupCause: 'Причина окончания',
    hasOption: 'Has option',
    hasRecording: 'Запись разговора',
    amdResult: 'AMD результат',
    ratedBy: 'Оценено кем',
    talkDuration: 'Длительность разговора',
    totalDuration: 'Общая длительность',
    transcription: 'Транскрипция',
    attachment: 'Вложение | Вложения',
    owner: 'Владелец | Владельцы',
    customization: {
      customization: 'Персонализация | Персонализации',
    },
    customLookup: {
      customLookup:
        'Пользовательский справочник | Пользовательские справочники',
    },
    chatGateway: 'Текстовый шлюз | Текстовые шлюзы',
    chat: {
      chat: 'Чат | Чаты',
      draftPlaceholder: 'Напишите сообщение...',
    },
    queue: {
      queue: 'Очередь | Очереди',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Входящая очередь',
        [QueueType.OFFLINE_QUEUE]: 'Оффлайн очередь',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Исходящий IVR',
        [QueueType.PREDICTIVE_DIALER]: 'Предиктивный обзвон',
        [QueueType.PROGRESSIVE_DIALER]: 'Прогрессивный обзвон',
        [QueueType.PREVIEW_DIALER]: 'Превью обзвон',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Очередь чатов',
        [QueueType.INBOUND_JOB_QUEUE]: 'Входящая очередь заданий',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Исходящая очередь заданий',
      },
    },
    agent: {
      agent: 'Оператор | Операторы',
      status: {
        [AgentStatus.Online]: 'Онлайн',
        [AgentStatus.Pause]: 'Пауза',
        [AgentStatus.Offline]: 'Оффлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Принудительный перерыв',
      },
    },
    flow: {
      name: 'Схема | Схемы',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Текстовая',
        [EngineRoutingSchemaType.Voice]: 'Голосовая',
        [EngineRoutingSchemaType.Service]: 'Служебная',
        [EngineRoutingSchemaType.Processing]: 'Формы',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Telegram Бот',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Telegram Приложение',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Web chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Custom Chat Gateway',
    },
    quickReplies: {
      quickReplies: 'Быстрый ответ | Быстрые ответы',
      quickRepliesEmpty: 'Еще нет быстрых ответов',
    },
    screenRecordings: 'Запись экрана | Записи экрана',
    screenshots: 'Снимок экрана | Снимки экрана',
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Ожидание',
      [ChannelState.Distribute]: 'Зарезервирован',
      [ChannelState.Offering]: 'Распределение',
      [ChannelState.Answered]: 'Отвечен',
      [ChannelState.Active]: 'Активный',
      [ChannelState.Bridged]: 'Соединён',
      [ChannelState.Hold]: 'Удержание',
      [ChannelState.Missed]: 'Пропущен',
      [snakeToCamel(ChannelState.WrapTime)]: 'Постобработка',
      [ChannelState.Processing]: 'Обработка',
      [ChannelState.Transfer]: 'Перевод',
    },
    type: {
      [ChannelType.Call]: 'Звонок',
      [ChannelType.Email]: 'Почта',
      [ChannelType.Chat]: 'Чат',
      [ChannelType.Job]: 'Задача',
    },
  },
  cases: {
    status: 'Статус',
    source: 'Источник',
    author: 'Автор',
    reporter: 'Инициатор',
    impacted: 'Влияет на',
    assignee: 'Исполнитель',
    groupPerformers: 'Группа исполнителей',
    reason: 'Причина | Причины',
    rating: 'Оценка',
    service: 'Сервисы | Сервисы',
    selectAService: 'Выбрать сервис',
    appliedSLA: 'Примененный SLA',
    appliedCondition: 'Примененное условие',
    reactionTime: 'Плановое время реакции',
    resolutionTime: 'Плановое время решения',
    actualReactionTime: 'Фактическое время реакции',
    actualResolutionTime: 'Фактическое время решения',
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Входящий | Входящие',
      [CallDirection.Outbound]: 'Исходящий | Исходящие',
    },
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
            'Пользовательские справочники', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.Scorecards]: 'Анкеты',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Контакты',
        [CrmSections.Cases]: 'Обращения',
        [CrmSections.Priorities]: 'Приоритеты',
        [CrmSections.CloseReasonGroups]: 'Причины закрытия',
        [CrmSections.Statuses]: 'Статусы',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Каталоги сервисов',
        [CrmSections.Sources]: 'Источники обращений',
        [CrmSections.ContactGroups]: 'Группы контактов',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.Queues]: 'Очереди',
        [SupervisorSections.Agents]: 'Операторы',
        [SupervisorSections.ActiveCalls]: 'Активные звонки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Пользователи',
        [AdminSections.License]: 'Лицензии',
        [AdminSections.Devices]: 'Устройства',
        [AdminSections.Flow]: 'Схемы',
        [AdminSections.Dialplan]: 'Исходящая маршрутизация',
        [AdminSections.Gateways]: 'Шлюзы',
        [AdminSections.Chatplan]: 'Правила маршрутизации текстовых сообщений',
        [AdminSections.ChatGateways]: 'Текстовые шлюзы',
        [AdminSections.Skills]: 'Навыки оператора',
        [AdminSections.Buckets]: 'Корзины',
        [AdminSections.Media]: 'Медиафайлы',
        [AdminSections.ShiftTemplates]: 'Шаблон смен',
        [AdminSections.PauseTemplates]: 'Шаблон пауз',
        [AdminSections.WorkingConditions]: 'Условия работы',
        [AdminSections.Blacklist]: 'Cписки',
        [AdminSections.Calendars]: 'Календари',
        [AdminSections.Communications]: 'Типы связи',
        [AdminSections.Regions]: 'Площадки',
        [AdminSections.PauseCause]: 'Статусы оператора',
        [AdminSections.Agents]: 'Операторы',
        [AdminSections.Teams]: 'Команды',
        [AdminSections.Resources]: 'Ресурсы',
        [AdminSections.ResourceGroups]: 'Группы ресурсов',
        [AdminSections.Queues]: 'Очереди',
        [AdminSections.Storage]: 'Хранилища',
        [AdminSections.StoragePolicies]: 'Политики хранения файлов',
        [AdminSections.CognitiveProfiles]: 'Голосовые профили',
        [AdminSections.EmailProfiles]: 'Email профили',
        [AdminSections.SingleSignOn]: 'Single Sign-on',
        [AdminSections.ImportCsv]: 'Импорт данных из CSV файлов',
        [AdminSections.Triggers]: 'Триггеры',
        [AdminSections.Roles]: 'Роли',
        [AdminSections.Objects]: 'Разделы',
        [AdminSections.Changelogs]: 'Журнал изменений',
        [AdminSections.Configuration]: 'Конфигурация',
        [AdminSections.GlobalVariables]: 'Глобальные переменные',
        [AdminSections.QuickReplies]: 'Быстрые ответы',
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
    minValue: ({ named }) => {
      let text = 'Значение должно быть не меньше';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Значение должно быть не больше';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Длина не должна быть больше, чем';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Неверный пароль',
    requiredArrayValue: 'Поле не должно быть пустым',
    minLength: ({ named }) => {
      let text = 'Количество символов не должно быть меньше, чем';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    url: 'Необходимо ввести корректный URL-адрес',
    websocketValidator: 'Необходимо ввести корректный WebSocket url-адрес',
    isRegExpMatched: 'Пароль должен соответствовать регулярному выражению:',
    regExpValidator: 'Не правильное регулярное выражение',
    domainValidator: 'Неправильный домен',
    decimalValidator:
      'Количество десятичных знаков не должно быть больше { count }',
    latinWithNumber:
      'Код должен содержать только буквы (A-Z, a-z) и цифры (0-9) и начинатся с буквы',
    integer: 'Поле должно содержать только целые числа',
    nameAlreadyInUse: 'Это название уже используется',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Поиск',
      settingsHint: 'Настройки поиска',
      variableSearchHint: 'Формат запроса: "ключ=значение"',
    },
    timepicker: {
      day: 'День:',
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
      next: 'Далее',
    },
    appNavigator: {
      title: 'Приложения Webitel',
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
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.DOWNLOAD_PDF]: 'Скачать PDF',
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter', 2),
        [IconAction.COLUMNS]: 'Добавить колонки',
        [IconAction.VARIABLES]: 'Выбрать колонки с переменными',
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
          return `${linked('reusable.add')} контакты`;
        },
        [IconAction.CHAT]: ({linked}) => linked('objects.chat.chat')
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
    copyAction: {
      copy: 'Копировать',
      copied: 'Скопировано!',
    },
    auditForm: {
      question: 'Критерий',
      option: 'Вариант | Варианты',
      score: 'Бал | Балы',
      addQuestion: 'Добавить критерий',
      answerType: 'Тип ответа',
      type: {
        options: 'Вариант',
        score: 'Бал',
      },
      clearSelection: 'Очистить выбор',
    },
    deleteConfirmationPopup: {
      title: 'Подтвердите удаление',
      askingAlert:
        'Вы уверены, что хотите удалить {subject}? Это действие не может быть отменено.',
      tableAskingAlert:
        'Вы уверенны, что хотите\n удалить {count} запись? | Вы уверенны, что хотите\n удалить {count} записей?',
      deleteAll: 'ВСЕ',
    },
    dummy: {
      text: 'Записи в разделе еще не созданы',
    },
    empty: {
      text: {
        empty: 'Записи еще не созданы',
        filters: 'К сожалению, ни одна запись не соответствует вашим критериям',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Выберите причину паузы',
        min: 'Мин',
        unlimited: 'Безлимит',
      },
      statusSelectErrorPopup: {
        title: 'Внимание',
        message:
          'Лимит операторов в паузе превышен. Перерыв сейчас недоступен.',
      },
    },
    pdfGeneration: {
      generationStarted: 'Ваш PDF-файл генерируется…'
    },
    saveFailedPopup: {
      title: 'Ошибка сохранения',
      label: 'Что-то пошло не так. Пожалуйста, попробуйте еще раз',
      exportToJson: 'Экспортировать в JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Сегодня',
        [RelativeDatetimeValue.ThisWeek]: 'Эта неделя',
        [RelativeDatetimeValue.ThisMonth]: 'Этот месяц',
        [RelativeDatetimeValue.Custom]: 'Выбранный диапазон дат',
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
      rated: 'Оценены',
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
        preset: 'Пресет | Пресеты',
        overwritePresetTitle: 'Пресет с таким названием уже существует.',
        overwritePresetText: 'Хотите его заменить?',
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
      update: ({ named }) => `${named('entity')} был обновлён`,
      create: ({ named }) => `${named('entity')} был сохранён`,
      delete: ({ named }) => `${named('entity')} был удалён`,
    },
    info: {
      passwordExpirationMessage: 'Ваш пароль истечёт через { days } дн(я/ей)'
    }
  },
  errorNotifications: {
    chatHistoryApi: 'Произошла ошибка загрузки истории чата',
    markChatProcessed: 'Не удалось переместить чат в “Закрытые”',
  },
};
