import { DownloadFileOptions } from './types/downloadFile.types';

const downloadFile = ({
	response,
	fileFormat,
	filename,
	mimetype = null,
}: DownloadFileOptions) => {
	const blob = new Blob(
		[
			response.data,
		],
		{
			type:
				mimetype ||
				response.headers?.['content-type'] ||
				'application/octet-stream',
		},
	);

	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = filename
		? `${filename}.${fileFormat}`
		: `${response.headers?.['Content-Disposition']}.${fileFormat}`;

	document.body.appendChild(link);
	link.click();
	link.remove();

	window.URL.revokeObjectURL(url);
};

export default downloadFile;
