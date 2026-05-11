/**
 * @author @PalonnyiOleksandr
 *
 * [WETL-9414](https://webitel.atlassian.net/browse/WETL-9414)
 *
 * Registers custom elements from the main window into the Document PiP window.
 * Walks the source DOM tree, collects all hyphenated tag names, and defines
 * any missing constructors in the target window's custom element registry.
 */
import { walkElementTree } from './domTraversal';

export const bridgeCustomElements = (root: Element, targetWindow: Window) => {
	const tags = new Set<string>();
	walkElementTree(root, (el) => {
		const tag = el.tagName.toLowerCase();
		if (tag.includes('-')) tags.add(tag);
	});

	for (const tag of tags) {
		const ctor = window.customElements.get(tag);
		if (!ctor || targetWindow.customElements.get(tag)) continue;
		try {
			targetWindow.customElements.define(tag, ctor as CustomElementConstructor);
		} catch (err) {
			console.warn('[document PiP] custom element bridge failed', tag, err);
		}
	}
};
