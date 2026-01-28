import { AdjunctTypesAPI as CustomTypesAPI } from '@webitel/api-services/api';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';

import {
	AdminSections as AdminSectionsNew,
	AuditorSections as AuditorSectionsNew,
	CrmSections as CrmSectionsNew,
	SupervisorSections as SupervisorSectionsNew,
} from '../../../enums';
import { WtApplication } from '../../../enums';

const applicationsAccess = (value = true) => ({
	[WtApplication.Agent]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Agent}.name`,
	},
	[WtApplication.History]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.History}.name`,
	},
	[WtApplication.Analytics]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Analytics}.name`,
	},
	[WtApplication.Supervisor]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Supervisor}.name`,
		[SupervisorSections.Queues]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Supervisor}.sections.${SupervisorSectionsNew.Queues}`,
		},
		[SupervisorSections.Agents]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Supervisor}.sections.${SupervisorSectionsNew.Agents}`,
		},
		[SupervisorSections.ActiveCalls]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Supervisor}.sections.${SupervisorSectionsNew.ActiveCalls}`,
		},
	},
	[WtApplication.Admin]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Admin}.name`,
		[AdminSections.License]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.License}`,
		},
		[AdminSections.Users]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Users}`,
		},
		[AdminSections.Devices]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Devices}`,
		},
		[AdminSections.Flow]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Flow}`,
		},
		[AdminSections.Dialplan]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Dialplan}`,
		},
		[AdminSections.Gateways]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Gateways}`,
		},
		[AdminSections.Chatplan]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Chatplan}`,
		},
		[AdminSections.ChatGateways]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.ChatGateways}`,
		},
		[AdminSections.Skills]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Skills}`,
		},
		[AdminSections.Buckets]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Buckets}`,
		},
		[AdminSections.Blacklist]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Blacklist}`,
		},
		[AdminSections.Regions]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Regions}`,
		},
		[AdminSections.Calendars]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Calendars}`,
		},
		[AdminSections.Communications]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Communications}`,
		},
		[AdminSections.PauseCause]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.PauseCause}`,
		},
		[AdminSections.Media]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Media}`,
		},
		[AdminSections.ShiftTemplates]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.ShiftTemplates}`,
		},
		[AdminSections.PauseTemplates]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.PauseTemplates}`,
		},
		[AdminSections.WorkingConditions]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.WorkingConditions}`,
		},
		[AdminSections.QuickReplies]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.QuickReplies}`,
		},
		[AdminSections.Agents]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Agents}`,
		},
		[AdminSections.Teams]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Teams}`,
		},
		[AdminSections.Resources]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Resources}`,
		},
		[AdminSections.ResourceGroups]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.ResourceGroups}`,
		},
		[AdminSections.Queues]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Queues}`,
		},
		[AdminSections.Storage]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Storage}`,
		},
		[AdminSections.StoragePolicies]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.StoragePolicies}`,
		},
		[AdminSections.CognitiveProfiles]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.CognitiveProfiles}`,
		},
		[AdminSections.EmailProfiles]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.EmailProfiles}`,
		},
		[AdminSections.SingleSignOn]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.SingleSignOn}`,
		},
		[AdminSections.ImportCsv]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.ImportCsv}`,
		},
		[AdminSections.Triggers]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Triggers}`,
		},
		[AdminSections.Roles]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Roles}`,
		},
		[AdminSections.Objects]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Objects}`,
		},
		[AdminSections.Changelogs]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Changelogs}`,
		},
		[AdminSections.Configuration]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.Configuration}`,
		},
		[AdminSections.GlobalVariables]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSectionsNew.GlobalVariables}`,
		},
	},
	[WtApplication.Audit]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Audit}.name`,
		[AuditorSections.Scorecards]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Audit}.sections.${AuditorSectionsNew.Scorecards}`,
		},
	},
	[WtApplication.Crm]: {
		_enabled: value,
		_locale: `WtApplication.${WtApplication.Crm}.name`,
		[CrmSections.Contacts]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Contacts}`,
		},
		[CrmSections.Cases]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Cases}`,
		},
		[CrmSections.Slas]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Slas}`,
		},
		[CrmSections.Sources]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Sources}`,
		},
		[CrmSections.ServiceCatalogs]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.ServiceCatalogs}`,
		},
		[CrmSections.CloseReasonGroups]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.CloseReasonGroups}`,
		},
		[CrmSections.ContactGroups]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.ContactGroups}`,
		},
		[CrmSections.Priorities]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Priorities}`,
		},
		[CrmSections.Statuses]: {
			_enabled: value,
			_locale: `WtApplication.${WtApplication.Crm}.sections.${CrmSectionsNew.Statuses}`,
		},
		[CrmSectionsNew.CasesExtensions]: {
			_enabled: value,
			_locale: `WtApplication.overrideApplicationsAccess.${WtApplication.Crm}.sections.${CrmSectionsNew.CasesExtensions}`,
		},
		[CrmSectionsNew.ContactsExtensions]: {
			_enabled: value,
			_locale: `WtApplication.overrideApplicationsAccess.${WtApplication.Crm}.sections.${CrmSectionsNew.ContactsExtensions}`,
		},
		[CrmSectionsNew.CustomLookups]: {
			_enabled: value,
			_locale: `WtApplication.overrideApplicationsAccess.${WtApplication.Crm}.sections.${CrmSectionsNew.CustomLookups}`,
		},
	},
});

/**
 */
export default class ApplicationsAccess {
	// value param could be passed to set same value for all options
	constructor(
		{ access, value } = {
			value: true,
		},
	) {
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
