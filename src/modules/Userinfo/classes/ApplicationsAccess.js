import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import { AdjunctTypesAPI as CustomTypesAPI } from '@webitel/api-services/api';

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
  },
  [WebitelApplications.HISTORY]: {
    _enabled: value,
  },
  [WebitelApplications.ANALYTICS]: {
    _enabled: value,
  },
  [WebitelApplications.SUPERVISOR]: {
    _enabled: value,
    [SupervisorSections.QUEUES]: {
      _enabled: value,
    },
    [SupervisorSections.AGENTS]: {
      _enabled: value,
    },
    [SupervisorSections.ACTIVE_CALLS]: {
      _enabled: value,
    },
  },
  [WebitelApplications.ADMIN]: {
    _enabled: value,
    [AdminSections.LICENSE]: {
      _enabled: value,
    },
    [AdminSections.USERS]: {
      _enabled: value,
    },
    [AdminSections.DEVICES]: {
      _enabled: value,
    },
    [AdminSections.FLOW]: {
      _enabled: value,
    },
    [AdminSections.DIALPLAN]: {
      _enabled: value,
    },
    [AdminSections.GATEWAYS]: {
      _enabled: value,
    },
    [AdminSections.CHATPLAN]: {
      _enabled: value,
    },
    [AdminSections.CHAT_GATEWAYS]: {
      _enabled: value,
    },
    [AdminSections.SKILLS]: {
      _enabled: value,
    },
    [AdminSections.BUCKETS]: {
      _enabled: value,
    },
    [AdminSections.BLACKLIST]: {
      _enabled: value,
    },
    [AdminSections.REGIONS]: {
      _enabled: value,
    },
    [AdminSections.CALENDARS]: {
      _enabled: value,
    },
    [AdminSections.COMMUNICATIONS]: {
      _enabled: value,
    },
    [AdminSections.PAUSE_CAUSE]: {
      _enabled: value,
    },
    [AdminSections.MEDIA]: {
      _enabled: value,
    },
    [AdminSections.SHIFT_TEMPLATES]: {
      _enabled: value,
    },
    [AdminSections.PAUSE_TEMPLATES]: {
      _enabled: value,
    },
    [AdminSections.WORKING_CONDITIONS]: {
      _enabled: value,
    },
    [AdminSections.QUICK_REPLIES]: {
      _enabled: value,
    },
    [AdminSections.AGENTS]: {
      _enabled: value,
    },
    [AdminSections.TEAMS]: {
      _enabled: value,
    },
    [AdminSections.RESOURCES]: {
      _enabled: value,
    },
    [AdminSections.RESOURCE_GROUPS]: {
      _enabled: value,
    },
    [AdminSections.QUEUES]: {
      _enabled: value,
    },
    [AdminSections.STORAGE]: {
      _enabled: value,
    },
    [AdminSections.STORAGE_POLICIES]: {
      _enabled: value,
    },
    [AdminSections.COGNITIVE_PROFILES]: {
      _enabled: value,
    },
    [AdminSections.EMAIL_PROFILES]: {
      _enabled: value,
    },
    [AdminSections.SINGLE_SIGN_ON]: {
      _enabled: value,
    },
    [AdminSections.IMPORT_CSV]: {
      _enabled: value,
    },
    [AdminSections.TRIGGERS]: {
      _enabled: value,
    },
    [AdminSections.ROLES]: {
      _enabled: value,
    },
    [AdminSections.OBJECTS]: {
      _enabled: value,
    },
    [AdminSections.CHANGELOGS]: {
      _enabled: value,
    },
    [AdminSections.CONFIGURATION]: {
      _enabled: value,
    },
    [AdminSections.GLOBAL_VARIABLES]: {
      _enabled: value,
    },
  },
  [WebitelApplications.AUDIT]: {
    _enabled: value,
    [AuditorSections.SCORECARDS]: {
      _enabled: value,
    },
  },
  [WebitelApplications.CRM]: {
    _enabled: value,
    [CrmSections.CONTACTS]: {
      _enabled: value,
    },
    [CrmSections.CASES]: {
      _enabled: value,
    },
    [CrmSections.SLAS]: {
      _enabled: value,
    },
    [CrmSections.SOURCES]: {
      _enabled: value,
    },
    [CrmSections.SERVICE_CATALOGS]: {
      _enabled: value,
    },
    [CrmSections.CLOSE_REASON_GROUPS]: {
      _enabled: value,
    },
    [CrmSections.CONTACT_GROUPS]: {
      _enabled: value,
    },
    [CrmSections.PRIORITIES]: {
      _enabled: value,
    },
    [CrmSections.STATUSES]: {
      _enabled: value,
    },
    [CrmSectionsNew.CasesExtensions]: {
      _enabled: value,
    },
    [CrmSectionsNew.ContactsExtensions]: {
      _enabled: value,
    },
    [CrmSectionsNew.CustomLookups]: {
      _enabled: value,
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
  static async restore(access) {
    const coreSectionsAccess = deepmerge(applicationsAccess(false), access);
    const fullAccess = await ApplicationsAccess.appendCustomTypesToUiSectionsVisibilityAccess(coreSectionsAccess);
    return fullAccess;
  }

  static async appendCustomTypesToUiSectionsVisibilityAccess(access) {
    const targetApp = WebitelApplications.CRM;
    const { items: customTypes } = await CustomTypesAPI.getList({ size: -1 }, { silent: true });

    const customTypesAccess = customTypes
      .filter((customType) => !access[targetApp]?.[customType.repo]) // already explicitly declared in access
      .reduce((acc, customType) => {
        const enabledValue = access[targetApp]?.[customType.repo]?._enabled;
        const implicitlyEnabled = enabledValue === undefined;

        acc[customType.repo] = {
          name: customType.repo,
          displayName: customType.name,
          enabled: enabledValue || implicitlyEnabled,
        };

        return acc;
      }, {});

    access[targetApp] = {
      ...access[targetApp],
      ...customTypesAccess,
    };

    return access;
  }

  getAccess() {
    return this.access;
  }
}
