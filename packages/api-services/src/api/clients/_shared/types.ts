/**
 * TODO(types): payloads pass through `applyTransform` before reaching a
 * generated client, so the generated request types don't apply here yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type ApiParams = Record<string, any>;

/** most services take string ids; a few generated clients declare `number` */
export type ApiId = string;

export interface GetItemParams<Id = ApiId> {
	itemId: Id;
}

export interface AddItemParams {
	itemInstance: ApiParams;
}

export interface UpdateItemParams<Id = ApiId> {
	itemInstance: ApiParams;
	itemId: Id;
}

export interface PatchItemParams<Id = ApiId> {
	changes: ApiParams;
	id: Id;
}

export interface DeleteItemParams<Id = ApiId> {
	id: Id;
}
