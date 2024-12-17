export enum CrudAction {
    Read = 'read',
    Create = 'create',
    Edit = 'edit',
    Delete = 'delete',
}

export enum WtObject {
    Users = 'users',
    Agents = 'agents',
    Queue = 'queue',
    Buckets = 'buckets',
    Calendar = 'calendar',
    License = 'license',
}

export enum GlobalPermission {
    Read = CrudAction.Read,
    Create = CrudAction.Create,
    Edit = CrudAction.Edit,
    Delete = CrudAction.Delete,
}

export enum ScopeClass {
    Users = 'users',
    Agent = 'cc_agent',
    Queue = 'cc_queue',
    Dictionaries = 'dictionaries',
    EmailProfile = 'email_profile',
}

export enum WtApps {
    Admin = 'admin',
    Agent = 'agent',
    //... other apps
}
