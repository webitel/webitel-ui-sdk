import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import mapKeys from 'lodash/mapKeys';

import {
  AdminSections,
  AuditorSections,
  CrmSections,
  SupervisorSections,
  WtApplication,
} from '../../../enums';
import { camelToKebab, kebabToCamel } from '../../../scripts';

const applicationsAccess = (value = true) => {
  const access = {
    [WtApplication.Agent]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Agent}.name`,
    },
    [WtApplication.History]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.History}.name`,
    },
    [WtApplication.Analytics]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Analytics}.name`,
    },
    [WtApplication.Supervisor]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Supervisor}.name`,
      [SupervisorSections.Queues]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Supervisor}.sections.${SupervisorSections.Queues}`,
      },
      [SupervisorSections.Agents]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Supervisor}.sections.${SupervisorSections.Agents}`,
      },
      [SupervisorSections.ActiveCalls]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Supervisor}.sections.${SupervisorSections.ActiveCalls}`,
      },
    },
    [WtApplication.Admin]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Admin}.name`,
      [AdminSections.License]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.License}`,
      },
      [AdminSections.Users]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Users}`,
      },
      [AdminSections.Devices]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Devices}`,
      },
      [AdminSections.Flow]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Flow}`,
      },
      [AdminSections.Dialplan]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Dialplan}`,
      },
      [AdminSections.Gateways]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Gateways}`,
      },
      [AdminSections.Chatplan]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Chatplan}`,
      },
      [AdminSections.ChatGateways]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.ChatGateways}`,
      },
      [AdminSections.Skills]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Skills}`,
      },
      [AdminSections.Buckets]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Buckets}`,
      },
      [AdminSections.Blacklist]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Blacklist}`,
      },
      [AdminSections.Regions]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Regions}`,
      },
      [AdminSections.Calendars]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Calendars}`,
      },
      [AdminSections.Communications]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Communications}`,
      },
      [AdminSections.PauseCause]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.PauseCause}`,
      },
      [AdminSections.Media]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Media}`,
      },
      [AdminSections.ShiftTemplates]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.ShiftTemplates}`,
      },
      [AdminSections.PauseTemplates]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.PauseTemplates}`,
      },
      [AdminSections.WorkingConditions]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.WorkingConditions}`,
      },
      [AdminSections.Agents]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Agents}`,
      },
      [AdminSections.Teams]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Teams}`,
      },
      [AdminSections.Resources]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Resources}`,
      },
      [AdminSections.ResourceGroups]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.ResourceGroups}`,
      },
      [AdminSections.Queues]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Queues}`,
      },
      [AdminSections.Storage]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Storage}`,
      },
      [AdminSections.StoragePolicies]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.StoragePolicies}`,
      },
      [AdminSections.CognitiveProfiles]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.CognitiveProfiles}`,
      },
      [AdminSections.EmailProfiles]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.EmailProfiles}`,
      },
      [AdminSections.SingleSignOn]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.SingleSignOn}`,
      },
      [AdminSections.ImportCsv]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.ImportCsv}`,
      },
      [AdminSections.Triggers]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Triggers}`,
      },
      [AdminSections.Roles]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Roles}`,
      },
      [AdminSections.Objects]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Objects}`,
      },
      [AdminSections.Changelogs]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Changelogs}`,
      },
      [AdminSections.Configuration]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.Configuration}`,
      },
      [AdminSections.GlobalVariables]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Admin}.sections.${AdminSections.GlobalVariables}`,
      },
    },
    [WtApplication.Audit]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Audit}.name`,
      [AuditorSections.Scorecards]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Audit}.sections.${AuditorSections.Scorecards}`,
      },
    },
    [WtApplication.Crm]: {
      _enabled: value,
      _locale: `WebitelApplications.${WtApplication.Crm}.name`,
      [CrmSections.Contacts]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.Contacts}`,
      },
      [CrmSections.Slas]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.Slas}`,
      },
      [CrmSections.Sources]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.Sources}`,
      },
      [CrmSections.ServiceCatalogs]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.ServiceCatalogs}`,
      },
      [CrmSections.CloseReasonGroups]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.CloseReasonGroups}`,
      },
      [CrmSections.ContactGroups]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.ContactGroups}`,
      },
      [CrmSections.Priorities]: {
        _enabled: value,
        _locale: `WebitelApplications.${WtApplication.Crm}.sections.${CrmSections.Priorities}`,
      },
    },
  };

  return access;
};

/**
 */
export default class ApplicationsAccess {
  // value param could be passed to set same value for all options
  constructor({ access, value } = { value: true }) {
    /* if access, deeply merge with falsy values schema
     if no access, "not configured => full permissions" */
    this.access = access
      ? ApplicationsAccess.restore(access)
      : applicationsAccess(value);
  }

  // minify schema before storing on backend
  static minify(access) {
    const rmEmptyKeys = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (!obj[key] || key === '_locale') delete obj[key];
        if (typeof obj[key] === 'object') {
          rmEmptyKeys(obj[key]);

          if (!Object.keys(obj[key]).length) delete obj[key];
        }
      });
      return obj;
    };
    return rmEmptyKeys(deepCopy(access));
  }

  // restore minified schema from API response
  static restore(access) {
    /*
     * pre-ts style enums -> ts style enums:
     * cognitive-profiles -> admin/cognitiveProfiles
     * */
    const makeCompat = (access) => {
      const compatAccess = deepCopy(access);
      Object.values(WtApplication).forEach((app) => {
        /* access object is divided by apps that wrapping their sections */
        compatAccess[app] = mapKeys(compatAccess[app], (value, key) => {
          if (key.startsWith('_')) return key;
          return `${app}/${kebabToCamel(key)}`; /* cognitive-profiles -> admin/cognitiveProfiles */
        });
      });

      return compatAccess;
    };

    return deepmerge(applicationsAccess(false), makeCompat(access));
  }

  getAccess() {
    return this.access;
  }
}
