import Sortable from 'sortablejs';
import {
  ref,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue';

/**
 * @param elRef
 * @param options
 * @returns {{reloadSortable: Ref<UnwrapRef<boolean>>}}
 *
 * @description initializes Sortable on passed element ref and reinitializes it after each reorder
 *
 * WHY TO REINITIALIZE SORTABLE AFTER EACH ARRAY REORDER?
 * Sortable and Vue both changing DOM so that there are collisions
 * because both Vue and Sortable try to put element to the position. So element is put incorrectly.
 *
 * There are 2 vue packages for sortable (vue 2 and vue 3), but I had encountered issues when tried to use them.
 * Also, it seems to me that they aren't supported now :(
 *
 * So that I decided to reinitialize Sortable each time order changes to represent it correctly.
 * Bad decision, but I haven't come up with a better one
 */

// eslint-disable-next-line import/prefer-default-export
export function useDestroyableSortable(elRef, options) {
  let sortable = null;

  const reloadSortable = ref(false);

  function destroySortable() {
    return sortable.destroy();
  }

  function initSortable() {
    const replaceSortable = async () => {
      if (!sortable) return;
      destroySortable();
      reloadSortable.value = true;
      await nextTick();
      reloadSortable.value = false;
      await nextTick();
      initSortable();
    };

    sortable = Sortable.create(elRef.value, {
      ...options,
      onEnd: async (e) => {
        if (options.onEnd) options.onEnd(e);
        await replaceSortable();
      },
    });
  }

  onMounted(() => {
    initSortable();
  });

  onUnmounted(() => {
    destroySortable();
  });

  return { reloadSortable };
}
