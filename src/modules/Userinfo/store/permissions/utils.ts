import { CrudAction, GlobalPermission, ScopeClass, WtObject, WtApps } from './enums';
import { RolePermission, ClassScope, GlobalAccessMap, ScopeAccessMap, VisualAccess, SectionVisibilityAccessMap, WtObjectToScopeClass } from './types';

const crudActionMapping: Partial<Record<string, CrudAction>> = {
    add: CrudAction.Create,
    write: CrudAction.Edit,
    read: CrudAction.Read,
    delete: CrudAction.Delete,
};

export const makeGlobalAccessMap = (permissions: RolePermission[]): GlobalAccessMap => {
    return permissions.reduce((map: GlobalAccessMap, permission: RolePermission) => {
        const action = crudActionMapping[permission.id as string] || permission.id;
        map.set(action as GlobalPermission, permission);
        return map;
    }, new Map());
};

const wtObjectToScopeClass: WtObjectToScopeClass = {
    [WtObject.Users]: ScopeClass.Users,
    [WtObject.Agents]: ScopeClass.Agent,
    [WtObject.Queue]: ScopeClass.Queue,
    [WtObject.Calendar]: ScopeClass.Dictionaries,
    [WtObject.Buckets]: ScopeClass.Dictionaries,
};

export const makeScopeAccessMap = (scopes: ClassScope[]): ScopeAccessMap => {
    const map: ScopeAccessMap = new Map();

    Object.entries(wtObjectToScopeClass).forEach(([section, scopeClass]) => {
        const actions: CrudAction[] = [];
        const access = scopes.find(({ class: scope }) => scope === scopeClass)?.access || '';
        if (access.includes('r')) actions.push(CrudAction.Read);
        if (access.includes('w')) actions.push(CrudAction.Create);
        if (access.includes('d')) actions.push(CrudAction.Delete);
        if (access.includes('x')) actions.push(CrudAction.Create);
        map.set(section as WtObject, actions);
    });

    return map;
};

export const makeVisualAccessMap = (sections: VisualAccess): SectionVisibilityAccessMap => {
    const map: SectionVisibilityAccessMap = new Map();

    Object.entries(sections).forEach(([app, appSections]) => {
        const sectionMap = {} as Record<WtObject, boolean>;
        Object.entries(appSections).forEach(([section, visible]) => {
            sectionMap[section as WtObject] = visible;
        });
        map.set(app as WtApps, sectionMap);
    });

    return map;
};

export const hasActionGlobalAccess = ({ action, permissions }: { action: GlobalPermission; permissions: GlobalAccessMap }): boolean => {
    return permissions.has(action);
};

export const hasActionScopeAccess = ({ action, scope, object }: { action: CrudAction; scope: ScopeAccessMap; object: WtObject }): boolean => {
    if (!object) return false;
    return scope.get(object).includes(action);
};

export const hasSectionVisibilityAccess = ({ visibility, section }: { visibility: SectionVisibilityAccessMap; section: WtObject }): boolean => {
    const appVisibility = visibility.get(WtApps.Admin); // this.app
    return appVisibility ? appVisibility[section] : false;
};
