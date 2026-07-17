/**
 * @summary Lists the history of PDF exports for a specific agent.
 */
export declare const ListScreenrecordingExportsParams: any;
export declare const ListScreenrecordingExportsQueryParams: any;
export declare const listScreenrecordingExportsResponseItemsItemStatusDefault =
	'EXPORT_STATUS_UNSPECIFIED';
export declare const ListScreenrecordingExportsResponse: any;
/**
 * @summary Creates a new task to generate a PDF export for an agent's screen recordings.
This operation is asynchronous and returns a task metadata.
 */
export declare const CreateScreenrecordingExportParams: any;
export declare const CreateScreenrecordingExportBody: any;
export declare const createScreenrecordingExportResponseStatusDefault =
	'EXPORT_STATUS_UNSPECIFIED';
export declare const CreateScreenrecordingExportResponse: any;
/**
 * @summary Lists the history of PDF exports for a specific call ID.
 */
export declare const ListCallExportsParams: any;
export declare const ListCallExportsQueryParams: any;
export declare const listCallExportsResponseItemsItemStatusDefault =
	'EXPORT_STATUS_UNSPECIFIED';
export declare const ListCallExportsResponse: any;
/**
 * @summary Creates a new task to generate a PDF export for a specific call.
Useful for documenting call transcripts or associated media.
 */
export declare const CreateCallExportParams: any;
export declare const CreateCallExportBody: any;
export declare const createCallExportResponseStatusDefault =
	'EXPORT_STATUS_UNSPECIFIED';
export declare const CreateCallExportResponse: any;
/**
 * @summary Deletes a specific export record from the history.
 */
export declare const DeleteExportParams: any;
export declare const DeleteExportResponse: any;
