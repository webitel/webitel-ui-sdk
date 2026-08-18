/**
 * The parts of a PrimeVue component instance the wt-* wrappers reach into.
 * PrimeVue does not publish instance types, so the wrappers describe only what
 * they actually drive.
 */
export interface PrimevueInstance {
	$el?: HTMLElement;
}

/** A PrimeVue component that renders an overlay panel. */
export interface PrimevueOverlayInstance extends PrimevueInstance {
	overlay?: HTMLElement;
	alignOverlay?: () => void;
	hide?: () => void;
}
