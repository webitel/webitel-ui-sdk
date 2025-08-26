import { AdjunctTypesAPI as CustomTypesAPI } from '@webitel/api-services/api';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';

import {
  AdminSections as AdminSectionsNew,
  AuditorSections as AuditorSectionsNew,
  CrmSections as CrmSectionsNew,
  SupervisorSections as SupervisorSectionsNew,
} from '../../../enums';
import AdminSections from '../../../enums/WebitelApplications/AdminSections.enum.js';
import AuditorSections from '../../../enums/WebitelApplications/AuditorSections.enum.js';
import CrmSections from '../../../enums/WebitelApplications/CrmSections.enum.js';
import SupervisorSections from '../../../enums/WebitelApplications/SupervisorSections.enum.js';
import WebitelApplications from '../../../enums/WebitelApplications/WebitelApplications.enum.js';

const applicationsAccess = (value = true) => ({
  [WebitelApplications.AGENT]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.AGENT}.name`,
  },
  [WebitelApplications.HISTORY]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.HISTORY}.name`,
  },
  [WebitelApplications.ANALYTICS]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.ANALYTICS}.name`,
  },
  [WebitelApplications.SUPERVISOR]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.name`,
    [SupervisorSections.QUEUES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.Queues}`,
    },
    [SupervisorSections.AGENTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.Agents}`,
    },
    [SupervisorSections.ACTIVE_CALLS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.ActiveCalls}`,
    },
  },
  [WebitelApplications.ADMIN]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.ADMIN}.name`,
    [AdminSections.LICENSE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.License}`,
    },
    [AdminSections.USERS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Users}`,
    },
    [AdminSections.DEVICES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Devices}`,
    },
    [AdminSections.FLOW]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Flow}`,
    },
    [AdminSections.DIALPLAN]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Dialplan}`,
    },
    [AdminSections.GATEWAYS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Gateways}`,
    },
    [AdminSections.CHATPLAN]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Chatplan}`,
    },
    [AdminSections.CHAT_GATEWAYS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ChatGateways}`,
    },
    [AdminSections.SKILLS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Skills}`,
    },
    [AdminSections.BUCKETS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Buckets}`,
    },
    [AdminSections.BLACKLIST]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Blacklist}`,
    },
    [AdminSections.REGIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Regions}`,
    },
    [AdminSections.CALENDARS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Calendars}`,
    },
    [AdminSections.COMMUNICATIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Communications}`,
    },
    [AdminSections.PAUSE_CAUSE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.PauseCause}`,
    },
    [AdminSections.MEDIA]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Media}`,
    },
    [AdminSections.SHIFT_TEMPLATES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ShiftTemplates}`,
    },
    [AdminSections.PAUSE_TEMPLATES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.PauseTemplates}`,
    },
    [AdminSections.WORKING_CONDITIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.WorkingConditions}`,
    },
    [AdminSections.QUICK_REPLIES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.QuickReplies}`,
    },
    [AdminSections.AGENTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Agents}`,
    },
    [AdminSections.TEAMS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Teams}`,
    },
    [AdminSections.RESOURCES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Resources}`,
    },
    [AdminSections.RESOURCE_GROUPS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ResourceGroups}`,
    },
    [AdminSections.QUEUES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Queues}`,
    },
    [AdminSections.STORAGE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Storage}`,
    },
    [AdminSections.STORAGE_POLICIES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.StoragePolicies}`,
    },
    [AdminSections.COGNITIVE_PROFILES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.CognitiveProfiles}`,
    },
    [AdminSections.EMAIL_PROFILES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.EmailProfiles}`,
    },
    [AdminSections.SINGLE_SIGN_ON]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.SingleSignOn}`,
    },
    [AdminSections.IMPORT_CSV]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ImportCsv}`,
    },
    [AdminSections.TRIGGERS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Triggers}`,
    },
    [AdminSections.ROLES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Roles}`,
    },
    [AdminSections.OBJECTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Objects}`,
    },
    [AdminSections.CHANGELOGS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Changelogs}`,
    },
    [AdminSections.CONFIGURATION]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Configuration}`,
    },
    [AdminSections.GLOBAL_VARIABLES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.GlobalVariables}`,
    },
  },
  [WebitelApplications.AUDIT]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.AUDIT}.name`,
    [AuditorSections.SCORECARDS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.AUDIT}.sections.${AuditorSectionsNew.Scorecards}`,
    },
  },
  [WebitelApplications.CRM]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.CRM}.name`,
    [CrmSections.CONTACTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Contacts}`,
    },
    [CrmSections.CASES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Cases}`,
    },
    [CrmSections.SLAS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Slas}`,
    },
    [CrmSections.SOURCES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Sources}`,
    },
    [CrmSections.SERVICE_CATALOGS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ServiceCatalogs}`,
    },
    [CrmSections.CLOSE_REASON_GROUPS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CloseReasonGroups}`,
    },
    [CrmSections.CONTACT_GROUPS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ContactGroups}`,
    },
    [CrmSections.PRIORITIES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Priorities}`,
    },
    [CrmSections.STATUSES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Statuses}`,
    },
    [CrmSectionsNew.CasesExtensions]: {
      _enabled: value,
      _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CasesExtensions}`,
    },
    [CrmSectionsNew.ContactsExtensions]: {
      _enabled: value,
      _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ContactsExtensions}`,
    },
    [CrmSectionsNew.CustomLookups]: {
      _enabled: value,
      _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CustomLookups}`,
    },
  },
});

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

  // minify schema for API sending
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
    return deepmerge(applicationsAccess(false), access);
    // return deepmerge(access, applicationsAccess(false));
  }

  getAccess() {
    return this.access;
  }
}
