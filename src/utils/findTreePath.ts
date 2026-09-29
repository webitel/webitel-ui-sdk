/**
 * Walks a tree depth-first and returns the nodes from a root down to the
 * first node matching `isTarget`, both ends included, or `null` when nothing
 * matches. Children are read from `childrenKey` (e.g. `service` for case
 * service catalogs, whose services nest under `service`).
 *
 * The path is what a breadcrumb, an "A / B / C" label or an ancestor check
 * needs: `path.map(({ name }) => name)`, `path.slice(0, -1)`, and so on.
 */
export function findTreePath<TNode extends object>(
	nodes: readonly TNode[] | null | undefined,
	isTarget: (node: TNode) => boolean,
	// NoInfer: the node type comes from `nodes` only; inferred from the key
	// literal instead, loosely typed trees narrowed to `{ service: any }`
	childrenKey: NoInfer<keyof TNode>,
): TNode[] | null {
	for (const node of nodes ?? []) {
		if (isTarget(node))
			return [
				node,
			];
		const children = node[childrenKey];
		if (Array.isArray(children)) {
			const path = findTreePath(children as TNode[], isTarget, childrenKey);
			if (path)
				return [
					node,
					...path,
				];
		}
	}
	return null;
}
