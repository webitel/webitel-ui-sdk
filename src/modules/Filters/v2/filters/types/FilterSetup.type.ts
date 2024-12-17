import type {FilterName} from "../classes/Filter.class.ts";

export enum FilterType {
    Numeric = 'numeric', // primitive number value
    String = 'string', // primitive string value
    Timestamp = 'timestamp', // primitive value representing date
    Enum = 'enum', // select with predefined values
    SystemEntity = 'sysEntity', // select with fetched values
}

export interface MultipleValueFilterSetupData {
    multiple?: boolean; // because defaultValue may be nullish even if it's an array
}

export interface ApiFilterSetupData {
    search?: (params: { page: number, size: number, search?: string, ids?: [] }) => { items: [], next?: boolean };
}

export interface FilterSetupData extends MultipleValueFilterSetupData, ApiFilterSetupData {
    name: FilterName;
    type: FilterType;
    defaultValue: unknown;
}
