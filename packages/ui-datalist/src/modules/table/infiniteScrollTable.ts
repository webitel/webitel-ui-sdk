import { TableStore } from '../types/tableStore.types.ts';
import { storeToRefs } from 'pinia';

export function infiniteScrollTable<Entity extends { id: string }>(
  store: TableStore<Entity>,
) {

  const {
    dataList,
    isLoading,
    error,
    page,
    size,
    next,
    sort,
    fields,
    parentId,
    filtersManager,
  } = storeToRefs(store);

  const { apiModule } = store;


  const infiniteScrollDataList = async () => {
    isLoading.value = true;

    try {
      const params = {
        ...filtersManager.value.getAllValues(),
        page: page.value,
        size: size.value,
        sort: sort.value,
        fields: fields.value,
        parentId: parentId?.value,
      };
      const { items, next: newNext } = await apiModule.getList(params);

      dataList.value.push(...items);
      next.value = newNext;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    infiniteScrollDataList,
  };
}
