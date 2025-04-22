import ServiceCatalogsAPI from '@webitel/ui-sdk/api/clients/caseServiceCatalogs/serviceCatalogs';
import ServicesAPI from '@webitel/ui-sdk/api/clients/caseServices/services';

export const searchMethod = ServiceCatalogsAPI.getList;
export const servicesSearchMethod = ServicesAPI.getLookup;
