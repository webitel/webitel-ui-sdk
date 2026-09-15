export type CardItemId = string | number | null;
export type CardParentId = CardItemId;

/**
 * What a card store needs from the list of one of its nested tabs: the ability
 * to empty it when the card page goes away.
 */
export interface NestedList {
	$reset: () => void;
}
