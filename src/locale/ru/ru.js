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
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      ua: 'Українська',
      kz: 'Қазақ',
    },
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
    draggable: 'Перетащить',
    unassigned: 'Unassigned',
    showUnassigned: 'Show unassigned',
  },
  vocabulary: {
    apply: 'Применить',
    language: 'Язык',
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
    file: 'Файл',
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
    group: 'Группа исполнителей',
    reason: 'Причина | Причины',
    rating: 'Оценка',
    service: 'Сервисы | Сервисы',
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
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.SCORECARDS]: 'Анкеты',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.CONTACTS]: 'Контакты',
        [CrmSections.CASES]: 'Обращения',
        [CrmSections.PRIORITIES]: 'Приоритеты',
        [CrmSections.CLOSE_REASON_GROUPS]: 'Причины закрытия',
        [CrmSections.STATUSES]: 'Статусы',
        [CrmSections.SLAS]: 'SLA',
        [CrmSections.SERVICE_CATALOGS]: 'Каталоги сервисов',
        [CrmSections.SOURCES]: 'Источники обращений',
        [CrmSections.CONTACT_GROUPS]: 'Группы контактов',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.QUEUES]: 'Очереди',
        [SupervisorSections.AGENTS]: 'Операторы',
        [SupervisorSections.ACTIVE_CALLS]: 'Активные звонки',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Пользователи',
        [AdminSections.LICENSE]: 'Лицензии',
        [AdminSections.DEVICES]: 'Устройства',
        [AdminSections.FLOW]: 'Схемы',
        [AdminSections.DIALPLAN]: 'Исходящая маршрутизация',
        [AdminSections.GATEWAYS]: 'Шлюзы',
        [AdminSections.CHATPLAN]: 'Правила маршрутизации текстовых сообщений',
        [AdminSections.CHAT_GATEWAYS]: 'Текстовые шлюзы',
        [AdminSections.SKILLS]: 'Навыки оператора',
        [AdminSections.BUCKETS]: 'Корзины',
        [AdminSections.MEDIA]: 'Медиафайлы',
        [AdminSections.SHIFT_TEMPLATES]: 'Шаблон смен',
        [AdminSections.PAUSE_TEMPLATES]: 'Шаблон пауз',
        [AdminSections.WORKING_CONDITIONS]: 'Условия работы',
        [AdminSections.BLACKLIST]: 'Cписки',
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
        [AdminSections.STORAGE_POLICIES]: 'Политики хранения файлов',
        [AdminSections.COGNITIVE_PROFILES]: 'Голосовые профили',
        [AdminSections.EMAIL_PROFILES]: 'Email профили',
        [AdminSections.SINGLE_SIGN_ON]: 'Single Sign-on',
        [AdminSections.IMPORT_CSV]: 'Импорт данных из CSV файлов',
        [AdminSections.TRIGGERS]: 'Триггеры',
        [AdminSections.ROLES]: 'Роли',
        [AdminSections.OBJECTS]: 'Разделы',
        [AdminSections.CHANGELOGS]: 'Журнал изменений',
        [AdminSections.CONFIGURATION]: 'Конфигурация',
        [AdminSections.GLOBAL_VARIABLES]: 'Глобальные переменные',
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
    maxLength: 'Длина не должна быть больше, чем',
    sameAs: 'Неверный пароль',
    requiredArrayValue: 'Поле не должно быть пустым',
    minLength: 'Количество символов не должно быть меньше, чем',
    url: 'Необходимо ввести корректный url-адрес',
    websocketValidator: 'Необходимо ввести корректный WebSocket url-адрес',
    isRegExpMatched: 'Пароль должен соответствовать регулярному выражению:',
    regExpValidator: 'Не правильное регулярное выражение',
    domainValidator: 'Неправильный домен',
    decimalValidator:
      'Количество десятичных знаков не должно быть больше { count }',
    latinWithNumber:
      'Код должен содержать только буквы (A-Z, a-z) и цифры (0-9)',
    integer: 'Поле должно содержать только целые числа',
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
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter', 2),
        [IconAction.COLUMNS]: 'Добавить колонки',
        [IconAction.VARIABLES]: 'Выбрать колонки с переменными',
        [IconAction.REFRESH]: ({ linked }) => linked('reusable.refresh'),
        [IconAction.EXPAND]: ({ linked }) => linked('reusable.expand'),
        [IconAction.COLLAPSE]: ({ linked }) => linked('reusable.collapse'),
        [IconAction.CLOSE]: ({ linked }) => linked('reusable.close'),
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
        empty: 'Поиск не дал результата',
        filters: 'Нет результатов по фильтрам',
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
    saveFailedPopup: {
      title: 'Ошибка сохранения',
      label: 'Что-то пошло не так. Пожалуйста, попробуйте еще раз',
      exportToJson: 'Экспортировать в JSON',
    },
    filters: {
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
      agent : ({ linked }) => {
        return linked('objects.agent.agent');
      },
      amdResult : ({ linked }) => {
        return linked('objects.amdResult');
      },
      assignee: ({ linked }) => {
        return linked('cases.assignee');
      },
      author: ({ linked }) => {
        return linked('cases.author');
      },
      cause : ({ linked }) => {
        return linked('objects.hangupCause');
      },
      closeReasonGroupsCase: ({ linked }) => {
        return linked('cases.reason');
      },
      contact : ({ linked }) => {
        return linked('vocabulary.contact');
      },
      contactGroup: ({ linked }) => {
        return linked('cases.group');
      },
      createdAtFrom : ({ linked }) => {
        return linked('reusable.from');
      },
      createdAtTo : ({ linked }) => {
        return linked('reusable.to');
      },
      direction : ({ linked }) => {
        return linked('calls.direction');
      },
      gateway : ({ linked }) => {
        return linked('vocabulary.gateway');
      },
      grantee : ({ linked }) => {
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
      priorityCase: ({ linked }) => {
        return linked('vocabulary.priority');
      },
      queue : ({ linked }) => {
        return linked('objects.queue.queue');
      },
      rated: ({ linked }) => {
        return linked('objects.rated');
      },
      ratedBy : ({ linked }) => {
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
      score : ({ linked }) => {
        return linked('webitelUI.auditForm.score');
      },
      serviceCase: ({ linked }) => {
        return linked('cases.service');
      },
      sla: ({ linked }) => {
        return linked('cases.appliedSLA');
      },
      slaCondition: ({ linked }) => {
        return linked('cases.appliedCondition');
      },
      sourceCase: ({ linked }) => {
        return linked('cases.source');
      },
      statusCase: ({ linked }) => {
        return linked('cases.status');
      },
      tag : ({ linked }) => {
        return linked('vocabulary.tag');
      },
      talkDuration: ({ linked }) => {
        return linked('objects.talkDuration');
      },
      team : ({ linked }) => {
        return linked('objects.team');
      },
      totalDuration: ({ linked }) => {
        return linked('objects.totalDuration');
      },
      user : ({ linked }) => {
        return linked('objects.user');
      },
      variable : ({ linked }) => {
        return linked('vocabulary.variables');
      },
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Произошла ошибка загрузки истории чата',
    markChatProcessed: 'Не удалось переместить чат в “Закрытые”',
  },
};
