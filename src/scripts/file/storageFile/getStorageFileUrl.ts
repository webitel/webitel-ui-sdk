interface GetStorageFileUrlParams {
	id: string;
	type?: string;
}

export const getStorageFileUrl = ({
	id,
	type,
}: GetStorageFileUrlParams): string => {
	const token = localStorage.getItem('access-token');
	let url = `${import.meta.env.VITE_API_URL}/storage/file/${id}/download?access_token=${token}`;

	const source = type?.match(/source=[^;]+/)?.[0];
	if (source) url = `${url}&${source}`;

	return url;
};
