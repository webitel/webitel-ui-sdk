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
import SupervisorSections
  from '../../enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications
  from '../../enums/WebitelApplications/WebitelApplications.enum';
import { snakeToCamel } from '../../scripts/caseConverters';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Total',
    ok: 'Ok',
    save: 'Guardar',
    close: 'Cerrar',
    add: 'Agregar',
    cancel: 'Cancelar',
    import: 'Importación',
    export: 'Exportación',
    true: 'Sí',
    delete: 'Eliminar',
    search: 'Búsqueda',
    open: 'Abrir',
    name: 'Nombre',
    expand: 'Expandir',
    collapse: 'Reducir',
    generate: 'Generar',
    lang: {
      en: 'English',
      es: 'Español',
      ru: 'Русский',
      ua: 'Українська',
    },
    from: 'De',
    to: 'Hasta',
    tts: 'Text-to-Speech',
    state: 'Estado',
    refresh: 'Actualizar',
    retry: 'Repetir',
    reset: 'Reiniciar',
    downloadAll: 'Descargar todo',
    warning: 'Aviso',
    doNotSave: 'No guardar',
  },
  vocabulary: {
    language: 'Idioma',
    voice: 'Voz',
    format: 'Formáto',
    text: 'Texto',
    yes: 'Sí',
    no: 'No',
    description: 'Descripción',
    login: 'Acceso',
    host: 'Host',
    time: 'Tiempo',
    channel: 'Canal',
    file: 'Archivo',
    logout: 'Salir',
    priority: 'Prioridad',
    variables: 'Intercambiable | Intercambiables',
    type: 'Tipo',
    tag: 'Etiqueta | Etiquetas',
    output: 'Salida | Salidas',
    values: 'Valor | Valores',
    keys: 'Clave | Claves',
    duration: 'Duración',
    errors: 'Error | Errores',
  },
  // date-related texts
  date: {
    sec: 'Seg',
    timezone: 'Zona horaria | Zonas horarias',
  },
  // describes Webitel system entities
  objects: {
    team: 'Equipo | Equipos',
    supervisor: 'Supervisor | Supervisores',
    auditor: 'Auditor | Auditores',
    region: 'Región | Regiones',
    queue: {
      type: {
        [QueueType.INBOUND_QUEUE]: 'Cola entrante',
        [QueueType.OFFLINE_QUEUE]: 'Cola fuera de línea',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'IVR saliente',
        [QueueType.PREDICTIVE_DIALER]: 'Marcador predictivo',
        [QueueType.PROGRESSIVE_DIALER]: 'Marcador progresivo',
        [QueueType.PREVIEW_DIALER]: 'Vista previa de llamadas',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Cola de chats',
        [QueueType.INBOUND_JOB_QUEUE]: 'Cola de tareas entrante',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Cola de tareas saliente',
      },
    },
    agent: {
      status: {
        [AgentStatus.Online]: 'En línea',
        [AgentStatus.Pause]: 'Pausa',
        [AgentStatus.Offline]: 'Desconectado',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Pausa forzada',
      },
    },
    flow: {
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Voz',
        [EngineRoutingSchemaType.Service]: 'Servicio',
        [EngineRoutingSchemaType.Processing]: 'Procesamiento',
      },
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Espera',
      [ChannelState.Distribute]: 'Reservado',
      [ChannelState.Offering]: 'Distribución',
      [ChannelState.Answered]: 'Respondida',
      [ChannelState.Active]: 'Activo',
      [ChannelState.Bridged]: 'Conectado',
      [ChannelState.Hold]: 'Espera',
      [ChannelState.Missed]: 'Perdida',
      [snakeToCamel(ChannelState.WrapTime)]: 'Post-procesamiento',
      [ChannelState.Processing]: 'Procesamiento',
      [ChannelState.Transfer]: 'Transferencia',
    },
    type: {
      [ChannelType.Call]: 'Llamada',
      [ChannelType.Email]: 'Correo electrónico',
      [ChannelType.Chat]: 'Chat',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Entrante | Entrantes',
      [CallDirection.Outbound]: 'Saliente | Salientes',
    },
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: { name: 'Agent Workspace' },
    [WebitelApplications.AUDIT]: {
      name: 'Audit',
      section: {
        [AuditorSections.SCORECARDS]: 'Formularios',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Call History' },
    [WebitelApplications.ANALYTICS]: { name: 'Data Visualisation Tool' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Supervisor Workspace',
      sections: {
        [SupervisorSections.QUEUES]: 'Colas',
        [SupervisorSections.AGENTS]: 'Operadores',
        [SupervisorSections.ACTIVE_CALLS]: 'Llamadas activas',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Admin',
      sections: {
        [AdminSections.USERS]: 'Usuarios',
        [AdminSections.LICENSE]: 'Licencias',
        [AdminSections.DEVICES]: 'Dispositivos',
        [AdminSections.FLOW]: 'Esquemas',
        [AdminSections.DIALPLAN]: 'Reglas de la marcación saliente',
        [AdminSections.GATEWAYS]: 'Puertas de enlace',
        [AdminSections.CHATPLAN]: 'Reglas de enrutamiento de mensajes de texto',
        [AdminSections.CHAT_GATEWAYS]: 'Puertas de enlace de texto',
        [AdminSections.SKILLS]: 'Habilidades del operador',
        [AdminSections.BUCKETS]: 'Cestas',
        [AdminSections.MEDIA]: 'Archivos multimedia',
        [AdminSections.BLACKLIST]: 'Listas de llamadas',
        [AdminSections.CALENDARS]: 'Calendarios',
        [AdminSections.REGIONS]: 'Ubicación',
        [AdminSections.COMMUNICATIONS]: 'Tipos de comunicación',
        [AdminSections.PAUSE_CAUSE]: 'Estados del operador',
        [AdminSections.AGENTS]: 'Operadores',
        [AdminSections.TEAMS]: 'Equipos',
        [AdminSections.RESOURCES]: 'Recursos',
        [AdminSections.RESOURCE_GROUPS]: 'Grupos de recursos',
        [AdminSections.QUEUES]: 'Colas',
        [AdminSections.STORAGE]: 'Almacenamiento',
        [AdminSections.COGNITIVE_PROFILES]: 'Perfiles de voz',
        [AdminSections.EMAIL_PROFILES]: 'Perfiles de correo electrónico',
        [AdminSections.IMPORT_CSV]: 'Importación de datos de archivos CSV',
        [AdminSections.TRIGGERS]: 'Activadores',
        [AdminSections.ROLES]: 'Funciones',
        [AdminSections.OBJECTS]: 'Secciones',
      },
    },
  },
  validation: {
    required: 'Campo requerido',
    numeric: 'Valores numéricos requeridos',
    email: 'Correo electrónico requerido',
    gatewayHostValidator: 'IPv4 o FQDN requerido',
    sipAccountValidator: 'Cuenta SIP requerida',
    ipValidator: 'IPv4 requerido',
    macValidator: 'dirección MAC requerida',
    minValue: 'El valor no debe ser menor que',
    maxValue: 'El valor no debe ser mayor que',
    sameAs: 'Contraseña no válida',
    requiredArrayValue: 'El campo no debe estar vacío',
    minLength: 'El número de caracteres no debe ser menor que',
    url: 'Se debe ingresar una URL válida',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Búsqueda',
    },
    timepicker: {
      hour: 'Hora:',
      min: 'Min:',
      sec: 'Seg:',
    },
    datetimepicker: {
      lastHour: 'Última hora',
      lastDay: 'Último día',
    },
    pagination: {
      sizeText: 'Registros en la página:',
      prev: 'Atrás',
      next: 'Adelante',
    },
    appNavigator: {
      title: 'Aplicaciones de Webitel',
      admin: 'Admin',
      agent: 'Agent Workspace',
      supervisor: 'Supervisor Workspace',
      audit: 'Audit',
      history: 'Call History',
      grafana: 'Grafana',
    },
    headerActions: {
      account: 'Cuenta',
      docs: 'Documentación',
      settings: 'Ajustes',
      logout: 'Salir',
      buildVersion: 'Versión de compilación',
    },
    tableActions: {
      filterReset: 'Reiniciar filtros',
      columnSelect: 'Agregar columnas',
      refreshTable: 'Actualizar',
      expandFilters: 'Expandir filtros',
    },
    tableColumnSelect: {
      title: 'Seleccione columnas mostradas',
    },
    statusSelect: {
      online: 'En línea',
      pause: 'Pausa',
      offline: 'Desconectado',
      breakOut: 'Pausa forzada',
    },
    iconAction: {
      deleteActionHint: 'Eliminar',
      editActionHint: 'Editar',
      addActionHint: 'Agregar',
      historyActionHint: 'History',
      downloadActionHint: 'Descargar',
      deleteAllActionHint: 'Eliminar todos los elementos',
      deleteSelectedActionHint: 'Eliminar {count} elementos seleccionados',
    },
    errorPages: {
      goBack: 'Regresar',
      page403: {
        title: 'Sin acceso',
        text: 'Lo sentimos, no tiene suficientes derechos de acceso para ver esta página',
      },
      page404: {
        title: 'Parece que se ha perdido',
        text: 'Lo sentimos, no podemos encontrar lo que está buscando',
      },
    },
    copyAction: {
      copy: 'Copiar',
      copied: '¡Copiado!',
    },
  },
};
