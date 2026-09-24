import type { ApiParams, GetItemParams } from '../../_shared/types';

export interface GetCaseParams extends GetItemParams {
	listParams?: ApiParams;
}
