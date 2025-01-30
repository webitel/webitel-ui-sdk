import invert from "lodash/fp/invert";

import {AdminSections, AuditorSections, CrmSections, CrudAction, SupervisorSections, WtObject} from "../../../../enums";
import {CrudGlobalAction, ScopeClass} from "../enums";

export const mapGlobalActionToCrudAction = {
    [CrudGlobalAction.Add]: CrudAction.Create,
    [CrudGlobalAction.Read]: CrudAction.Read,
    [CrudGlobalAction.Write]: CrudAction.Update,
    [CrudGlobalAction.Delete]: CrudAction.Delete,
};

export const mapCrudActionToGlobalAction = invert(mapGlobalActionToCrudAction);

/* one-to-many */
export const mapScopeClassToWtObjects: {[key: ScopeClass]: WtObject[]} = {
    'users': [WtObject.User],
};


export const mapScopeClassAccessTokenToCrudAction = {
    'r': CrudAction.Read,
    'w': CrudAction.Update,
    'd': CrudAction.Delete,
    'x': CrudAction.Create,
};

export const mapCrudActionToScopeClassAccessToken = invert(mapScopeClassAccessTokenToCrudAction);



export const mapWtObjectToUiSection = {
    // todo
    [WtObject.User]: AdminSections.Users,
    [WtObject.Agent]: AdminSections.Agents,
};

export const mapUiSectionToWtObject = invert(mapWtObjectToUiSection);

export const AdminSectionsValues = invert(AdminSections);
export const AuditorSectionsValues = invert(AuditorSections);
export const CrmSectionsValues = invert(CrmSections);
export const SupervisorSectionsValues = invert(SupervisorSections);
