import { IFilterTransformer } from '../../../../../types/Filters.types';

export class FilterTransformer implements IFilterTransformer {}

export const createFilterTransformer = (/*params*/) => {
  return new FilterTransformer(/*params*/);
};
