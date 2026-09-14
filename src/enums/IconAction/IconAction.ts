export const IconAction = {
	REFRESH: 'refresh',
	ADD: 'add',
	RESET_MEMBERS: 'reset-members',
	DELETE: 'delete',
	FILTERS: 'filters',
	UPLOAD: 'upload',
	DOWNLOAD: 'download',
	EXPORT: 'export',
	COPY: 'copy',
	COLUMNS: 'columns',
	HISTORY: 'history',
	EDIT: 'edit',
	COLLAPSE: 'collapse',
	EXPAND: 'expand',
	CLOSE: 'close',
	CANCEL: 'cancel',
	VARIABLES: 'variables',
	CLEAR: 'clear',
	ADD_FILTER: 'add-filter',
	SAVE: 'save',
	SAVE_PRESET: 'save-preset',
	APPLY_PRESET: 'apply-preset',
	ADD_CONTACT: 'add-contact',
	DOWNLOAD_PDF: 'download-pdf',
	CHAT: 'chat',
	SORT: 'sort',
	LOGOUT: 'logout',
} as const;

export type IconAction = (typeof IconAction)[keyof typeof IconAction];

export default IconAction;
