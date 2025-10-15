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
  reusable: {
    comment: 'Comentario',
    replace: 'Reemplazar',
    download: 'Descargar',
    history: 'Historial',
    filter: ({ plural }) => plural(['Filtro', 'Filtros']),
    total: 'Total',
    ok: 'Aceptar',
    object: 'Objeto',
    save: 'Guardar',
    saveAs: 'Guardar como',
    saved: 'Guardado',
    send: 'Enviar',
    start: 'Iniciar',
    close: 'Cerrar',
    add: 'Añadir',
    cancel: 'Cancelar',
    import: 'Importar',
    export: 'Exportar',
    true: 'Verdadero',
    title: 'Título',
    position: 'Posición',
    delete: 'Eliminar',
    search: 'Buscar',
    open: 'Abrir',
    name: 'Nombre',
    expand: 'Expandir',
    collapse: 'Colapsar',
    generate: 'Generar',
    from: 'Desde',
    to: 'Hasta',
    tts: 'Texto a Voz',
    state: 'Estado',
    refresh: 'Actualizar',
    retry: 'Reintentar',
    downloadAll: 'Descargar todo',
    warning: 'Advertencia',
    doNotSave: 'No guardar',
    required: 'Requerido',
    copy: 'Copiar',
    new: 'Nuevo',
    createdAt: 'Creado el',
    createdBy: 'Creado por',
    modifiedAt: 'Modificado el',
    modifiedBy: 'Modificado por',
    general: 'General',
    generalInfo: 'Información general',
    all: 'Todos {entity}',
    upload: 'Subir',
    edit: 'Editar',
    back: 'Atrás',
    step: 'Paso { count }',
    more: 'Más',
    read: 'Leer',
    create: 'Crear',
    update: 'Actualizar',
    draggable: 'Arrastrable',
    unassigned: 'Sin asignar',
    showUnassigned: 'Mostrar sin asignar',
    group: 'Grupo',
    dateTime: 'Fecha y hora',
    updatedBy: (/*{ named }*/) => {
      return 'Editado';
    },
  },
  vocabulary: {
    apply: 'Aplicar',
    language: 'Idioma',
    voice: 'Voz',
    format: 'Formato',
    text: 'Texto',
    yes: 'Sí',
    no: 'No',
    description: 'Descripción',
    login: 'Iniciar sesión',
    host: 'Host',
    time: 'Tiempo',
    channel: 'Canal | Canales',
    file: 'Archivo | Archivos',
    logout: 'Cerrar sesión',
    priority: 'Prioridad | Prioridades',
    color: 'Color',
    variables: 'Variable | Variables',
    type: 'Tipo',
    tag: 'Etiqueta | Etiquetas',
    output: 'Salida | Salidas',
    values: 'Valor | Valores',
    keys: 'Clave | Claves',
    duration: 'Duración',
    reset: 'Restablecer',
    errors: 'Error | Errores',
    labels: 'Etiqueta | Etiquetas',
    permissions: 'Permiso | Permisos',
    options: 'Opción | Opciones',
    emails: 'Correo electrónico | Correos electrónicos',
    phones: 'Teléfono | Teléfonos',
    messaging: 'Mensajería',
    emptyResultSearch: 'Tu búsqueda no produjo resultados',
    contact: 'Contacto | Contactos',
    column: 'Columna | Columnas',
    notification: 'Notificación | Notificaciones',
    screencast: 'Videotutorial de pantalla',
  },
  date: {
    sec: 'Seg',
    timezone: 'Zona horaria | Zonas horarias',
  },
  access: {
    ObAC: 'Administrado por operaciones',
    RbAC: 'Administrado por registros',
    operations: 'Operaciones',
    rbacDefault: 'Acceso basado en registros predeterminado',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Prohibido',
      [AccessMode.ALLOW]: 'Permitir',
      [AccessMode.MANAGE]: 'Permitir con delegación',
    },
  },
  objects: {
    team: 'Equipo | Equipos',
    supervisor: 'Supervisor | Supervisores',
    auditor: 'Auditor | Auditores',
    region: 'Región | Regiones',
    communicationType: 'Tipo de comunicación | Tipos de comunicación',
    grantee: 'Beneficiario | Beneficiarios',
    grantor: 'Otorgante | Otorgantes',
    role: 'Rol | Roles',
    user: 'Usuario | Usuarios',
    list: 'Lista | Listas',
    contact: 'Contacto | Contactos',
    case: 'Caso | Casos',
    customLookup: {
      customLookup: 'Búsqueda personalizada | Búsquedas personalizadas',
    },
    calendar: 'Calendario | Calendarios',
    direction: 'Dirección',
    gateway: 'Gateway | Gateways',
    hangupCause: 'Causa de colgado',
    hasOption: 'Tiene opción',
    hasRecording: 'Grabación',
    amdResult: 'Resultado AMD',
    ratedBy: 'Calificado por',
    talkDuration: 'Duración de la conversación',
    totalDuration: 'Duración total',
    transcription: 'Transcripción',
    attachment: 'Adjunto | Adjuntos',
    owner: 'Propietario | Propietarios',
    customization: {
      customization: 'Personalización | Personalizaciones',
    },
    queue: {
      queue: 'Cola | Colas',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Cola entrante',
        [QueueType.OFFLINE_QUEUE]: 'Cola sin conexión',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Cola IVR saliente',
        [QueueType.PREDICTIVE_DIALER]: 'Marcador predictivo',
        [QueueType.PROGRESSIVE_DIALER]: 'Marcador progresivo',
        [QueueType.PREVIEW_DIALER]: 'Marcador de vista previa',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Cola de chat',
        [QueueType.INBOUND_JOB_QUEUE]: 'Cola de tareas entrantes',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Cola de tareas salientes',
      },
    },
    agent: {
      agent: 'Agente | Agentes',
      status: {
        [AgentStatus.Online]: 'En línea',
        [AgentStatus.Pause]: 'Pausa',
        [AgentStatus.Offline]: 'Desconectado',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Descanso',
      },
    },
    flow: {
      name: 'Esquema de flujo | Esquemas de flujo',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Voz',
        [EngineRoutingSchemaType.Service]: 'Servicio',
        [EngineRoutingSchemaType.Processing]: 'Formularios',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Bot de Telegram',
      [ChatGatewayProvider.TELEGRAM_APP]: 'App de Telegram',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Chat web',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Gateway de chat personalizado',
    },
    quickReplies: {
      quickReplies: 'Respuesta rápida | Respuestas rápidas',
      quickRepliesEmpty: 'Aún no hay respuestas rápidas',
    },
    screenRecordings: 'Grabación de pantalla | Grabaciones de pantalla',
    screenshots: 'Captura de pantalla | Capturas de pantalla',
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'En espera',
      [ChannelState.Distribute]: 'Distribuyendo',
      [ChannelState.Offering]: 'Ofreciendo',
      [ChannelState.Answered]: 'Respondido',
      [ChannelState.Active]: 'Activo',
      [ChannelState.Bridged]: 'Puenteado',
      [ChannelState.Hold]: 'En espera',
      [ChannelState.Missed]: 'Perdido',
      [snakeToCamel(ChannelState.WrapTime)]: 'Tiempo de cierre',
      [ChannelState.Processing]: 'Procesando',
      [ChannelState.Transfer]: 'Transferir',
    },
    type: {
      [ChannelType.Call]: 'Llamada',
      [ChannelType.Email]: 'Correo electrónico',
      [ChannelType.Chat]: 'Chat',
      [ChannelType.Job]: 'Tarea',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Entrante',
      [CallDirection.Outbound]: 'Saliente',
    },
  },
  cases: {
    status: 'Estado',
    source: 'Fuente',
    author: 'Autor',
    reporter: 'Informante',
    impacted: 'Afectado',
    assignee: 'Asignado',
    groupPerformers: 'Grupo',
    reason: 'Razón | Razones',
    rating: 'Calificación',
    service: 'Servicio | Servicios',
    selectAService: 'Seleccionar un servicio',
    appliedSLA: 'SLA aplicado',
    appliedCondition: 'Condición aplicada',
    reactionTime: 'Tiempo de reacción',
    resolutionTime: 'Tiempo de resolución',
    actualReactionTime: 'Tiempo de reacción real',
    actualResolutionTime: 'Tiempo de resolución real',
  },
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
            ': Búsquedas personalizadas', // dont use linked: objects.customLookup.customLookup, coz "linked" doesnt support pluralization
        },
      },
    },
    [WebitelApplications.AGENT]: { name: 'Espacio de trabajo del agente' },
    [WebitelApplications.AUDIT]: {
      name: 'Auditoría',
      sections: {
        [AuditorSections.Scorecards]: 'Tarjetas de puntuación',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Contactos',
        [CrmSections.Cases]: 'Casos',
        [CrmSections.Priorities]: 'Prioridades',
        [CrmSections.CloseReasonGroups]: 'Razones de cierre',
        [CrmSections.Statuses]: 'Estados',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Catálogos de servicios',
        [CrmSections.Sources]: 'Fuentes de casos',
        [CrmSections.ContactGroups]: 'Grupos de contactos',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Historial de llamadas' },
    [WebitelApplications.ANALYTICS]: {
      name: 'Herramienta de visualización de datos',
    },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Espacio de trabajo del supervisor',
      sections: {
        [SupervisorSections.Queues]: 'Colas',
        [SupervisorSections.Agents]: 'Agentes',
        [SupervisorSections.ActiveCalls]: 'Llamadas activas',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Administrador',
      sections: {
        [AdminSections.Users]: 'Usuarios',
        [AdminSections.License]: 'Licencias',
        [AdminSections.Devices]: 'Dispositivos',
        [AdminSections.Flow]: 'Esquemas de flujo',
        [AdminSections.Dialplan]: 'Planes de marcación',
        [AdminSections.Gateways]: 'Gateways',
        [AdminSections.Chatplan]: 'Planes de chat',
        [AdminSections.ChatGateways]: 'Gateways de chat',
        [AdminSections.Skills]: 'Habilidades del agente',
        [AdminSections.Buckets]: 'Cubetas',
        [AdminSections.Media]: 'Archivos multimedia',
        [AdminSections.ShiftTemplates]: 'Plantillas de turno',
        [AdminSections.PauseTemplates]: 'Plantillas de pausa',
        [AdminSections.WorkingConditions]: 'Condiciones de trabajo',
        [AdminSections.Blacklist]: 'Listas',
        [AdminSections.Calendars]: 'Calendarios',
        [AdminSections.Regions]: 'Ubicaciones',
        [AdminSections.Communications]: 'Tipos de comunicación',
        [AdminSections.PauseCause]: 'Estados del agente',
        [AdminSections.Agents]: 'Agentes',
        [AdminSections.Teams]: 'Equipos',
        [AdminSections.Resources]: 'Recursos',
        [AdminSections.ResourceGroups]: 'Grupos de recursos',
        [AdminSections.Queues]: 'Colas',
        [AdminSections.Storage]: 'Almacenamiento',
        [AdminSections.StoragePolicies]: 'Políticas de almacenamiento',
        [AdminSections.CognitiveProfiles]: 'Perfiles cognitivos',
        [AdminSections.EmailProfiles]: 'Perfiles de correo electrónico',
        [AdminSections.SingleSignOn]: 'Inicio de sesión único',
        [AdminSections.ImportCsv]: 'Importaciones de CSV desde archivo',
        [AdminSections.Triggers]: 'Disparadores',
        [AdminSections.Media]: 'Archivos multimedia',
        [AdminSections.Roles]: 'Roles',
        [AdminSections.Objects]: 'Objetos',
        [AdminSections.Changelogs]: 'Registro de cambios',
        [AdminSections.Configuration]: 'Configuración',
        [AdminSections.GlobalVariables]: 'Variables globales',
        [AdminSections.QuickReplies]: 'Respuestas rápidas',
      },
    },
  },
  validation: {
    required: 'Campo requerido',
    numeric: 'Debe ser numérico',
    email: 'Debe parecer un correo electrónico',
    gatewayHostValidator: 'Debe parecer una IPv4 o FQDN',
    sipAccountValidator: 'Debe parecer una cuenta SIP',
    ipValidator: 'Debe parecer una IPv4',
    macValidator: 'Debe parecer una MAC',
    minValue: ({ named }) => {
      let text = 'El valor no debe ser menor que';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'El valor no debe ser mayor que';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = 'La longitud no debe ser menor que';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'La longitud no debe ser mayor que';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Contraseña incorrecta',
    requiredArrayValue: 'El arreglo no debe estar vacío',
    url: 'Debe parecer una URL',
    websocketValidator: 'Debe parecer una URL de WebSocket',
    isRegExpMatched: 'La contraseña debe coincidir con la expresión regular:',
    regExpValidator: 'Esta expresión regular no es válida',
    domainValidator: 'Dominio incorrecto',
    decimalValidator:
      'La precisión decimal no debe ser mayor a { count } lugares',
    latinWithNumber:
      'El código debe contener solo letras (A-Z, a-z) y números (0-9), y debe comenzar con una letra',
    integer: 'El campo debe contener solo números enteros',
    nameAlreadyInUse: 'Este nombre ya está en uso',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Buscar',
      settingsHint: 'Modo de búsqueda',
      variableSearchHint: 'Formato de consulta: "clave=valor"',
    },
    timepicker: {
      day: 'Día:',
      hour: 'Hora:',
      min: 'Min:',
      sec: 'Seg:',
    },
    datetimepicker: {
      lastHour: 'Última hora',
      lastDay: 'Último día',
    },
    pagination: {
      sizeText: 'Filas por página:',
      prev: 'Anterior',
      next: 'Siguiente',
    },
    appNavigator: {
      title: 'Aplicaciones Webitel',
      admin: 'Administrador',
      agent: 'Agente',
      supervisor: 'Supervisor',
      audit: 'Auditoría',
      history: 'Historial',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Cuenta',
      docs: 'Documentos',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      buildVersion: 'Versión de compilación',
    },
    tableActions: {
      filterReset: 'Restablecer filtros',
      columnSelect: 'Seleccionar columnas',
      refreshTable: 'Actualizar tabla',
      expandFilters: 'Expandir filtros',
    },
    tableColumnSelect: {
      title: 'Seleccionar columnas visibles',
    },
    statusSelect: {
      online: 'En línea',
      pause: 'Pausa',
      offline: 'Desconectado',
      breakOut: 'Descanso',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.DOWNLOAD_PDF]: 'Descargar PDF',
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Seleccionar columnas',
        [IconAction.VARIABLES]: 'Seleccionar columnas de variables',
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
          return `${linked('reusable.add')} contacts`;
        },
      },
    },
    errorPages: {
      goBack: 'Volver',
      page403: {
        title: 'Acceso denegado',
        text: 'Lo sentimos, no tienes suficientes privilegios para ver esta página.',
      },
      page404: {
        title: 'Parece que estás perdido',
        text: 'Lo sentimos, no podemos encontrar la página que deseas.',
      },
    },
    copyAction: {
      copy: 'Copiar',
      copied: '¡Copiado al portapapeles!',
    },
    auditForm: {
      question: 'Criterio',
      option: 'Opción | Opciones',
      score: 'Puntuación | Puntuaciones',
      addQuestion: 'Añadir criterio',
      answerType: 'Tipo de respuesta',
      type: {
        options: 'Opciones',
        score: 'Puntuación',
      },
      clearSelection: 'Limpiar selección',
    },
    deleteConfirmationPopup: {
      title: 'Confirmar eliminación',
      askingAlert:
        '¿Estás seguro de que quieres eliminar {subject}? Esta acción no se puede deshacer.',
      tableAskingAlert:
        '¿Estás seguro de que quieres\n eliminar {count} registro? | ¿Estás seguro de que quieres\n eliminar {count} registros?',
      deleteAll: 'TODO',
    },
    dummy: {
      text: 'Aún no hay registros',
    },
    empty: {
      text: {
        empty: 'Aún no hay registros',
        filters:
          'Desafortunadamente, ningún registro coincide con tus criterios',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Seleccionar una causa de pausa',
        min: 'Min',
        unlimited: 'Ilimitado',
      },
      statusSelectErrorPopup: {
        title: 'Atención',
        message:
          'Se ha excedido el límite de agentes para tomar una pausa. La pausa no está disponible en este momento.',
      },
    },
    pdfGeneration: {
      generationStarted: 'Su archivo PDF se está creando…'
    },
    saveFailedPopup: {
      title: 'Error al guardar',
      label: 'Algo salió mal, por favor intenta de nuevo',
      exportToJson: 'Exportar a JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Hoy',
        [RelativeDatetimeValue.ThisWeek]: 'Esta semana',
        [RelativeDatetimeValue.ThisMonth]: 'Este mes',
        [RelativeDatetimeValue.Custom]: 'Rango de fechas personalizado',
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
      rated: 'Calificado',
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
        preset: 'Preset | Presets',
        overwritePresetTitle: 'Ya existe un preset con este nombre.',
        overwritePresetText: '¿Quieres reemplazarlo?',
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
        `El ${named('entity').toLowerCase()} fue actualizado`,
      create: ({ named }) => `El ${named('entity').toLowerCase()} fue guardado`,
      delete: ({ named }) =>
        `El ${named('entity').toLowerCase()} fue eliminado`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Hubo un error al cargar el historial del chat',
    markChatProcessed: 'Error al mover el chat a "Cerrado"',
  },
};
