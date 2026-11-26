import { PdfServicesAPI } from '@webitel/api-services/api';
import type { StorageFile } from '@webitel/api-services/gen/models';
import { downloadFile, FileFormat } from '@webitel/api-services/scripts';

export const downloadScreenRecordingsArchive = async ({
	callId,
	selected,
}: {
	callId: string;
	selected: StorageFile[];
}) => {
	const fileIds = selected.reduce<string[]>((ids, { id }) => {
		if (id) ids.push(id);
		return ids;
	}, []);

	const response = await PdfServicesAPI.downloadCallScreenrecordingArchive({
		callId,
		fileIds,
	});

	downloadFile({
		response,
		fileFormat: FileFormat.ZIP,
		filename: `screen-recordings-${callId}-${new Date().toISOString().slice(0, 10)}`,
	});
};
