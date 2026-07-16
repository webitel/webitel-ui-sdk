import { type Ref } from 'vue';
/**
 * @author PolinaSukhorukova-webitel
 *
 * Fires the callback on every resize and disconnects itself
 * once clientHeight is unchanged twice in a row.
 */
export declare const useObserveHeightUntilStable: (
	chatContainer: Ref<HTMLElement | null>,
	callback: () => void,
) => {
	startObserve: () => void;
	stopObserve: () => void;
};
