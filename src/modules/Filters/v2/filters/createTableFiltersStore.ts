import {createFiltersManager} from "./classes/FiltersManager.class.ts";
import {defineStore} from "pinia";
import {reactive} from "vue";

export const createTableFiltersStore = (namespace: string) => {
    const id = `${namespace}/filters`;

    return defineStore(id, () => {
        const filtersManager = reactive(createFiltersManager({ storagePrefix: namespace }));

        // wrapping filtersManager method to extend their functionality, if it will be necessary in future
        const addFilter = filtersManager.add;

        return {
            filtersManager,

            addFilter,
        };
    });
};
