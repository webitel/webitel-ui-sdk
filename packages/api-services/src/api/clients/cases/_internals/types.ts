import type { LocateCaseNeighborDirection } from '@webitel/api-services/gen/models';
import type { ApiParams, GetItemParams } from '../../_shared/types';

export interface GetCaseParams extends GetItemParams {
	listParams?: ApiParams;
}

export interface GetCaseNeighborParams extends GetItemParams {
	direction: LocateCaseNeighborDirection;
	listParams: ApiParams;
}
