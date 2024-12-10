import {defineStore} from "pinia";
import {ref} from "vue";

export const createTablePaginationStore = (namespace: string) => {
    const id = `${namespace}/pagination`;

    return defineStore(id, () => {
        const page = ref(1);
        const size = ref(10);
        const next = ref(false);

        const $reset = () => {
            page.value = 1;
            size.value = 10;
            next.value = false;
        };

        return {
            page,
            size,
            next,

            $reset,
        };
    });
};
