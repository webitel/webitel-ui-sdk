import deepmerge from 'deepmerge';
import { computed, inject, toRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { EmptyCause } from '../../../enums/index';
import { isEmpty } from '../../../scripts/index.js';
import EmptyFiltersDark from '../_internals/assets/empty-filters-dark.svg';
import EmptyFiltersLight from '../_internals/assets/empty-filters-light.svg';
import EmptyTableDark from '../_internals/assets/empty-table-dark.svg';
import EmptyTableLight from '../_internals/assets/empty-table-light.svg';

type DeepPartial<T> = T extends object
	? {
			[K in keyof T]?: DeepPartial<T[K]>;
		}
	: T;

interface EmptyImageSet {
	dark: string;
	light: string;
}

interface EmptyStateVariants<T> {
	filters: T;
	error: T;
	empty: T;
}

interface EmptyStateConfig {
	image: EmptyStateVariants<EmptyImageSet>;
	headline: EmptyStateVariants<string>;
	title: EmptyStateVariants<string>;
	text: EmptyStateVariants<string>;
	primaryActionText: EmptyStateVariants<string>;
	secondaryActionText: EmptyStateVariants<string>;
}

/** duck-typed readable ref — accepts `Ref`/`ComputedRef`/Pinia `ToRef` alike, only `.value` is ever read */
type Readable<T> = {
	value: T;
};

export interface UseTableEmptySource {
	dataList?: Readable<unknown[] | undefined>;
	filters?: Readable<Record<string, unknown> | undefined>;
	error?: Readable<unknown>;
	isLoading?: Readable<boolean | undefined>;
}

type MaybeOverridesGetter =
	| DeepPartial<EmptyStateConfig>
	| Readable<DeepPartial<EmptyStateConfig>>
	| (() => DeepPartial<EmptyStateConfig>);

const resolveOverrides = (
	source: MaybeOverridesGetter,
): DeepPartial<EmptyStateConfig> => {
	if (typeof source === 'function') return source();
	if (source && typeof source === 'object' && 'value' in source) {
		return source.value;
	}
	return source;
};

/**
 * @param overrides plain object, ref, computed, or getter — use a reactive
 *   source (not a plain object literal) if any value inside depends on
 *   locale/dark mode, so it re-evaluates instead of freezing at first render
 */
export const useTableEmpty = (
	{ dataList, filters, error, isLoading }: UseTableEmptySource = {},
	overrides: MaybeOverridesGetter = {},
) => {
	const { t } = useI18n();

	// use computed, so that at locale change, texts will be updated too
	const defaults = computed<EmptyStateConfig>(() => ({
		image: {
			filters: {
				dark: EmptyFiltersDark,
				light: EmptyFiltersLight,
			},
			error: {
				dark: EmptyTableDark,
				light: EmptyTableLight,
			},
			empty: {
				dark: EmptyTableDark,
				light: EmptyTableLight,
			},
		},
		headline: {
			filters: '',
			error: '',
			empty: '',
		},
		title: {
			filters: '',
			error: '',
			empty: '',
		},
		text: {
			filters: t('webitelUI.empty.text.filters'),
			error: '',
			empty: t('webitelUI.empty.text.empty'),
		},
		primaryActionText: {
			filters: '',
			error: '',
			empty: t('reusable.add'),
		},
		secondaryActionText: {
			filters: '',
			error: '',
			empty: '',
		},
	}));

	const merged = computed<EmptyStateConfig>(
		() =>
			deepmerge(
				defaults.value,
				resolveOverrides(overrides),
			) as EmptyStateConfig,
	);

	const darkMode = toRef(inject<boolean>('darkMode'));

	const emptyState = computed(() => {
		return !isLoading?.value && !error?.value && !dataList?.value?.length;
	});

	const emptyCause = computed<EmptyCause | null>(() => {
		if (!emptyState?.value) return null;

		if (error?.value) return EmptyCause.ERROR;
		if (filters?.value) {
			const uncheckedFilters = [
				'page',
				'size',
				'sort',
				'fields',
			];
			const filtersApplied = Object.entries(filters.value).some(
				([filterName, filterValue]) =>
					!isEmpty(filterValue) && !uncheckedFilters.includes(filterName),
			);
			if (filtersApplied) return EmptyCause.FILTERS;
		}

		return EmptyCause.EMPTY;
	});

	const image = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return darkMode?.value
					? merged.value.image.error.dark
					: merged.value.image.error.light;
			case EmptyCause.FILTERS:
				return darkMode?.value
					? merged.value.image.filters.dark
					: merged.value.image.filters.light;
			case EmptyCause.EMPTY:
				return darkMode?.value
					? merged.value.image.empty.dark
					: merged.value.image.empty.light;
			default:
				return null;
		}
	});
	const headline = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return merged.value.headline.error;
			case EmptyCause.FILTERS:
				return merged.value.headline.filters;
			case EmptyCause.EMPTY:
				return merged.value.headline.empty;
			default:
				return null;
		}
	});

	const title = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return merged.value.title.error;
			case EmptyCause.FILTERS:
				return merged.value.title.filters;
			case EmptyCause.EMPTY:
				return merged.value.title.empty;
			default:
				return null;
		}
	});

	const text = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return merged.value.text.error;
			case EmptyCause.FILTERS:
				return merged.value.text.filters;
			case EmptyCause.EMPTY:
				return merged.value.text.empty;
			default:
				return null;
		}
	});

	const primaryActionText = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return merged.value.primaryActionText.error;
			case EmptyCause.FILTERS:
				return merged.value.primaryActionText.filters;
			case EmptyCause.EMPTY:
				return merged.value.primaryActionText.empty;
			default:
				return null;
		}
	});

	const secondaryActionText = computed(() => {
		switch (emptyCause.value) {
			case EmptyCause.ERROR:
				return merged.value.secondaryActionText.error;
			case EmptyCause.FILTERS:
				return merged.value.secondaryActionText.filters;
			case EmptyCause.EMPTY:
				return merged.value.secondaryActionText.empty;
			default:
				return null;
		}
	});

	return {
		showEmpty: emptyState,
		emptyCause,

		image,
		headline,
		title,
		text,
		primaryActionText,
		secondaryActionText,
	};
};
