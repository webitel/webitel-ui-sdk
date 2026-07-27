export interface WtNavigationBarExpansionNavItem {
	subNav: WtNavigationBarNavItem[];
}

export interface WtNavigationBarRouteNavItem {
	route: string;
}

/**
 * A nav item is either a route link or an expansion holding `subNav` items;
 * both fields stay optional so the template can branch on them.
 */
export type WtNavigationBarNavItem = {
	value: string;

	/**
	 * Represents nav item text in menu
	 * @default WtNavigationBarNavItem.value
	 */
	name?: string;
} & Partial<WtNavigationBarRouteNavItem> &
	Partial<WtNavigationBarExpansionNavItem>;
