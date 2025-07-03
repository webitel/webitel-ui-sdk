/**
 * Creates a default response object for list operations
 * @returns Default list response object with empty items array and next=false
 */
export const getDefaultGetListResponse = ({} = {}) => ({
	items: [],
	next: false,
});
