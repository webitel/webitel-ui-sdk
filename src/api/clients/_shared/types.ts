import type { Id } from '../../types/ApiModule';

/**
 * Request shapes shared by the hand-written API clients.
 *
 * TODO(types): payloads stay loosely typed because every client funnels them
 * through `applyTransform` before they reach a generated client, so the
 * generated request types cannot be applied at this boundary yet.
 */
// biome-ignore lint/suspicious/noExplicitAny: loosely typed request payloads, see TODO above
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
