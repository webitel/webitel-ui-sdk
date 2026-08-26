import type { Ref } from 'vue';
import type { LookupOption } from '../../../types';

export interface UseCCenterModeSwitcherParams {
	activityTypes: Ref<LookupOption[]>;
	loadActivityTypes: () => Promise<void>;
	openActivityTypePopup: () => void;
	emit: (event: 'changed-call-center-mode', payload?: LookupOption) => void;
}
