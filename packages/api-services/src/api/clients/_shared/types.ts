/**
 * TODO(types): payloads pass through `applyTransform` before reaching a
 * generated client, so the generated request types don't apply here yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type ApiParams = Record<string, any>;

/** ids reach the clients as route params or as numbers, depending on the caller */
export type ApiId = string | number;

export interface GetItemParams {
	itemId: ApiId;
}

export interface AddItemParams {
	itemInstance: ApiParams;
}

export interface UpdateItemParams {
	itemInstance: ApiParams;
	itemId: ApiId;
}

export interface PatchItemParams {
	changes: ApiParams;
	id: ApiId;
}

export interface DeleteItemParams {
	id: ApiId;
}
