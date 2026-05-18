export const domTraversal = (
	root: Element | ShadowRoot,
	visit: (el: Element) => void,
) => {
	if (root instanceof Element) {
		visit(root);
		if (root.shadowRoot) {
			for (const child of root.shadowRoot.children) {
				domTraversal(child, visit);
			}
		}
	}
	for (const child of root.children) {
		domTraversal(child, visit);
	}
};
