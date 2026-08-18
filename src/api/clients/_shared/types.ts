import type { Id } from '../../types/ApiModule';

/**
 * TODO(types): payloads pass through `applyTransform` before reaching a
 * generated client, so the generated request types don't apply here yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type ApiParams = Record<string, any>;

export interface GetItemParams<TId = Id> {
	itemId: TId;
}

export interface AddItemParams {
	itemInstance: ApiParams;
}

export interface UpdateItemParams<TId = Id> {
	itemInstance: ApiParams;
	itemId: TId;
}

export interface PatchItemParams<TId = Id> {
	changes: ApiParams;
	id: TId;
}

export interface DeleteItemParams<TId = Id> {
	id: TId;
}
