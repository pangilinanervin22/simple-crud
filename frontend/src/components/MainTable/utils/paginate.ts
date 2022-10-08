export function paginate(
	array: any[],
	currentPage: number,
	pageSize = array.length
) {
	const pageStart = currentPage * pageSize;
	const pageEnd = pageSize * (currentPage + 1);
	const items = [...array].slice(pageStart, pageEnd);

	return items;
}
