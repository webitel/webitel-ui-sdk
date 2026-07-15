/**
 * Creates default parameters for get operations with pagination
 * @param options - Options for the parameters
 * @param options.page - Page number (default: 1)
 * @param options.size - Page size (default: 10)
 * @returns Default parameters object with page and size
 */
export declare const getDefaultGetParams: ({ page, size }?: {
    page?: number;
    size?: number;
}) => {
    page: number;
    size: number;
};
