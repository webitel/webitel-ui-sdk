export const walkElementTree = (
	root: Element | ShadowRoot,
	visit: (el: Element) => void,
) => {
	if (root instanceof Element) {
		visit(root);
		if (root.shadowRoot) {
			for (const child of root.shadowRoot.children) {
				walkElementTree(child, visit);
			}
		}
	}
	for (const child of root.children) {
		walkElementTree(child, visit);
	}
};
