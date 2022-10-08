import {
	Checkbox,
	CircularProgress,
	Paper,
	TablePagination,
	TableSortLabel,
	Box,
} from "@mui/material";
import { useMemo, useState } from "react";
import MainToolTable from "./MainTableTool";
import MainHeaderTable from "./MainTableHeader";
import MainBodyTable from "./MainTableBody";
import { paginate } from "./utils/paginate";
import { sortPath } from "./utils/sortPath";

import theme from "../../mui/themes";

interface thisProps {
	data: Array<any>;
	base: Array<any>;
	handleAdd: Function;
	handleEdit: Function;
	handleDelete: Function;
	handleTrash: Function;
	handleRefresh: Function;
}

interface sortColumnProps {
	path: string;
	order: "asc" | "desc";
}

export interface cellBase {
	path: string;
	label: string;
}

export default function MainTable({
	data,
	base,
	handleAdd,
	handleEdit,
	handleDelete,
	handleTrash,
	handleRefresh,
}: thisProps) {
	const [page, setPage] = useState({
		current: 0,
		size: 5,
	});

	const [checkList, setCheckList] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortColumn, setSortColumn] = useState<sortColumnProps>({
		path: "name",
		order: "asc",
	});

	const { current, size } = page;
	let sortedData = [...data];

	//sorting by search query filter
	sortedData = useMemo(
		() =>
			data.filter((item: any) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[searchQuery, data]
	);

	// declare size of table it may depends on the filter query
	let sizeData = sortedData.length;
	//sorting by path
	sortedData = useMemo(
		() =>
			(sortedData = sortPath(
				sortedData,
				sortColumn.path,
				sortColumn.order
			)),
		[sortColumn, searchQuery, data]
	);
	// pagination table
	sortedData = useMemo(
		() => paginate(sortedData, current, size),
		[page, data]
	);

	return (
		<>
			<Paper
				sx={{
					width: "900px",
					marginInline: "auto",
					mt: "10px",
					overflow: "hidden",
				}}
			>
				<MainToolTable
					checkList={checkList}
					handleSearch={onHandleSearch}
					handleTrash={onHandleTrash}
					handleAdd={onHandleAdd}
					handleRefresh={onHandleRefresh}
				/>
				<MainHeaderTable base={base} renderCell={renderCellHeader} />
				{sortedData.length === 0 ? (
					<Box
						sx={{
							height: "350px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<MainBodyTable
						base={base}
						content={sortedData}
						renderCell={renderCellBody}
						handleDelete={onHandleDelete}
						handleEdit={onHandleEdit}
					/>
				)}
				<TablePagination
					component="div"
					sx={{ background: theme.palette.primary.main }}
					page={current}
					count={sizeData}
					rowsPerPage={size}
					rowsPerPageOptions={[5, 15, 30]}
					onPageChange={onHandlePage}
					onRowsPerPageChange={onHandlePageSize}
				></TablePagination>
			</Paper>
		</>
	);

	function onHandlePage(skipMUI: any, value: number) {
		setPage({ ...page, current: value });
	}

	function onHandlePageSize(event: any) {
		setPage({
			size: event.target.value,
			current: 0,
		});
	}

	function onHandleHeaderClick(path: string) {
		let tempSortColumn = { ...sortColumn };

		if (tempSortColumn.path === path)
			tempSortColumn.order =
				tempSortColumn.order === "asc" ? "desc" : "asc";
		else tempSortColumn = { path, order: "asc" };

		setSortColumn(tempSortColumn);
		setPage({
			...page,
			current: 0,
		});
	}

	function onHandleSearch(value: string) {
		setSearchQuery(value);
		setPage({
			...page,
			current: 0,
		});
	}

	function addCheckList(isCheck: boolean, id: string) {
		const temp = [...checkList];
		if (isCheck) temp.push(id);
		else temp.splice(temp.indexOf(id), 1);

		setCheckList([...temp]);
	}

	function renderCellBody(item: any, base: cellBase) {
		if (base.path === "name")
			return (
				<>
					<Checkbox
						checked={checkList.includes(item.id)}
						onChange={(e, isCheck) =>
							addCheckList(isCheck, item.id)
						}
					/>
					{item[base.path]}
				</>
			);
		return item[base.path];
	}

	function renderCellHeader(item: cellBase) {
		if (item.path)
			return (
				<TableSortLabel
					active={sortColumn.path === item.path}
					direction={sortColumn.order}
					onClick={() => onHandleHeaderClick(item.path)}
				>
					{item.label}
				</TableSortLabel>
			);

		return <></>;
	}

	function onHandleAdd() {
		handleAdd();
	}

	function onHandleEdit(id: string) {
		handleEdit(id);
	}

	function onHandleDelete(id: string) {
		handleDelete(id, () => {
			setCheckList([]);
			setPage({
				...page,
				current: 0,
			});
		});
	}

	function onHandleTrash() {
		handleTrash(checkList, () => {
			setCheckList([]);
			setPage({
				...page,
				current: 0,
			});
		});
	}

	function onHandleRefresh() {
		handleRefresh();
	}
}
