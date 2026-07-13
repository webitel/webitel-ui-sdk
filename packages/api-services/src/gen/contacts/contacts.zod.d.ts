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
 * | `about`     | string
 * | `labels`    | list[label!]
 * | `emails`    | list[email!]
 * | `photos`    | list[photo!]
 * | `phones`    | list[phone!]
 * | `managers`  | list[manager!]
 * | `comments`  | list[comment!]
 * | `addresses` | list[address!]
 * | `timezones` | list[timezone!]
 * | `variables` | list[variable!]
 * | `imclients` | list[imClient!]
 * @summary Search for Contact(s)
 */
export declare const searchContactsQuerySortItemDefault = "id";
export declare const searchContactsQuerySortItemRegExp: RegExp;
export declare const searchContactsQueryFieldsItemDefault = "*";
export declare const searchContactsQueryModeDefault = "READ";
export declare const SearchContactsQueryParams: any;
export declare const SearchContactsResponse: any;
/**
 * @summary Create NEW Contact
 */
export declare const CreateContactQueryParams: any;
export declare const createContactBodyVariablesItemKeyRegExp: RegExp;
export declare const CreateContactBody: any;
export declare const CreateContactResponse: any;
/**
 * @summary Bulk create of Contacts.
 */
export declare const CreateContactsQueryParams: any;
export declare const createContactsBodyVariablesItemKeyRegExp: RegExp;
export declare const CreateContactsBodyItem: any;
export declare const CreateContactsBody: any;
export declare const createContactsResponseFailuresItemInputVariablesItemKeyRegExp: RegExp;
export declare const CreateContactsResponse: any;
/**
 * @summary Remove Contact source
 */
export declare const DeleteContactParams: any;
export declare const DeleteContactQueryParams: any;
export declare const DeleteContactResponse: any;
/**
 * @summary Locate Contact source
 */
export declare const LocateContactParams: any;
export declare const locateContactQueryModeDefault = "READ";
export declare const LocateContactQueryParams: any;
export declare const LocateContactResponse: any;
/**
 * @summary NEW Update of the Contact source
 */
export declare const UpdateContactParams: any;
export declare const UpdateContactQueryParams: any;
export declare const updateContactBodyVariablesItemKeyRegExp: RegExp;
export declare const UpdateContactBody: any;
export declare const UpdateContactResponse: any;
