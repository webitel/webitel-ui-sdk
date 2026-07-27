import type { Ref } from 'vue';

/** TODO(types): options are indexed by the runtime `dataKey`/`optionLabel`/`optionValue` keys. */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type SelectOption = any;

export type SelectValue = SelectOption | SelectOption[] | null | undefined;

export interface SelectSearchResponse {
	items: SelectOption[];
	next?: boolean;
}

export type SelectSearchMethod = (
	// biome-ignore lint/suspicious/noExplicitAny: consumers declare their own param shapes
	...params: any[]
) => Promise<SelectSearchResponse>;

export interface SelectComponentRef {
	$el?: HTMLElement;
	overlay?: HTMLElement;
	alignOverlay?: () => void;
	hide?: () => void;
}

export interface UseSelectOptionsParams {
	selected: Ref<SelectValue>;
	options: Ref<SelectOption[]>;
	optionLabel: Ref<string | undefined>;
	optionValue?: Ref<string | undefined>;
	dataKey: Ref<string>;
	allowCustomValues: Ref<boolean>;
	searchMethod: Ref<SelectSearchMethod | undefined>;
	strictApiOptions?: Ref<boolean | undefined>;
}

export interface UseSelectDropdownParams {
	selectId: Ref<string>;
	selectRef: Ref<SelectComponentRef | undefined>;
	filterInput: Ref<HTMLInputElement | undefined>;
	searchMethod: Ref<SelectSearchMethod | undefined>;
	filteredOptions: Ref<SelectOption[]>;
	filterText: Ref<string>;
	filterOptions: (value: string) => void;
	resetAndFetch: (search?: string) => void;
	sortOptions: (opts: SelectOption[]) => SelectOption[];
	fetchOptions: () => void;
	isLoading: Ref<boolean>;
	searchHasNext: Ref<boolean>;
}

export interface UseSelectCustomValuesParams {
	selected: Ref<SelectValue>;
	filteredOptions: Ref<SelectOption[]>;
	options: Ref<SelectOption[]>;
	dataKey: Ref<string>;
	filterText: Ref<string>;
	filterOptions: (value: string) => void;
	updateSelectedOptionsCache: () => void;
	selectRef: Ref<SelectComponentRef | undefined>;
	allowCustomValues: Ref<boolean>;
	isSingle: boolean;
}

export interface UseSelectParams
	extends UseSelectOptionsParams,
		Pick<UseSelectDropdownParams, 'selectId' | 'selectRef' | 'filterInput'> {
	manualCustomValues?: boolean;
	isSingle: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: receives the component's typed emit
	emit?: (event: any, ...args: any[]) => void;
}
