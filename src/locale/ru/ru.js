import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType, EngineRoutingSchemaType,
} from 'webitel-sdk';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import AdminSections from '../../enums/WebitelApplications/AdminSections.enum';
import SupervisorSections from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum';
import AuditorSections
  from '../../enums/WebitelApplications/AuditorSections.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

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
    expand: 'Развернуть',
    collapse: 'Свернуть',
    generate: 'Сгенерировать',
    lang: {
      en: 'English',
      ru: 'Русский',
      ua: 'Українська',
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
    required: 'Обязательный',
    copy: 'Скопировать',
  },
  vocabulary: {
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
    channel: 'Канал',
    file: 'Файл',
    logout: 'Выйти',
    priority: 'Приоритет',
    variables: 'Переменная | Переменные',
    type: 'Тип',
    tag: 'Тег | Теги',
    output: 'Выход | Выходы',
    values: 'Значение | Значения',
    keys: 'Ключ | Ключи',
    duration: 'Длительность',
    reset: 'Сбросить',
    errors: 'Ошибка | Ошибки',
  },
  // date-related texts
  date: {
    sec: 'Сек',
    timezone: 'Часовая зона | Часовые зоны',
  },
  // describes Webitel system entities
  objects: {
    team: 'Команда | Команды',
    supervisor: 'Супервизор | Супервизоры',
    auditor: 'Аудитор | Аудиторы',
    region: 'Регион | Регионы',
    queue: {
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
      status: {
        [AgentStatus.Online]: 'Онлайн',
        [AgentStatus.Pause]: 'Пауза',
        [AgentStatus.Offline]: 'Оффлайн',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Принудительный перерыв',
      },
    },
    flow: {
      type: {
        [EngineRoutingSchemaType.Chat]: 'Чат',
        [EngineRoutingSchemaType.Voice]: 'Голос',
        [EngineRoutingSchemaType.Service]: 'Сервис',
        [EngineRoutingSchemaType.Processing]: 'Обработка',
      },
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
    },
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
      section: {
        [AuditorSections.SCORECARDS]: 'Анкеты',
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
        [AdminSections.COGNITIVE_PROFILES]: 'Голосовые профили',
        [AdminSections.EMAIL_PROFILES]: 'Email профили',
        [AdminSections.IMPORT_CSV]: 'Импорт данных из CSV файлов',
        [AdminSections.TRIGGERS]: 'Триггеры',
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
    copyAction: {
      copy: 'Копировать',
      copied: 'Скопировано!',
    },
    auditForm: {
      question: 'Вопрос',
      option: 'Опция | Опции',
      score: 'Оценка | Оценки',
      addQuestion: 'Добавить вопрос',
      type: {
        options: 'Опции',
        score: 'Оценка',
      },
    },
  },
};
