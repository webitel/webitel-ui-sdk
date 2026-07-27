/**
 * A node of the tree rendered by `wt-tree` / `wt-tree-line`.
 *
 * TODO(types): nodes are consumer-supplied and every field the components read
 * (`itemLabel`, `itemData`, `childrenProp`, `searchedProp`) is a prop-driven
 * runtime key, so the shape cannot be described without making the whole tree
 * generic over the node type.
 */
// biome-ignore lint/suspicious/noExplicitAny: consumer-supplied node shape, see TODO above
export type WtTreeNode = any;
