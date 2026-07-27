export interface WtNavigationBarExpansionNavItem {
	subNav: WtNavigationBarNavItem[];
}

export interface WtNavigationBarRouteNavItem {
	route: string;
}

/** both fields stay optional so the template can branch on them */
export type WtNavigationBarNavItem = {
	value: string;

	/**
	 * Represents nav item text in menu
	 * @default WtNavigationBarNavItem.value
	 */
	name?: string;
} & Partial<WtNavigationBarRouteNavItem> &
	Partial<WtNavigationBarExpansionNavItem>;
