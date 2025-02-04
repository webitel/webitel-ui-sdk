import { WtApplication } from './WtApplication';
/**
 * @augments WtApplication
 * represents ui sections in Crm WtApplication
 * without (!) any relation to WtObjects
 *
 * `WtApplication` prefix is duplicated intentionally
 * for IDE hint previews
 */
export const CrmSections = {
    Contacts: `${WtApplication.Crm}/contacts`,
    Cases: `${WtApplication.Crm}/cases`,
    // CONFIGURATION - LOOKUPS
    Slas: `${WtApplication.Crm}/slas`,
    ServiceCatalogs: `${WtApplication.Crm}/serviceCatalogs`,
    Priorities: `${WtApplication.Crm}/priorities`,
    Statuses: `${WtApplication.Crm}/statuses`,
    Sources: `${WtApplication.Crm}/sources`,
    CloseReasonGroups: `${WtApplication.Crm}/closeReasonGroups`,
    ContactGroups: `${WtApplication.Crm}/contactGroups`,
    CaseSources: `${WtApplication.Crm}/caseSources`,
    CustomLookups: `${WtApplication.Crm}/customLookups`,
};
