import { computed, type Ref } from 'vue';

import type { CardItemId } from '../types/CardStore.types';

export const useCardIsNew = ({ itemId }: { itemId: Ref<CardItemId> }) => {
	const isNew = computed(() => !itemId.value);

	return {
		isNew,
	};
};
