import {computed, ref} from "vue";
import {defineStore} from "pinia";
import { sortToQueryAdapter } from "../../../../scripts";

export const createTableHeadersStore = (namespace: string) => {
    const id = `${namespace}/headers`;

    return defineStore(id, () => {
        const headers = ref([]);

        const shownHeaders = computed(() => {
            return headers.value.map((header) => header.show);
        });

        const fields = computed(() => {
            return shownHeaders.value.map((header) => header.field);
        });

        const sort = computed(() => {
            return headers.value.find((header) => sortToQueryAdapter(header.sort));
        });

        const updateShownHeaders = () => {};

        const updateSort = () => {};

        return {
            headers,
            shownHeaders,
            fields,
            sort,

            updateShownHeaders,
            updateSort,
        };
    });
};
