/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
export type SearchCases2Params = {
    /**
     * Page number for pagination.
     */
    page?: number;
    /**
     * Number of results per page.
     */
    size?: number;
    /**
     * Query string for searching cases.
     */
    q?: string;
    /**
     * List of specific case IDs to retrieve.
     */
    ids?: string[];
    /**
     * Sorting criteria (e.g., field:asc).
     */
    sort?: string;
    /**
     * List of fields to include in the response.
     */
    fields?: string[];
    /**
     * Key-value pairs for additional filtering.
     */
    filters?: string[];
};
