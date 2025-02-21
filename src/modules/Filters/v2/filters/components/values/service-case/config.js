import ServiceCatalogsAPI from '../../../../../../../api/clients/caseServiceCatalogs/service-catalogs.js';
import ServicesAPI from '../../../../../../../api/clients/caseServices/services.js';

export const servicesSearchMethod = ServicesAPI.getLookup;
export const serviceCatalogsSearchMethod = ServiceCatalogsAPI.getLookup;
export const localePath = '';
