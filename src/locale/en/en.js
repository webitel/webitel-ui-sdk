export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    total: 'Total',
    ok: 'Ok',
    save: 'Save',
    close: 'Close',
    add: 'Add',
    cancel: 'Cancel',
    import: 'Import',
    export: 'Export',
    true: 'True',
  },
  // date-related texts
  date: {
    sec: 'Sec',
  },
  // describes Webitel system entities
  objects: {
    team: 'Team | Teams',
    supervisor: 'Supervisor | Supervisors',
    auditor: 'Auditor | Auditors',
    region: 'Region | Regions',
  },
  validation: {
    required: 'Field is required',
    numeric: 'Should be numeric',
    email: 'Should look like email',
    gatewayHostValidator: 'Should look like IPv4 or FQDN',
    sipAccountValidator: 'Should look like SIP account',
    ipValidator: 'Should look like IPv4',
    macValidator: 'Should look like MAC',
    minValue: 'Value should be not less than',
    maxValue: 'Value should be not much than',
    sameAs: 'Incorrect password',
    requiredArrayValue: 'Array should not be empty',
  },
  webitelUI: {
    timepicker: {
      hour: 'Hour:',
      min: 'Min:',
      sec: 'Sec:',
    },
    datetimepicker: {
      lastHour: 'Last hour',
      lastDay: 'Last day',
    },
    pagination: {
      sizeText: 'Rows per page:',
      prev: 'Previous',
      next: 'Next',
    },
    appNavigator: {
      title: 'Webitel applications',
      admin: 'Admin',
      agent: 'Agent Workspace',
      supervisor: 'Supervisor Workspace',
      audit: 'Audit',
      history: 'Call History',
      grafana: 'Grafana',
    },
    headerActions: {
      account: 'Account',
      docs: 'Docs',
      settings: 'Settings',
      logout: 'Logout',
      buildVersion: 'Build version',
    },
    tableActions: {
      filterReset: 'Reset filters',
      columnSelect: 'Select columns',
      refreshTable: 'Refresh table',
      expandFilters: 'Expand filters',
    },
    tableColumnSelect: {
      title: 'Select visible columns',
    },
    statusSelect: {
      online: 'Online',
      pause: 'Pause',
      offline: 'Offline',
      breakOut: 'Break Out',
    },
    table: {
      tableCells: {
        deleteActionHint: 'Delete',
        editActionHint: 'Edit',
      },
    },
  },
};
