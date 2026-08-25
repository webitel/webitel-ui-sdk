export interface ContactAccess {
	edit: boolean;
	delete: boolean;
}

export const getContactAccessFromMode = (mode?: string): ContactAccess => ({
	edit: !!mode?.includes('w'),
	delete: !!mode?.includes('d'),
});
