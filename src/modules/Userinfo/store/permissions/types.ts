import { CrudAction, GlobalPermission, ScopeClass, WtObject, WtApps } from './enums';

export interface RolePermission {
    id: GlobalPermission;
    name: string;
}

export interface ClassScope {
    class: ScopeClass;
    access: string; // "xrwd" indicating combinations of actions
}

export type GlobalAccessMap = Map<GlobalPermission, RolePermission>;
export type ScopeAccessMap = Map<WtObject, CrudAction[]>;
export type WtObjectToScopeClass = Partial<Record<WtObject, ScopeClass>>;
export type VisualAccess = Record<WtApps, Record<WtObject, boolean>>;
export type SectionVisibilityAccessMap = Map<WtApps, Record<WtObject, boolean>>;
export type SectionToObjectMap = Map<WtObject, ScopeClass>;

export interface StoreState {
    scope: ScopeAccessMap;
    sectionVisibility: SectionVisibilityAccessMap;
    permissions: GlobalAccessMap;
}
