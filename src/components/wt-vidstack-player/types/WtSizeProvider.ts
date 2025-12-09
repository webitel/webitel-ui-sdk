import type { Ref } from 'vue';

import { ComponentSize } from '../../../enums';

export interface WtSizeProvider {
  size: Ref<ComponentSize>;
  fullscreen: Ref<boolean>;
  changeSize: (value: ComponentSize) => void;
}
