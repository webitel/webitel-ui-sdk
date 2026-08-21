/**
 * TODO(types): payloads pass through `applyTransform` before reaching a
 * generated client, so the generated request types don't apply here yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type ApiParams = Record<string, any>;

/**
 * Mirrors ui-sdk's `ApiModule.Id`, redeclared because this package sits below
 * ui-sdk and cannot import from it. tsc catches drift where the two meet.
 */
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

/**
 * Params for entities that only exist under a parent — queue hooks, skills,
 * buckets, resource groups, members. ui-datalist threads `parentId` through
 * every call a nested table or its card popup makes.
 */
export interface NestedGetItemParams extends GetItemParams {
	parentId: ApiId;
}

export interface NestedAddItemParams extends AddItemParams {
	parentId: ApiId;
}

export interface NestedUpdateItemParams extends UpdateItemParams {
	parentId: ApiId;
}

export interface NestedPatchItemParams extends PatchItemParams {
	parentId: ApiId;
}

export interface NestedDeleteItemParams extends DeleteItemParams {
	parentId: ApiId;
}
