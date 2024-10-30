import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
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
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSections.QUEUES}`,
    },
    [SupervisorSections.AGENTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSections.AGENTS}`,
    },
    [SupervisorSections.ACTIVE_CALLS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSections.ACTIVE_CALLS}`,
    },
  },
  [WebitelApplications.ADMIN]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.ADMIN}.name`,
    [AdminSections.LICENSE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.LICENSE}`,
    },
    [AdminSections.USERS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.USERS}`,
    },
    [AdminSections.DEVICES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.DEVICES}`,
    },
    [AdminSections.FLOW]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.FLOW}`,
    },
    [AdminSections.DIALPLAN]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.DIALPLAN}`,
    },
    [AdminSections.GATEWAYS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.GATEWAYS}`,
    },
    [AdminSections.CHATPLAN]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CHATPLAN}`,
    },
    [AdminSections.CHAT_GATEWAYS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CHAT_GATEWAYS}`,
    },
    [AdminSections.SKILLS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.SKILLS}`,
    },
    [AdminSections.BUCKETS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.BUCKETS}`,
    },
    [AdminSections.BLACKLIST]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.BLACKLIST}`,
    },
    [AdminSections.REGIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.REGIONS}`,
    },
    [AdminSections.CALENDARS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CALENDARS}`,
    },
    [AdminSections.COMMUNICATIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.COMMUNICATIONS}`,
    },
    [AdminSections.PAUSE_CAUSE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.PAUSE_CAUSE}`,
    },
    [AdminSections.MEDIA]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.MEDIA}`,
    },
    [AdminSections.SHIFT_TEMPLATES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.SHIFT_TEMPLATES}`,
    },
    [AdminSections.PAUSE_TEMPLATES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.PAUSE_TEMPLATES}`,
    },
    [AdminSections.WORKING_CONDITIONS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.WORKING_CONDITIONS}`,
    },
    [AdminSections.AGENTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.AGENTS}`,
    },
    [AdminSections.TEAMS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.TEAMS}`,
    },
    [AdminSections.RESOURCES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.RESOURCES}`,
    },
    [AdminSections.RESOURCE_GROUPS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.RESOURCE_GROUPS}`,
    },
    [AdminSections.QUEUES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.QUEUES}`,
    },
    [AdminSections.STORAGE]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.STORAGE}`,
    },
    [AdminSections.COGNITIVE_PROFILES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.COGNITIVE_PROFILES}`,
    },
    [AdminSections.EMAIL_PROFILES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.EMAIL_PROFILES}`,
    },
    [AdminSections.SINGLE_SIGN_ON]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.SINGLE_SIGN_ON}`,
    },
    [AdminSections.IMPORT_CSV]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.IMPORT_CSV}`,
    },
    [AdminSections.TRIGGERS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.TRIGGERS}`,
    },
    [AdminSections.ROLES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.ROLES}`,
    },
    [AdminSections.OBJECTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.OBJECTS}`,
    },
    [AdminSections.CHANGELOGS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CHANGELOGS}`,
    },
    [AdminSections.CONFIGURATION]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CONFIGURATION}`,
    },
    [AdminSections.GLOBAL_VARIABLES]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.GLOBAL_VARIABLES}`,
    },
  },
  [WebitelApplications.AUDIT]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.AUDIT}.name`,
    [AuditorSections.SCORECARDS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.AUDIT}.sections.${AuditorSections.SCORECARDS}`,
    },
  },
  [WebitelApplications.CRM]: {
    _enabled: value,
    _locale: `WebitelApplications.${WebitelApplications.CRM}.name`,
    [CrmSections.CONTACTS]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSections.CONTACTS}`,
    },
    [CrmSections.SLA]: {
      _enabled: value,
      _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSections.SLA}`,
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
    this.access = access ? ApplicationsAccess.restore(access) : applicationsAccess(value);
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
