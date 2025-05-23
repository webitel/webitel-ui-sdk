/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
import { z as zod } from 'zod';
/**
 * @summary With Case
 */
export declare const listLinksParams: zod.ZodObject<{
    case_etag: zod.ZodString;
}, {}, {}>;
export declare const listLinksQueryParams: zod.ZodObject<{
    page: zod.ZodOptional<zod.ZodNumber>;
    size: zod.ZodOptional<zod.ZodNumber>;
    q: zod.ZodOptional<zod.ZodString>;
    ids: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
    sort: zod.ZodOptional<zod.ZodString>;
    fields: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
}, {}, {}>;
export declare const listLinksResponse: zod.ZodObject<{
    items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
        author: zod.ZodOptional<zod.ZodObject<{
            id: zod.ZodOptional<zod.ZodString>;
            name: zod.ZodOptional<zod.ZodString>;
        }, {}, {}>>;
        createdAt: zod.ZodOptional<zod.ZodString>;
        createdBy: zod.ZodOptional<zod.ZodObject<{
            id: zod.ZodOptional<zod.ZodString>;
            name: zod.ZodOptional<zod.ZodString>;
        }, {}, {}>>;
        etag: zod.ZodOptional<zod.ZodString>;
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
        updatedAt: zod.ZodOptional<zod.ZodString>;
        updatedBy: zod.ZodOptional<zod.ZodObject<{
            id: zod.ZodOptional<zod.ZodString>;
            name: zod.ZodOptional<zod.ZodString>;
        }, {}, {}>>;
        url: zod.ZodOptional<zod.ZodString>;
        ver: zod.ZodOptional<zod.ZodNumber>;
    }, {}, {}>>>;
    next: zod.ZodOptional<zod.ZodBoolean>;
    page: zod.ZodOptional<zod.ZodString>;
}, {}, {}>;
export declare const createLinkParams: zod.ZodObject<{
    case_etag: zod.ZodString;
}, {}, {}>;
export declare const createLinkQueryParams: zod.ZodObject<{
    fields: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
    inputEtag: zod.ZodOptional<zod.ZodString>;
    inputUrl: zod.ZodOptional<zod.ZodString>;
    inputName: zod.ZodOptional<zod.ZodString>;
}, {}, {}>;
export declare const createLinkResponse: zod.ZodObject<{
    author: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    createdAt: zod.ZodOptional<zod.ZodString>;
    createdBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    etag: zod.ZodOptional<zod.ZodString>;
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    updatedAt: zod.ZodOptional<zod.ZodString>;
    updatedBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    url: zod.ZodOptional<zod.ZodString>;
    ver: zod.ZodOptional<zod.ZodNumber>;
}, {}, {}>;
export declare const deleteLinkParams: zod.ZodObject<{
    case_etag: zod.ZodString;
    etag: zod.ZodString;
}, {}, {}>;
export declare const deleteLinkResponse: zod.ZodObject<{
    author: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    createdAt: zod.ZodOptional<zod.ZodString>;
    createdBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    etag: zod.ZodOptional<zod.ZodString>;
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    updatedAt: zod.ZodOptional<zod.ZodString>;
    updatedBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    url: zod.ZodOptional<zod.ZodString>;
    ver: zod.ZodOptional<zod.ZodNumber>;
}, {}, {}>;
export declare const locateLinkParams: zod.ZodObject<{
    case_etag: zod.ZodString;
    etag: zod.ZodString;
}, {}, {}>;
export declare const locateLinkQueryParams: zod.ZodObject<{
    fields: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
}, {}, {}>;
export declare const locateLinkResponse: zod.ZodObject<{
    author: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    createdAt: zod.ZodOptional<zod.ZodString>;
    createdBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    etag: zod.ZodOptional<zod.ZodString>;
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    updatedAt: zod.ZodOptional<zod.ZodString>;
    updatedBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    url: zod.ZodOptional<zod.ZodString>;
    ver: zod.ZodOptional<zod.ZodNumber>;
}, {}, {}>;
export declare const updateLink2Params: zod.ZodObject<{
    case_etag: zod.ZodString;
    'input.etag': zod.ZodString;
}, {}, {}>;
export declare const updateLink2QueryParams: zod.ZodObject<{
    fields: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
}, {}, {}>;
export declare const updateLink2Body: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    url: zod.ZodOptional<zod.ZodString>;
}, {}, {}>;
export declare const updateLink2Response: zod.ZodObject<{
    author: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    createdAt: zod.ZodOptional<zod.ZodString>;
    createdBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    etag: zod.ZodOptional<zod.ZodString>;
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    updatedAt: zod.ZodOptional<zod.ZodString>;
    updatedBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    url: zod.ZodOptional<zod.ZodString>;
    ver: zod.ZodOptional<zod.ZodNumber>;
}, {}, {}>;
export declare const updateLinkParams: zod.ZodObject<{
    case_etag: zod.ZodString;
    'input.etag': zod.ZodString;
}, {}, {}>;
export declare const updateLinkQueryParams: zod.ZodObject<{
    fields: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
}, {}, {}>;
export declare const updateLinkBody: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    url: zod.ZodOptional<zod.ZodString>;
}, {}, {}>;
export declare const updateLinkResponse: zod.ZodObject<{
    author: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    createdAt: zod.ZodOptional<zod.ZodString>;
    createdBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    etag: zod.ZodOptional<zod.ZodString>;
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    updatedAt: zod.ZodOptional<zod.ZodString>;
    updatedBy: zod.ZodOptional<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        name: zod.ZodOptional<zod.ZodString>;
    }, {}, {}>>;
    url: zod.ZodOptional<zod.ZodString>;
    ver: zod.ZodOptional<zod.ZodNumber>;
}, {}, {}>;
