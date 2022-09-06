import {
	CircularProgress,
	Paper,
	TablePagination,
	TableSortLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import UserHeaderTable from "./UserHeaderTable";
import UserToolTable from "./UserToolTable";
import { Column, Users } from "@root/types";
import UserBodyTable from "./UserBodyTable";
import { paginate } from "@root/utils/paginate";
import { sortPath } from "@root/utils/sortPath";
import { allUsers } from "@root/data/users";
import { useDispatch, useSelector } from "react-redux";

import {
	deleteUser,
	selectAllUsers,
	updateUser,
} from "@root/app/features/userSlice";

const Columns: Column[] = [
	{ label: "Name", path: "name", align: "left" },
	{ label: "Age", path: "age", align: "right" },
	{ label: "Position", path: "position", align: "right" },
	{ label: "Gender", path: "gender", align: "right" },
];

export default function MainTable() {
	const data = useSelector(selectAllUsers);
	console.log(data);

	const [state, setState] = useState({
		currentPage: 0,
		pageSize: 5,
		sortColumn: { path: "name", order: "asc" },
		searchQuery: "",
	});

	const { currentPage, pageSize, sortColumn, searchQuery } = state;
	let sizeData = data.length;

	let sortedData = data;
	if (searchQuery) {
		sortedData = data.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		sizeData = sortedData.length;
	}
	sortedData = sortPath(sortedData, sortColumn.path, sortColumn.order);
	sortedData = paginate(sortedData, currentPage, pageSize);

	return (
		<>
			<Paper
				sx={{
					width: "800px",
					marginInline: "auto",
					mt: "10px",
					overflow: "hidden",
				}}
			>
				<UserToolTable handleSearch={handleSearch} />
				<UserHeaderTable base={Columns} render={renderCellHeader} />
				{sortedData.length === 0 ? (
					<Box
						height="350px"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<CircularProgress />
					</Box>
				) : (
					<UserBodyTable content={sortedData} base={Columns} />
				)}
				<TablePagination
					component="div"
					sx={{ background: "#1498C1" }}
					page={currentPage}
					count={sizeData}
					rowsPerPage={pageSize}
					rowsPerPageOptions={[5, 15, 30]}
					onPageChange={handlePage}
					onRowsPerPageChange={handlePageSize}
				></TablePagination>
			</Paper>
		</>
	);

	function handlePage(skipMUI: any, value: number) {
		setState((prevState) => ({ ...prevState, currentPage: value }));
	}

	function handlePageSize(event: any) {
		console.log(event.target.value);

		setState((prevState) => ({
			...prevState,
			pageSize: event.target.value,
			currentPage: 0,
		}));
	}

	function handleHeaderClick(path: string) {
		let temp = { ...state.sortColumn };

		if (temp.path === path)
			temp.order = temp.order === "asc" ? "desc" : "asc";
		else temp = { path, order: "asc" };

		setState((prevState) => ({
			...prevState,
			sortColumn: temp,
			currentPage: 0,
		}));
	}

	function handleSearch(value: string) {
		setState((prevState) => ({
			...prevState,
			searchQuery: value,
			currentPage: 0,
		}));
	}

	function renderCellHeader(item: Column) {
		if (item.path)
			return (
				<TableSortLabel
					active={state.sortColumn.path === item.path}
					direction={state.sortColumn.order}
					onClick={() => handleHeaderClick(item.path)}
				>
					{item.label}
				</TableSortLabel>
			);

		return <></>;
	}
}
