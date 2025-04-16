import { sysTypes } from '@webitel/ui-sdk/api/clients/index';
import {FilterOption} from "../../../enums/FilterOption";
import {FilterName} from "../../../types/Filter";

export const searchMethod = ({ id: filterValue, ...rest }, { filterName, filterConfig }: { filterName: FilterName, filterConfig: FilterOption }) => {
  return sysTypes.extensionFieldSearchMethod({
    ...rest,
    ...filterConfig.entensionField.lookup,
    id: filterValue,
  });
};
