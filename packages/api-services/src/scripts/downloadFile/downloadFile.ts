const downloadFile = (response, filename, mimeType = null) => {
	const blob = new Blob(
		[
			response.data,
		],
		{
			type:
				mimeType ||
				response.headers?.['content-type'] ||
				'application/octet-stream',
		},
	);

	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = filename;

	document.body.appendChild(link);
	link.click();
	link.remove();

	window.URL.revokeObjectURL(url);
};

export default downloadFile;
