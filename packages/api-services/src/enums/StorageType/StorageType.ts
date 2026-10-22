/** [Claude] the `type` of a file storage backend ("storage" in the admin ui) */
export const StorageType = {
	Local: 'local',
	S3: 's3',
	Backblaze: 'backblaze',
	Dropbox: 'dropbox',
	Drive: 'drive',
} as const;

export type StorageType = (typeof StorageType)[keyof typeof StorageType];
