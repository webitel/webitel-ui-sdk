import { isEmpty } from '@webitel/ui-sdk/scripts';
import { type MaybeRefOrGetter, toValue } from 'vue';

import type { FilterValue, IFilter } from '../classes/Filter';
import type { StaticFilterEmits } from '../components/types/Filter.types';
import type { AnyFilterConfig } from '../modules/filterConfig';

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

		if (isEmpty(value) && typeof value !== 'boolean') {
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
