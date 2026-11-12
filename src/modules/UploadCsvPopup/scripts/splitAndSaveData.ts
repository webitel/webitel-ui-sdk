export interface SaveChunkContext {
	/** [Claude] for callbacks saving row by row: report rows saved so far in this chunk, for a finer progress */
	onItemsSaved: (savedInChunk: number) => void;
}

const splitAndSaveData = async ({
	data,
	saveCallback,
	onProgress,
}: {
	data: unknown[];
	saveCallback?: (
		chunk: unknown[],
		context: SaveChunkContext,
	) => unknown | Promise<unknown>;
	/** [Claude] total rows saved so far */
	onProgress?: (saved: number) => void;
}) => {
	const chunkSize = 100;
	const chunksCount = Math.ceil(data.length / chunkSize);
	let processedChunkIndex = 1;
	try {
		for (; processedChunkIndex <= chunksCount; processedChunkIndex += 1) {
			const offset = (processedChunkIndex - 1) * chunkSize;
			const chunk = data.slice(offset, processedChunkIndex * chunkSize);
			await saveCallback?.(chunk, {
				onItemsSaved: (savedInChunk) => onProgress?.(offset + savedInChunk),
			});
			onProgress?.(offset + chunk.length);
		}
	} catch (err) {
		const errMessage = JSON.stringify(err instanceof Error ? err.message : err);

		throw new Error(
			`An error occurred during saving ${
				(processedChunkIndex - 1) * chunkSize
			}-${processedChunkIndex * chunkSize} data chunk: ${errMessage}`,
		);
	}
};

export default splitAndSaveData;
