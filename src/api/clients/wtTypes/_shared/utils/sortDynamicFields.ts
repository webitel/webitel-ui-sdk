import deepCopy from 'deep-copy';
import { WebitelProtoDataStruct } from 'webitel-sdk';

export const sortDynamicFields = (
  item: WebitelProtoDataStruct,
): WebitelProtoDataStruct => {
  const unSortableFields = item.fields.filter((field) => !field.position);

  const sortableFields = deepCopy(item.fields)
    .filter((field) => field.position)
    .sort((a, b) => {
      return a.position - b.position;
    });

  const fields = [...unSortableFields, ...sortableFields];

  return {
    ...item,
    fields,
  };
};
