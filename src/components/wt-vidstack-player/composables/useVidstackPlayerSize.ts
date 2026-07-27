import { inject } from 'vue';

import type { WtVidstackPlayerSizeProvider } from '../types/WtVidstackPlayerSizeProvider';

/**
 * Reads the size context `wt-vidstack-player` provides. Destructuring a missing
 * injection already threw, so the explicit error only names the cause.
 */
export const useVidstackPlayerSize = (): WtVidstackPlayerSizeProvider => {
	const provided = inject<WtVidstackPlayerSizeProvider>('size');
	if (!provided) {
		throw new Error('wt-vidstack-player: "size" context is not provided');
	}
	return provided;
};
