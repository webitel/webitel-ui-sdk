import { saveAs } from 'file-saver-es';
import JSZip from 'jszip';

interface FileToDownload {
	id: string;
	name: string;
}

interface DownloadFilesAsZipParams {
	filesToDownload: FileToDownload[];
	apiUrl: string;
	token: string;
}

const downloadFilesAsZip = async ({
	filesToDownload,
	apiUrl,
	token,
}: DownloadFilesAsZipParams) => {
	if (!filesToDownload?.length) return;

	const zip = new JSZip();

	const filePromises = filesToDownload.map(async (item) => {
		const { id, name } = item;
		const fileUrl = `${apiUrl}/storage/file/${id}/download?access_token=${token}`;

		try {
			const response = await fetch(fileUrl);
			if (!response.ok) throw new Error(`Failed to download ${name}`);

			const blob = await response.blob();
			zip.file(name, blob, {
				binary: true,
			});
		} catch (error) {
			throw new Error(`Failed to download ${name}`, {
				cause: error,
			});
		}
	});

	await Promise.all(filePromises);

	try {
		const zipBlob = await zip.generateAsync({
			type: 'blob',
		});
		saveAs(zipBlob, 'files.zip');
	} catch (error) {
		throw new Error('Failed to create ZIP file', {
			cause: error,
		});
	}
};

export default downloadFilesAsZip;
