import { computed } from 'vue';
import { useStore } from 'vuex';

export const useTableFilters = (namespace) => {
	const store = useStore();

	const filtersNamespace = `${namespace}/filters`;

	const filtersValue = computed(() =>
		store.getters[`${filtersNamespace}/GET_FILTERS`](),
	);

	/** @param {unknown} [payload] */
	function subscribe(payload) {
		return store.dispatch(`${filtersNamespace}/SUBSCRIBE`, payload);
	}

	/** @param {unknown} [payload] */
	function flushSubscribers(payload) {
		return store.dispatch(`${filtersNamespace}/FLUSH_SUBSCRIBERS`, payload);
	}

	/** @param {unknown} [payload] */
	function restoreFilters(payload) {
		return store.dispatch(`${filtersNamespace}/RESTORE_FILTERS`, payload);
	}

	/** @param {unknown} [payload] */
	function resetFilters(payload) {
		return store.dispatch(`${filtersNamespace}/RESET_FILTERS`, payload);
	}

	return {
		namespace: filtersNamespace,
		filtersValue,

		restoreFilters,
		resetFilters,

		subscribe,
		flushSubscribers,
	};
};
