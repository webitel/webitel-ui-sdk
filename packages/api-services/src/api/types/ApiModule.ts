export type Id = number | string;

export interface ApiModule<Entity> {
	getList?: (params?: unknown) => Promise<{
		items?: Entity[];
		next?: boolean;
		aggs?: unknown;
	}>;
	getLookup?: (params?: unknown) => Promise<{
		items?: Entity[];
		next?: boolean;
	}>;
	get?: (params: {
		itemId?: Id | null;
		/** preferred over itemId */
		id?: Id | null;
		parentId?: Id | null;
	}) => Promise<Entity>;
	add?: (params: {
		itemInstance?: Entity;
		parentId?: Id | null;
	}) => Promise<Entity>;
	update?: (params: {
		itemId?: Id | null;
		id?: Id;
		itemInstance?: Entity;
		parentId?: Id | null;
		etag?: string;
	}) => Promise<Entity>;
	patch?: (params: {
		id?: Id;
		itemId?: Id | null;
		changes?: Partial<Entity>;
		parentId?: Id | null;
		etag?: string;
	}) => Promise<Entity>;
	delete?: (params: {
		itemId?: Id;
		id?: Id;
		parentId?: Id | null;
		etag?: string;
	}) => Promise<void>;
}
