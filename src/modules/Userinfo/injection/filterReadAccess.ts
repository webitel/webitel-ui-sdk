import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';

import type { WtObject } from '../../../enums';

export type FilterHasReadAccess = (object?: WtObject) => boolean;

/** Getter around the checker: `provide` would call a bare function as a factory. */
export const FilterReadAccessKey: InjectionKey<
	() => FilterHasReadAccess | undefined
> = Symbol('filterReadAccess');

export const provideFilterReadAccess = (
	getHasReadAccess: () => FilterHasReadAccess | undefined,
) => {
	const parent = inject(FilterReadAccessKey, undefined);
	provide(FilterReadAccessKey, () => getHasReadAccess() ?? parent?.());
};

export const injectFilterReadAccess = () =>
	inject(FilterReadAccessKey, () => undefined);
