import { isEmpty } from '@webitel/ui-sdk/scripts';
import { type MaybeRefOrGetter, toValue } from 'vue';

import type { FilterValue, IFilter } from '../classes/Filter';
import type { StaticFilterEmits } from '../components/types/Filter.types';
import type { AnyFilterConfig } from '../modules/filterConfig';

const isEmptyFilterValue = (value: FilterValue) => {
	if (typeof value === 'boolean') return false;
	if (isEmpty(value)) return true;
	if (typeof value !== 'object' || Array.isArray(value)) return false;
	return Object.values(value).every(
		(field) => field === null || field === undefined || field === '',
	);
};

type StaticFilterEmit = <K extends keyof StaticFilterEmits>(
	event: K,
	...args: StaticFilterEmits[K]
) => void;

export const useFilterValueChange = ({
	filterConfig,
	filter,
	emit,
}: {
	filterConfig: MaybeRefOrGetter<AnyFilterConfig>;
	filter: MaybeRefOrGetter<IFilter | undefined>;
	emit: StaticFilterEmit;
}) => {
	const onValueChange = (value: FilterValue) => {
		const currentFilter = toValue(filter);
		const config = toValue(filterConfig);

		if (isEmptyFilterValue(value)) {
			if (!currentFilter) return;
			if (config.notDeletable) return;
			return emit('delete:filter', currentFilter);
		}

		if (isEmpty(currentFilter?.value)) {
			return emit('add:filter', {
				name: config.name,
				value,
			});
		}

		emit('update:filter', {
			name: config.name,
			value,
			label: currentFilter?.label,
		});
	};

	return {
		onValueChange,
	};
};
