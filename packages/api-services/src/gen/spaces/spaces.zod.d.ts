/**
 * | Field       | Type
 * | ----------- | ----
 * | **----------- READ-ONLY -----------** |
 * | `id`        | int64
 * | `ver`       | int32
 * | `etag`      | string
 * | **---------- OPERATIONAL ----------** |
 * | `created_at` | int64(epoch:milli)
 * | `created_by` | lookup(user)
 * | `updated_at` | int64(epoch:milli)
 * | `updated_by` | lookup(user)
 * | **---------- ATTRIBUTES -----------** |
 * | `name`      | name!
 * | `home_page`   | string (home_page)
 * | `state`       | bool
 * | `has_children`| bool
 */
export declare const listSpacesSpacesQuerySortItemDefault = "id";
export declare const listSpacesSpacesQuerySortItemRegExp: RegExp;
export declare const listSpacesSpacesQueryFieldsItemDefault = "*";
export declare const ListSpacesSpacesQueryParams: any;
export declare const ListSpacesSpacesResponse: any;
/**
 * @summary Create NEW Space
 */
export declare const CreateSpaceSpacesQueryParams: any;
export declare const CreateSpaceSpacesBodyItem: any;
export declare const CreateSpaceSpacesBody: any;
export declare const CreateSpaceSpacesResponse: any;
/**
 * @summary Remove Space source
 */
export declare const DeleteSpaceSpacesParams: any;
export declare const DeleteSpaceSpacesQueryParams: any;
export declare const DeleteSpaceSpacesResponse: any;
/**
 * @summary Locate spaces source
 */
export declare const LocateSpaceSpacesParams: any;
export declare const LocateSpaceSpacesQueryParams: any;
export declare const LocateSpaceSpacesResponse: any;
/**
 * @summary NEW Update of the Space source
 */
export declare const UpdateSpaceSpacesParams: any;
export declare const UpdateSpaceSpacesQueryParams: any;
export declare const UpdateSpaceSpacesBody: any;
export declare const UpdateSpaceSpacesResponse: any;
