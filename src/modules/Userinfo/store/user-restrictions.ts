import { GlobalPermission } from './backend/Permissions';
import { UIAccess } from './backend/Access';
import { ClassesScope } from './backend/Scope';
import WtObject from './WtObjects.enum';

type Operations = 'create' | 'read' | 'update' | 'delete';
type Permissions = {
  // Зручний для фронта структура даних
  [obj in WtObject]: {
    obacRbacPermissions: Operations[];
    globalPermissions: Operations[];
    visible?: boolean;
  };
};

type ActionContext = {
  state: State;
  getters: Getters;
  commit: any; // mutations
  dispatch: Actions; // actions
};

interface BackendPermissions {
  scope: ClassesScope[];
  permissions: GlobalPermission[];
  access: UIAccess;
}

interface State {
  permissions: Permissions;
}

interface Getters {
  ALLOW_READ_ACCESS: (state: State, getters: Getters) => (objects: WtObject) => boolean;
  // SHOW_SECTION: (state: State, getters: Getters) => (section: AdminSections) => boolean;
}

interface Actions {
  CONVERT_PERMISSIONS: (context: ActionContext, { scope, access, permissions }: BackendPermissions) => Permissions;
}
