import deepcopy from "deep-copy";
import type {FilterConfig, FilterInitParams, FilterName, FilterValue, IFilter} from "../types/Filter.types.ts";

export class Filter implements IFilter {
    readonly name: FilterName;

    initialValue: FilterValue;
    multiple?: boolean;

    constructor(
        { name, value }: FilterInitParams,
        public payload: object | undefined,
        public config: FilterConfig,
    ) {
        this.name = name;
        this.value = value;

        this.initialValue = deepcopy(value);
        this.multiple = Array.isArray(value);
    }

    get(): FilterValue {
        return this.value;
    }

    reset(): IFilter {
        this.value = deepcopy(this.initialValue);
        return this;
    }

    restore(): IFilter {
        return undefined;
    }

    set(value: FilterValue): IFilter {
        this.value = value;
        return this;
    }

    value: FilterValue;
}
