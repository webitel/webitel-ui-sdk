const processFile = (file, { charset = 'utf-8' } = {}) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', (e) => {
			const loadedFile = e.target.result;
			resolve(loadedFile);
		});
		reader.addEventListener('error', (e) => reject(e));
		reader.readAsText(file, charset);
	});

export default processFile;
