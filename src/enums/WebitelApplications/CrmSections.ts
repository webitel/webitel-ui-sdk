export const CrmSections = {
  Contacts: 'contacts',
  Cases: 'cases',

  // CONFIGURATION - LOOKUPS
  Slas: 'slas',
  ServiceCatalogs: 'service-catalogs',
  Priorities: 'priorities',
  Statuses: 'statuses',
  Sources: 'sources',
  CloseReasonGroups: 'close-reason-groups',
  ContactGroups: 'contact-groups',
  CaseSources: 'case-sources',
  CustomLookups: 'custom-lookups',
} as const;

export type CrmSections = (typeof CrmSections)[keyof typeof CrmSections];
