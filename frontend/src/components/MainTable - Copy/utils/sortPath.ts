export function sortPath(array: any[], path: string, order = "asc") {
	if (order !== "asc" && order !== "desc") {
		console.error("Error asc or desc only for order params");
		return array;
	}

	try {
		array = array.sort(function (a, b) {
			let x = a[path].toUpperCase(),
				y = b[path].toUpperCase();
			return x === y ? 0 : x > y ? 1 : -1;
		});
	} catch (e) {
		array = array.sort(function (a, b) {
			let x = a[path],
				y = b[path];
			return y === x ? 0 : y > x ? 1 : -1;
		});
	}

	return order === "asc" ? array : array.reverse();
}
