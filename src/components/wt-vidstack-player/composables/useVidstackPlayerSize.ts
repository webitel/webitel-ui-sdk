import { inject } from 'vue';

import type { WtVidstackPlayerSizeProvider } from '../types/WtVidstackPlayerSizeProvider';

export const useVidstackPlayerSize = (): WtVidstackPlayerSizeProvider => {
	const provided = inject<WtVidstackPlayerSizeProvider>('size');
	if (!provided) {
		throw new Error('wt-vidstack-player: "size" context is not provided');
	}
	return provided;
};
