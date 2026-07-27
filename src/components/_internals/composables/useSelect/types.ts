import type { Ref } from 'vue';

/**
 * TODO(types): options are supplied by consumers with arbitrary shapes and are
 * indexed by runtime `dataKey` / `optionLabel` / `optionValue` keys, so they
 * cannot be described without making the whole select generic.
 */
// biome-ignore lint/suspicious/noExplicitAny: consumer-supplied option shape, see TODO above
export type SelectOption = any;

export type SelectValue = SelectOption | SelectOption[] | null | undefined;

export interface SelectSearchResponse {
	items: SelectOption[];
	next?: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: consumers declare their own param shapes
export type SelectSearchMethod = (
	...params: any[]
) => Promise<SelectSearchResponse>;

/** The PrimeVue Select / MultiSelect instance the composables drive directly. */
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
	/** accepted for API compatibility; custom-value manual handling is disabled */
	manualCustomValues?: boolean;
	isSingle: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: receives the component's typed emit
	emit?: (event: any, ...args: any[]) => void;
}
