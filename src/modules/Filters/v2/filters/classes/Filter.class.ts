import deepcopy from "deep-copy";

export type FilterName = string;

export type FilterValue = object | [] | string | number | boolean | undefined | null;

export interface FilterInitParams {
    name: FilterName;
    value: FilterValue;
}

export interface FilterConfig {
    storage?: string[];
}

export interface IFilter {
    name: FilterName;
    value: FilterValue;
    set: (value: unknown) => IFilter;
    get: () => unknown;
    reset: () => IFilter;
    restore: () => IFilter;
}

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
