export interface WtNavigationBarExpansionNavItem {
  subNav: WtNavigationBarNavItem[];
}

export interface WtNavigationBarRouteNavItem {
  route: string;
}

export type WtNavigationBarNavItem = {
  value: string;

  /**
   * Represents nav item text in menu
   * @default WtNavigationBarNavItem.value
   */
  name?: string;
} & (WtNavigationBarRouteNavItem | WtNavigationBarExpansionNavItem);
