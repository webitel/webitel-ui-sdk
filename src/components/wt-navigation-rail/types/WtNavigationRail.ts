import type { BadgeSeverity } from '../../wt-badge-new/types/WtBadge';

export interface NavigationRailBadge {
	value: string | number;
	/** @default 'success' */
	severity?: BadgeSeverity;
}

export interface NavigationRailItem {
	/** Unique id, emitted on select and matched against `active` */
	id: string;
	/** Icon name from icons repository */
	icon: string;
	/** Accessible label (aria-label + tooltip) */
	label?: string;
	disabled?: boolean;
	/** Renders badge over the button when set */
	badge?: NavigationRailBadge | null;
}
