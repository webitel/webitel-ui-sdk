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
    comment: 'Komentarz',
    replace: 'Zamień',
    download: 'Pobierz',
    history: 'Historia',
    filter: ({ plural }) => plural(['Filtr', 'Filtry']),
    total: 'Suma',
    ok: 'Ok',
    object: 'Obiekt',
    save: 'Zapisz',
    saveAs: 'Zapisz jako',
    saved: 'Zapisano',
    send: 'Wyślij',
    start: 'Start',
    close: 'Zamknij',
    add: 'Dodaj',
    cancel: 'Anuluj',
    import: 'Import',
    export: 'Eksport',
    true: 'Prawda',
    title: 'Tytuł',
    position: 'Pozycja',
    delete: 'Usuń',
    search: 'Szukaj',
    open: 'Otwórz',
    name: 'Nazwa',
    expand: 'Rozwiń',
    collapse: 'Zwiń',
    generate: 'Generuj',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      uk: 'Українська',
      kz: 'Қазақ',
    },
    from: 'Od',
    to: 'Do',
    tts: 'Tekst na mowę',
    state: 'Stan',
    refresh: 'Odśwież',
    retry: 'Ponów',
    downloadAll: 'Pobierz wszystko',
    warning: 'Ostrzeżenie',
    doNotSave: 'Nie zapisuj',
    required: 'Wymagane',
    copy: 'Kopiuj',
    new: 'Nowy',
    createdAt: 'Utworzono',
    createdBy: 'Utworzone przez',
    modifiedAt: 'Zmodyfikowano',
    modifiedBy: 'Zmodyfikowane przez',
    general: 'Ogólne',
    generalInfo: 'Informacje ogólne',
    all: 'Wszystkie {entity}',
    upload: 'Wgraj',
    edit: 'Edytuj',
    back: 'Wstecz',
    step: 'Krok { count }',
    more: 'Więcej',
    read: 'Czytaj',
    create: 'Utwórz',
    update: 'Aktualizuj',
    draggable: 'Przeciągalne',
    unassigned: 'Nieprzypisane',
    showUnassigned: 'Pokaż nieprzypisane',
    group: 'Grupa',
    updatedBy: (/*{ named }*/) => {
      return 'Edytowane';
    },
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: 'Zastosuj',
    language: 'Język',
    voice: 'Głos',
    format: 'Format',
    text: 'Tekst',
    yes: 'Tak',
    no: 'Nie',
    description: 'Opis',
    login: 'Login',
    host: 'Host',
    time: 'Czas',
    channel: 'Kanał | Kanały',
    file: 'Plik | Akta',
    logout: 'Wyloguj',
    priority: 'Priorytet | Priorytety',
    color: 'Kolor',
    variables: 'Zmienna | Zmienne',
    type: 'Typ',
    tag: 'Tag | Tagi',
    output: 'Wyjście | Wyjścia',
    values: 'Wartość | Wartości',
    keys: 'Klucz | Klucze',
    duration: 'Czas trwania',
    reset: 'Reset',
    errors: 'Błąd | Błędy',
    labels: 'Etykieta | Etykiety',
    permissions: 'Uprawnienie | Uprawnienia',
    options: 'Opcja | Opcje',
    emails: 'Email | Emaile',
    phones: 'Telefon | Telefony',
    messaging: 'Wiadomości',
    emptyResultSearch: 'Twoje wyszukiwanie nie przyniosło rezultatów',
    contact: 'Kontakt | Kontakty',
    column: 'Kolumna | Kolumny',
    notification: 'Powiadomienie | Powiadomienia',
    screencast: 'Nagranie ekranu',
  },
  // date-related texts
  date: {
    sec: 'Sek',
    timezone: 'Strefa czasowa | Strefy czasowe',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Zarządzane przez operacje',
    RbAC: 'Zarządzane przez rekordy',
    operations: 'Operacje',
    rbacDefault: 'Domyślny dostęp oparty na rekordach',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Zabronione',
      [AccessMode.ALLOW]: 'Zezwól',
      [AccessMode.MANAGE]: 'Zezwól z delegowaniem',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Zespół | Zespoły',
    supervisor: 'Supervisor | Supervisorzy',
    auditor: 'Audytor | Audytorzy',
    region: 'Region | Regiony',
    communicationType: 'Typ komunikacji | Typy komunikacji',
    grantee: 'Uprawniony | Uprawnieni',
    grantor: 'Udzielający | Udzielający',
    role: 'Rola | Role',
    user: 'Użytkownik | Użytkownicy',
    list: 'Lista | Listy',
    contact: 'Kontakt | Kontakty',
    case: 'Sprawa | Sprawy',
    calendar: 'Kalendarz | Kalendarze',
    direction: 'Kierunek',
    gateway: 'Bramka | Bramki',
    hangupCause: 'Przyczyna rozłączenia',
    hasOption: 'Ma opcję',
    hasRecording: 'Nagrywanie',
    amdResult: 'Wynik AMD',
    ratedBy: 'Ocenione przez',
    talkDuration: 'Czas rozmowy',
    totalDuration: 'Całkowity czas',
    transcription: 'Transkrypcja',
    attachment: 'Załącznik | Załączniki',
    owner: 'Właściciel | Właściciele',
    customization: {
      customization: 'Dostosowanie | Dostosowania',
    },
    customLookup: {
      customLookup: 'Dostosowanie | Dostosowania',
    },
    queue: {
      queue: 'Kolejka | Kolejki',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Kolejka przychodząca',
        [QueueType.OFFLINE_QUEUE]: 'Kolejka offline',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Kolejka IVR wychodząca',
        [QueueType.PREDICTIVE_DIALER]: 'Dialer predykcyjny',
        [QueueType.PROGRESSIVE_DIALER]: 'Dialer progresywny',
        [QueueType.PREVIEW_DIALER]: 'Dialer podglądowy',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Kolejka czatu',
        [QueueType.INBOUND_JOB_QUEUE]: 'Kolejka zadań przychodzących',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Kolejka zadań wychodzących',
      },
    },
    agent: {
      agent: 'Agent | Agenci',
      status: {
        [AgentStatus.Online]: 'Online',
        [AgentStatus.Pause]: 'Pauza',
        [AgentStatus.Offline]: 'Offline',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Przerwa',
      },
    },
    flow: {
      name: 'Schemat przepływu | Schematy przepływu',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Czat',
        [EngineRoutingSchemaType.Voice]: 'Głos',
        [EngineRoutingSchemaType.Service]: 'Usługa',
        [EngineRoutingSchemaType.Processing]: 'Formularze',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Bot Telegram',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Aplikacja Telegram',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Czat webowy',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Niestandardowa bramka czatu',
    },
    quickReplies: {
      quickReplies: 'Szybka odpowiedź | Szybkie odpowiedzi',
      quickRepliesEmpty: 'Nie ma jeszcze szybkich odpowiedzi',
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Oczekiwanie',
      [ChannelState.Distribute]: 'Dystrybucja',
      [ChannelState.Offering]: 'Oferowanie',
      [ChannelState.Answered]: 'Odebrane',
      [ChannelState.Active]: 'Aktywne',
      [ChannelState.Bridged]: 'Połączone',
      [ChannelState.Hold]: 'Wstrzymane',
      [ChannelState.Missed]: 'Nieodebrane',
      [snakeToCamel(ChannelState.WrapTime)]: 'Podsumowanie',
      [ChannelState.Processing]: 'Przetwarzanie',
      [ChannelState.Transfer]: 'Transfer',
    },
    type: {
      [ChannelType.Call]: 'Połączenie',
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Czat',
      [ChannelType.Job]: 'Zadanie',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Przychodzące',
      [CallDirection.Outbound]: 'Wychodzące',
    },
  },
  cases: {
    status: 'Status',
    source: 'Źródło',
    author: 'Autor',
    reporter: 'Zgłaszający',
    impacted: 'Dotknięty',
    assignee: 'Przypisany',
    groupPerformers: 'Grupa',
    reason: 'Powód | Powody',
    rating: 'Ocena',
    service: 'Usługa | Usługi',
    selectAService: 'Wybierz usługę',
    appliedSLA: 'Zastosowane SLA',
    appliedCondition: 'Zastosowany warunek',
    reactionTime: 'Czas reakcji',
    resolutionTime: 'Czas rozwiązania',
    actualReactionTime: 'Rzeczywisty czas reakcji',
    actualResolutionTime: 'Rzeczywisty czas rozwiązania',
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
            ': Dostosowania', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Panel Agenta' },
    [WebitelApplications.AUDIT]: {
      name: 'Audyt',
      sections: {
        [AuditorSections.Scorecards]: 'Karty wyników',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Kontakty',
        [CrmSections.Cases]: 'Sprawy',
        [CrmSections.Priorities]: 'Priorytety',
        [CrmSections.CloseReasonGroups]: 'Powody zamknięcia',
        [CrmSections.Statuses]: 'Statusy',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Katalogi usług',
        [CrmSections.Sources]: 'Źródła spraw',
        [CrmSections.ContactGroups]: 'Grupy kontaktów',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Historia połączeń' },
    [WebitelApplications.ANALYTICS]: { name: 'Narzędzie wizualizacji danych' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Panel Supervisora',
      sections: {
        [SupervisorSections.Queues]: 'Kolejki',
        [SupervisorSections.Agents]: 'Agenci',
        [SupervisorSections.ActiveCalls]: 'Aktywne połączenia',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Użytkownicy',
        [AdminSections.License]: 'Licencje',
        [AdminSections.Devices]: 'Urządzenia',
        [AdminSections.Flow]: 'Schematy przepływu',
        [AdminSections.Dialplan]: 'Plany wybierania',
        [AdminSections.Gateways]: 'Bramki',
        [AdminSections.Chatplan]: 'Plany czatu',
        [AdminSections.ChatGateways]: 'Bramki czatu',
        [AdminSections.Skills]: 'Umiejętności agenta',
        [AdminSections.Buckets]: 'Pojemniki',
        [AdminSections.Media]: 'Pliki mediów',
        [AdminSections.ShiftTemplates]: 'Szablony zmian',
        [AdminSections.PauseTemplates]: 'Szablony przerw',
        [AdminSections.WorkingConditions]: 'Warunki pracy',
        [AdminSections.Blacklist]: 'Listy',
        [AdminSections.Calendars]: 'Kalendarze',
        [AdminSections.Regions]: 'Lokalizacje',
        [AdminSections.Communications]: 'Typy komunikacji',
        [AdminSections.PauseCause]: 'Statusy agenta',
        [AdminSections.Agents]: 'Agenci',
        [AdminSections.Teams]: 'Zespoły',
        [AdminSections.Resources]: 'Zasoby',
        [AdminSections.ResourceGroups]: 'Grupy zasobów',
        [AdminSections.Queues]: 'Kolejki',
        [AdminSections.Storage]: 'Magazyn',
        [AdminSections.StoragePolicies]: 'Polityki magazynowania',
        [AdminSections.CognitiveProfiles]: 'Profile kognitywne',
        [AdminSections.EmailProfiles]: 'Profile email',
        [AdminSections.SingleSignOn]: 'Pojedyncze logowanie',
        [AdminSections.ImportCsv]: 'Import CSV z pliku',
        [AdminSections.Triggers]: 'Triggery',
        [AdminSections.Media]: 'Pliki mediów',
        [AdminSections.Roles]: 'Role',
        [AdminSections.Objects]: 'Obiekty',
        [AdminSections.Changelogs]: 'Dziennik zmian',
        [AdminSections.Configuration]: 'Konfiguracja',
        [AdminSections.GlobalVariables]: 'Zmienne globalne',
        [AdminSections.QuickReplies]: 'Szybkie odpowiedzi',
      },
    },
  },
  validation: {
    required: 'Pole jest wymagane',
    numeric: 'Powinno być numeryczne',
    email: 'Powinno wyglądać jak email',
    gatewayHostValidator: 'Powinno wyglądać jak IPv4 lub FQDN',
    sipAccountValidator: 'Powinno wyglądać jak konto SIP',
    ipValidator: 'Powinno wyglądać jak IPv4',
    macValidator: 'Powinno wyglądać jak MAC',
    minValue: ({ named }) => {
      let text = 'Wartość nie powinna być mniejsza niż';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Wartość nie powinna być większa niż';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = 'Długość nie powinna być mniejsza niż';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Długość nie powinna być większa niż';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Nieprawidłowe hasło',
    requiredArrayValue: 'Tablica nie powinna być pusta',
    url: 'Powinno wyglądać jak URL',
    websocketValidator: 'Powinno wyglądać jak URL WebSocket',
    isRegExpMatched: 'Hasło musi pasować do wyrażenia regularnego:',
    regExpValidator: 'To wyrażenie regularne jest nieprawidłowe',
    domainValidator: 'Nieprawidłowa domena',
    decimalValidator:
      'Precyzja dziesiętna nie powinna być większa niż { count } miejsc',
    latinWithNumber:
      'Kod musi zawierać tylko litery (A-Z, a-z) i cyfry (0-9) oraz musi zaczynać się od litery',
    integer: 'Pole powinno zawierać tylko liczby całkowite',
    nameAlreadyInUse: 'Ta nazwa jest już używana',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Szukaj',
      settingsHint: 'Tryb wyszukiwania',
      variableSearchHint: 'Format zapytania: "klucz=wartość"',
    },
    timepicker: {
      day: 'Dzień:',
      hour: 'Godzina:',
      min: 'Min:',
      sec: 'Sek:',
    },
    datetimepicker: {
      lastHour: 'Ostatnia godzina',
      lastDay: 'Ostatni dzień',
    },
    pagination: {
      sizeText: 'Wierszy na stronę:',
      prev: 'Poprzednia',
      next: 'Następna',
    },
    appNavigator: {
      title: 'Aplikacje Webitel',
      admin: 'Admin',
      agent: 'Agent',
      supervisor: 'Supervisor',
      audit: 'Audyt',
      history: 'Historia',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Konto',
      docs: 'Dokumentacja',
      settings: 'Ustawienia',
      logout: 'Wyloguj',
      buildVersion: 'Wersja kompilacji',
    },
    tableActions: {
      filterReset: 'Zresetuj filtry',
      columnSelect: 'Wybierz kolumny',
      refreshTable: 'Odśwież tabelę',
      expandFilters: 'Rozwiń filtry',
    },
    tableColumnSelect: {
      title: 'Wybierz widoczne kolumny',
    },
    statusSelect: {
      online: 'Online',
      pause: 'Pauza',
      offline: 'Offline',
      breakOut: 'Przerwa',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Wybierz kolumny',
        [IconAction.VARIABLES]: 'Wybierz kolumny zmiennych',
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
          return `${linked('reusable.save')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.APPLY_PRESET]: ({ linked }) => {
          return `${linked('vocabulary.apply')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.ADD_CONTACT]: ({ linked }) => {
          return `${linked('reusable.add')} kontakty`;
        },
      },
    },
    errorPages: {
      goBack: 'Wróć',
      page403: {
        title: 'Brak dostępu',
        text: 'Przepraszamy, nie masz wystarczających uprawnień, aby zobaczyć tę stronę.',
      },
      page404: {
        title: 'Wygląda na to, że się zgubiłeś',
        text: 'Przepraszamy, nie możemy znaleźć strony, której szukasz.',
      },
    },
    copyAction: {
      copy: 'Kopiuj',
      copied: 'Skopiowano do schowka!',
    },
    auditForm: {
      question: 'Kryterium',
      option: 'Opcja | Opcje',
      score: 'Wynik | Wyniki',
      addQuestion: 'Dodaj kryterium',
      answerType: 'Typ odpowiedzi',
      type: {
        options: 'Opcje',
        score: 'Wynik',
      },
      clearSelection: 'Wyczyść wybór',
    },
    deleteConfirmationPopup: {
      title: 'Potwierdź usunięcie',
      askingAlert:
        'Czy na pewno chcesz usunąć {subject}? Tej akcji nie można cofnąć.',
      tableAskingAlert:
        'Czy na pewno chcesz\n usunąć {count} rekord? | Czy na pewno chcesz\n usunąć {count} rekordy?',
      deleteAll: 'WSZYSTKO',
    },
    dummy: {
      text: 'Nie ma jeszcze żadnych rekordów',
    },
    empty: {
      text: {
        empty: 'Nie ma jeszcze żadnych rekordów',
        filters: 'Niestety, żadne rekordy nie pasują do Twoich kryteriów',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Wybierz powód pauzy',
        min: 'Min',
        unlimited: 'Bez limitu',
      },
      statusSelectErrorPopup: {
        title: 'Uwaga',
        message:
          'Przekroczono limit agentów mogących wziąć pauzę. Pauza jest w tej chwili niedostępna.',
      },
    },
    saveFailedPopup: {
      title: 'Zapisywanie nie powiodło się',
      label: 'Coś poszło nie tak, spróbuj ponownie',
      exportToJson: 'Eksportuj do JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Dzisiaj',
        [RelativeDatetimeValue.ThisWeek]: 'Ten tydzień',
        [RelativeDatetimeValue.ThisMonth]: 'Ten miesiąc',
        [RelativeDatetimeValue.Custom]: 'Niestandardowy zakres dat',
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} ${linked(
          'reusable.filter',
        ).toLowerCase()}`;
      },
      filterName: ({ linked }) => {
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
      rated: 'Oceniony',
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
        preset: 'Preset | Presety',
        overwritePresetTitle: 'Preset o tej nazwie już istnieje.',
        overwritePresetText: 'Czy chcesz go zastąpić?',
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
      update: ({ named }) =>
        `${named('entity').toLowerCase()} został zaktualizowany`,
      create: ({ named }) => `${named('entity').toLowerCase()} został zapisany`,
      delete: ({ named }) => `${named('entity').toLowerCase()} został usunięty`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Wystąpił błąd podczas ładowania historii czatu',
    markChatProcessed: 'Nie udało się przenieść czatu do "Zamkniętych"',
  },
};
