const formatNow = (timestamp = Date.now()) => {
	const date = new Date(timestamp);

	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');

	return `${yyyy}-${mm}-${dd}_${hh}-${min}`;
};

export default formatNow;
