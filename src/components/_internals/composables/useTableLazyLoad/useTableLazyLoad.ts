import { type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { PrimevueInstance } from '../../types/PrimevueInstance';

export const useTableLazyLoad = ({
	table,
	lazy,
	data,
	onLoading,
}: {
	table: Ref<PrimevueInstance | undefined>;
	lazy: MaybeRefOrGetter<boolean>;
	data: MaybeRefOrGetter<unknown[]>;
	onLoading: MaybeRefOrGetter<(() => Promise<unknown>) | undefined>;
}) => {
	let isLazyLoading = false;
	let lastRowObserver: IntersectionObserver | null = null;

	const loadNext = async () => {
		const load = toValue(onLoading);
		if (!load || isLazyLoading) return;

		isLazyLoading = true;
		try {
			await load();
		} finally {
			isLazyLoading = false;
		}
	};

	const disconnectLastRowObserver = () => {
		lastRowObserver?.disconnect();
		lastRowObserver = null;
	};

	/**
	 * [Claude] lazy tables used to render through PrimeVue's virtual scroller only to get its
	 * lazy-load event, but with every row rendered (numToleratedItems = data.length) that event
	 * fired on init/resize and on the first scroll tick after every append, and the scroller
	 * rendered rows on its own schedule (appended rows only after the next scroll event).
	 * Instead, rows render directly and the next page is requested when the last row becomes
	 * visible. The observer also reports right after observe(), so a page that doesn't fill
	 * the table keeps loading until it does.
	 */
	const observeLastRow = () => {
		disconnectLastRowObserver();
		if (!toValue(lazy) || !toValue(onLoading) || !toValue(data).length) return;

		const lastRow = table.value?.$el?.querySelector(
			'.p-datatable-tbody > tr:last-child',
		);
		if (!lastRow) return;

		lastRowObserver = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) loadNext();
		});
		lastRowObserver.observe(lastRow);
	};

	return {
		observeLastRow,
		disconnectLastRowObserver,
	};
};
