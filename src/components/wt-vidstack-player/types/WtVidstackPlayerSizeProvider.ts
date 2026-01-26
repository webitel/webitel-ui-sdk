import type { Ref } from 'vue';

import type { ComponentSize } from '../../../enums';

export interface WtVidstackPlayerSizeProvider {
	size: Ref<ComponentSize>;
	fullscreen: Ref<boolean>;
	changeSize: (value: ComponentSize) => void;
}
