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
    comment: 'Comentariu',
    replace: 'Înlocuiește',
    download: 'Descarcă',
    history: 'Istoric',
    filter: ({ plural }) => plural(['Filtru', 'Filtre']),
    total: 'Total',
    ok: 'Ok',
    object: 'Obiect',
    save: 'Salvează',
    saveAs: 'Salvează ca',
    saved: 'Salvat',
    send: 'Trimite',
    start: 'Start',
    close: 'Închide',
    add: 'Adaugă',
    cancel: 'Anulează',
    import: 'Import',
    export: 'Export',
    true: 'Adevărat',
    title: 'Titlu',
    position: 'Poziție',
    delete: 'Șterge',
    search: 'Caută',
    open: 'Deschide',
    name: 'Nume',
    expand: 'Extinde',
    collapse: 'Restrânge',
    generate: 'Generează',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      uk: 'Українська',
      kz: 'Қазақ',
    },
    from: 'De la',
    to: 'Până la',
    tts: 'Text-to-Speech',
    state: 'Stare',
    refresh: 'Reîmprospătează',
    retry: 'Reîncearcă',
    downloadAll: 'Descarcă tot',
    warning: 'Avertisment',
    doNotSave: 'Nu salva',
    required: 'Obligatoriu',
    copy: 'Copiază',
    new: 'Nou',
    createdAt: 'Creat la',
    createdBy: 'Creat de',
    modifiedAt: 'Modificat la',
    modifiedBy: 'Modificat de',
    general: 'General',
    generalInfo: 'Informații generale',
    all: 'Toate {entity}',
    upload: 'Încarcă',
    edit: 'Editează',
    back: 'Înapoi',
    step: 'Pasul { count }',
    more: 'Mai mult',
    read: 'Citește',
    create: 'Creează',
    update: 'Actualizează',
    draggable: 'Tragabil',
    unassigned: 'Neatribuit',
    showUnassigned: 'Arată neatribuite',
    group: 'Grup',
    updatedBy: (/*{ named }*/) => {
      return 'Editat';
    },
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: 'Aplică',
    language: 'Limbă',
    voice: 'Voce',
    format: 'Format',
    text: 'Text',
    yes: 'Da',
    no: 'Nu',
    description: 'Descriere',
    login: 'Autentificare',
    host: 'Gazdă',
    time: 'Timp',
    channel: 'Canal | Canale',
    file: 'Fișier | Fișiere',
    logout: 'Deconectare',
    priority: 'Prioritate | Priorități',
    color: 'Culoare',
    variables: 'Variabilă | Variabile',
    type: 'Tip',
    tag: 'Etichetă | Etichete',
    output: 'Ieșire | Ieșiri',
    values: 'Valoare | Valori',
    keys: 'Cheie | Chei',
    duration: 'Durată',
    reset: 'Resetează',
    errors: 'Eroare | Erori',
    labels: 'Etichetă | Etichete',
    permissions: 'Permisiune | Permisiuni',
    options: 'Opțiune | Opțiuni',
    emails: 'Email | Email-uri',
    phones: 'Telefon | Telefoane',
    messaging: 'Mesagerie',
    emptyResultSearch: 'Căutarea nu a returnat niciun rezultat',
    contact: 'Contact | Contacte',
    column: 'Coloană | Coloane',
    notification: 'Notificare | Notificări',
    screencast: 'Înregistrare ecran',
  },
  // date-related texts
  date: {
    sec: 'Sec',
    timezone: 'Fus orar | Fuse orare',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Gestionat de operațiuni',
    RbAC: 'Gestionat de înregistrări',
    operations: 'Operațiuni',
    rbacDefault: 'Acces implicit bazat pe înregistrări',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Interzis',
      [AccessMode.ALLOW]: 'Permite',
      [AccessMode.MANAGE]: 'Permite cu delegare',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Echipă | Echipe',
    supervisor: 'Supervizor | Supervizori',
    auditor: 'Auditor | Auditori',
    region: 'Regiune | Regiuni',
    communicationType: 'Tip comunicare | Tipuri comunicare',
    grantee: 'Beneficiar | Beneficiari',
    grantor: 'Acordant | Acordanți',
    role: 'Rol | Roluri',
    user: 'Utilizator | Utilizatori',
    list: 'Listă | Liste',
    contact: 'Contact | Contacte',
    case: 'Caz | Cazuri',
    calendar: 'Calendar | Calendare',
    direction: 'Direcție',
    gateway: 'Gateway | Gateway-uri',
    hangupCause: 'Cauză închidere',
    hasOption: 'Are opțiune',
    hasRecording: 'Înregistrare',
    amdResult: 'Rezultat AMD',
    ratedBy: 'Evaluat de',
    talkDuration: 'Durată convorbire',
    totalDuration: 'Durată totală',
    transcription: 'Transcriere',
    attachment: 'Atașament | Atașamente',
    owner: 'Proprietar | Proprietari',
    customization: {
      customization: 'Personalizare | Personalizări',
    },
    customLookup: {
      customLookup: 'Personalizare | Personalizări',
    },
    queue: {
      queue: 'Coadă | Cozi',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Coadă intrare',
        [QueueType.OFFLINE_QUEUE]: 'Coadă offline',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Coadă IVR ieșire',
        [QueueType.PREDICTIVE_DIALER]: 'Dialer predictiv',
        [QueueType.PROGRESSIVE_DIALER]: 'Dialer progresiv',
        [QueueType.PREVIEW_DIALER]: 'Dialer previzualizare',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Coadă chat',
        [QueueType.INBOUND_JOB_QUEUE]: 'Coadă sarcini intrare',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Coadă sarcini ieșire',
      },
    },
    agent: {
      agent: 'Agent | Agenți',
      status: {
        [AgentStatus.Online]: 'Online',
        [AgentStatus.Pause]: 'Pauză',
        [AgentStatus.Offline]: 'Offline',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Pauză mare',
      },
    },
    flow: {
      name: 'Schemă flux | Scheme flux',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Voce',
        [EngineRoutingSchemaType.Service]: 'Serviciu',
        [EngineRoutingSchemaType.Processing]: 'Formulare',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Telegram Bot',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Aplicație Telegram',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Web chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Gateway Chat Personalizat',
    },
    quickReplies: {
      quickReplies: 'Răspuns rapid | Răspunsuri rapide',
      quickRepliesEmpty: 'Nu există încă răspunsuri rapide',
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'În așteptare',
      [ChannelState.Distribute]: 'Distribuie',
      [ChannelState.Offering]: 'Se oferă',
      [ChannelState.Answered]: 'Răspuns',
      [ChannelState.Active]: 'Activ',
      [ChannelState.Bridged]: 'Conectat',
      [ChannelState.Hold]: 'În așteptare',
      [ChannelState.Missed]: 'Pierdut',
      [snakeToCamel(ChannelState.WrapTime)]: 'Timp de încheiere',
      [ChannelState.Processing]: 'Se procesează',
      [ChannelState.Transfer]: 'Transfer',
    },
    type: {
      [ChannelType.Call]: 'Apel',
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Chat',
      [ChannelType.Job]: 'Sarcină',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Intrare',
      [CallDirection.Outbound]: 'Ieșire',
    },
  },
  cases: {
    status: 'Status',
    source: 'Sursă',
    author: 'Autor',
    reporter: 'Raportor',
    impacted: 'Afectat',
    assignee: 'Responsabil',
    groupPerformers: 'Grup',
    reason: 'Motiv | Motive',
    rating: 'Evaluare',
    service: 'Serviciu | Servicii',
    selectAService: 'Selectează un serviciu',
    appliedSLA: 'SLA aplicat',
    appliedCondition: 'Condiție aplicată',
    reactionTime: 'Timp de reacție',
    resolutionTime: 'Timp de rezolvare',
    actualReactionTime: 'Timp real de reacție',
    actualResolutionTime: 'Timp real de rezolvare',
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
            'Personalizări', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Spațiu Agent' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      sections: {
        [AuditorSections.Scorecards]: 'Fișe evaluare',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Contacte',
        [CrmSections.Cases]: 'Cazuri',
        [CrmSections.Priorities]: 'Priorități',
        [CrmSections.CloseReasonGroups]: 'Motive închidere',
        [CrmSections.Statuses]: 'Statusuri',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Cataloage servicii',
        [CrmSections.Sources]: 'Surse cazuri',
        [CrmSections.ContactGroups]: 'Grupuri contacte',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Istoric apeluri' },
    [WebitelApplications.ANALYTICS]: { name: 'Instrument vizualizare date' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Spațiu Supervizor',
      sections: {
        [SupervisorSections.Queues]: 'Cozi',
        [SupervisorSections.Agents]: 'Agenți',
        [SupervisorSections.ActiveCalls]: 'Apeluri active',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.Users]: 'Utilizatori',
        [AdminSections.License]: 'Licențe',
        [AdminSections.Devices]: 'Dispozitive',
        [AdminSections.Flow]: 'Scheme flux',
        [AdminSections.Dialplan]: 'Planuri apelare',
        [AdminSections.Gateways]: 'Gateway-uri',
        [AdminSections.Chatplan]: 'Planuri chat',
        [AdminSections.ChatGateways]: 'Gateway-uri chat',
        [AdminSections.Skills]: 'Abilități agent',
        [AdminSections.Buckets]: 'Bucket-uri',
        [AdminSections.Media]: 'Fișiere media',
        [AdminSections.ShiftTemplates]: 'Șabloane tură',
        [AdminSections.PauseTemplates]: 'Șabloane pauză',
        [AdminSections.WorkingConditions]: 'Condiții lucru',
        [AdminSections.Blacklist]: 'Liste',
        [AdminSections.Calendars]: 'Calendare',
        [AdminSections.Regions]: 'Locații',
        [AdminSections.Communications]: 'Tipuri comunicare',
        [AdminSections.PauseCause]: 'Statusuri agent',
        [AdminSections.Agents]: 'Agenți',
        [AdminSections.Teams]: 'Echipe',
        [AdminSections.Resources]: 'Resurse',
        [AdminSections.ResourceGroups]: 'Grupuri resurse',
        [AdminSections.Queues]: 'Cozi',
        [AdminSections.Storage]: 'Stocare',
        [AdminSections.StoragePolicies]: 'Politici stocare',
        [AdminSections.CognitiveProfiles]: 'Profile cognitive',
        [AdminSections.EmailProfiles]: 'Profile email',
        [AdminSections.SingleSignOn]: 'Autentificare unică',
        [AdminSections.ImportCsv]: 'Import CSV din fișier',
        [AdminSections.Triggers]: 'Declanșatori',
        [AdminSections.Media]: 'Fișiere media',
        [AdminSections.Roles]: 'Roluri',
        [AdminSections.Objects]: 'Obiecte',
        [AdminSections.Changelogs]: 'Jurnal modificări',
        [AdminSections.Configuration]: 'Configurație',
        [AdminSections.GlobalVariables]: 'Variabile globale',
        [AdminSections.QuickReplies]: 'Răspunsuri rapide',
      },
    },
  },
  validation: {
    required: 'Câmpul este obligatoriu',
    numeric: 'Trebuie să fie numeric',
    email: 'Trebuie să arate ca un email',
    gatewayHostValidator: 'Trebuie să arate ca un IPv4 sau FQDN',
    sipAccountValidator: 'Trebuie să arate ca un cont SIP',
    ipValidator: 'Trebuie să arate ca un IPv4',
    macValidator: 'Trebuie să arate ca un MAC',
    minValue: ({ named }) => {
      let text = 'Valoarea nu trebuie să fie mai mică decât';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Valoarea nu trebuie să fie mai mare decât';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = 'Lungimea nu trebuie să fie mai mică de';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Lungimea nu trebuie să fie mai mare de';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Parolă incorectă',
    requiredArrayValue: 'Matricea nu trebuie să fie goală',
    url: 'Trebuie să arate ca un URL',
    websocketValidator: 'Trebuie să arate ca un URL WebSocket',
    isRegExpMatched: 'Parola trebuie să se potrivească cu expresia regulată:',
    regExpValidator: 'Această expresie regulată nu este validă',
    domainValidator: 'Domeniu incorect',
    decimalValidator:
      'Precizia zecimală nu trebuie să fie mai mare de { count } zecimale',
    latinWithNumber:
      'Codul trebuie să conțină doar litere (A-Z, a-z) și cifre (0-9), și trebuie să înceapă cu o literă',
    integer: 'Câmpul trebuie să conțină doar numere întregi',
    nameAlreadyInUse: 'Acest nume este deja folosit',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Caută',
      settingsHint: 'Mod căutare',
      variableSearchHint: 'Format interogare: "cheie=valoare"',
    },
    timepicker: {
      day: 'Zi:',
      hour: 'Oră:',
      min: 'Min:',
      sec: 'Sec:',
    },
    datetimepicker: {
      lastHour: 'Ultima oră',
      lastDay: 'Ultima zi',
    },
    pagination: {
      sizeText: 'Rânduri pe pagină:',
      prev: 'Anterior',
      next: 'Următor',
    },
    appNavigator: {
      title: 'Aplicații Webitel',
      admin: 'Admin',
      agent: 'Agent',
      supervisor: 'Supervizor',
      audit: 'Audit',
      history: 'Istoric',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Cont',
      docs: 'Documentație',
      settings: 'Setări',
      logout: 'Deconectare',
      buildVersion: 'Versiune build',
    },
    tableActions: {
      filterReset: 'Resetează filtrele',
      columnSelect: 'Selectează coloanele',
      refreshTable: 'Reîmprospătează tabelul',
      expandFilters: 'Extinde filtrele',
    },
    tableColumnSelect: {
      title: 'Selectează coloanele vizibile',
    },
    statusSelect: {
      online: 'Online',
      pause: 'Pauză',
      offline: 'Offline',
      breakOut: 'Pauză mare',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Selectează coloanele',
        [IconAction.VARIABLES]: 'Selectează coloanele variabile',
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
          return `${linked('reusable.add')} contacte`;
        },
      },
    },
    errorPages: {
      goBack: 'Înapoi',
      page403: {
        title: 'Acces interzis',
        text: 'Ne pare rău, nu aveți suficiente privilegii pentru a vedea această pagină.',
      },
      page404: {
        title: 'Se pare că v-ați pierdut',
        text: 'Ne pare rău, nu putem găsi pagina dorită.',
      },
    },
    copyAction: {
      copy: 'Copiază',
      copied: 'Copiat în clipboard!',
    },
    auditForm: {
      question: 'Criteriu',
      option: 'Opțiune | Opțiuni',
      score: 'Scor | Scoruri',
      addQuestion: 'Adaugă criteriu',
      answerType: 'Tip răspuns',
      type: {
        options: 'Opțiuni',
        score: 'Scor',
      },
      clearSelection: 'Șterge selecția',
    },
    deleteConfirmationPopup: {
      title: 'Confirmă ștergerea',
      askingAlert:
        'Sigur doriți să ștergeți {subject}? Această acțiune nu poate fi anulată.',
      tableAskingAlert:
        'Sigur doriți să ștergeți {count} înregistrare? | Sigur doriți să ștergeți {count} înregistrări?',
      deleteAll: 'TOATE',
    },
    dummy: {
      text: 'Nu există încă înregistrări',
    },
    empty: {
      text: {
        empty: 'Nu există încă înregistrări',
        filters:
          'Din păcate, nicio înregistrare nu se potrivește criteriilor dvs.',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Selectează un motiv de pauză',
        min: 'Min',
        unlimited: 'Nelimitat',
      },
      statusSelectErrorPopup: {
        title: 'Atenție',
        message:
          'Limita pentru agenții care pot lua pauză a fost depășită. Pauza nu este disponibilă momentan.',
      },
    },
    saveFailedPopup: {
      title: 'Salvarea a eșuat',
      label: 'Ceva nu a mers bine, vă rugăm să încercați din nou',
      exportToJson: 'Exportă în JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Astăzi',
        [RelativeDatetimeValue.ThisWeek]: 'Această săptămână',
        [RelativeDatetimeValue.ThisMonth]: 'Această lună',
        [RelativeDatetimeValue.Custom]: 'Interval personalizat',
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} un ${linked(
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
      rated: 'Evaluat',
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
        preset: 'Șablon | Șabloane',
        overwritePresetTitle: 'Un șablon cu acest nume există deja.',
        overwritePresetText: 'Doriți să-l înlocuiți?',
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
        `${named('entity').toLowerCase()} a fost actualizat`,
      create: ({ named }) => `${named('entity').toLowerCase()} a fost salvat`,
      delete: ({ named }) => `${named('entity').toLowerCase()} a fost șters`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'A apărut o eroare la încărcarea istoricului chat-ului',
    markChatProcessed: 'Nu s-a putut muta chat-ul în "Închis"',
  },
};
