import {
	Checkbox,
	CheckboxClassKey,
	CheckboxProps,
	CircularProgress,
	Paper,
	TablePagination,
	TableSortLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useMemo, useState } from "react";
import UserHeaderTable from "./UserHeaderTable";
import UserToolTable from "./UserToolTable";
import { Column, Users } from "../../types";
import UserBodyTable from "./UserBodyTable";
import { paginate } from "../../utils/paginate";
import { sortPath } from "../../utils/sortPath";
import { useSelector } from "react-redux";

import { deleteManyUser, selectAllUsers } from "../../app/features/userSlice";
import theme from "../../mui/themes";
import { useDispatch } from "react-redux";
import { addConfirmation } from "../../app/features/confirmationSlice";
import { showNotification } from "../../app/features/notificationSlice";

const Columns: Column[] = [
	{ label: "Name", path: "name", align: "left", width: "auto" },
	{ label: "Age", path: "age", align: "right", width: "10%" },
	{ label: "Position", path: "position", align: "right", width: "20%" },
	{ label: "Gender", path: "gender", align: "right", width: "15%" },
];

export default function MainTable() {
	const dispatch = useDispatch();
	const data = useSelector(selectAllUsers);

	const [page, setPage] = useState({
		current: 0,
		size: 5,
	});

	const [checkList, setCheckList] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortColumn, setSortColumn] = useState<{
		path: string;
		order: "asc" | "desc";
	}>({
		path: "name",
		order: "asc",
	});

	const { current, size } = page;
	let sortedData = [...data];

	//sorting by search query filter
	sortedData = useMemo(
		() =>
			data.filter((item: Users) =>
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
					width: "800px",
					marginInline: "auto",
					mt: "10px",
					overflow: "hidden",
				}}
			>
				<UserToolTable
					handleSearch={handleSearch}
					handleTrash={handleTrash}
					checkList={checkList}
				/>
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
					<UserBodyTable
						base={Columns}
						content={sortedData}
						onCheck={addCheckList}
						checkList={checkList}
					/>
				)}
				<TablePagination
					component="div"
					sx={{ background: theme.palette.primary.main }}
					page={current}
					count={sizeData}
					rowsPerPage={size}
					rowsPerPageOptions={[5, 15, 30]}
					onPageChange={handlePage}
					onRowsPerPageChange={handlePageSize}
				></TablePagination>
			</Paper>
		</>
	);

	function handlePage(skipMUI: any, value: number) {
		setPage({ ...page, current: value });
	}

	function handlePageSize(event: any) {
		console.log(event.target.value);

		setPage({
			size: event.target.value,
			current: 0,
		});
	}

	function handleHeaderClick(path: string) {
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

	function handleSearch(value: string) {
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

	function handleTrash() {
		dispatch(
			addConfirmation({
				message: "Are you sure you want to delete this users?",
				actionClick: () => {
					setCheckList([]);
					setPage({
						...page,
						current: 0,
					});
					dispatch(deleteManyUser(checkList));
					dispatch(
						showNotification({
							message: "Successfully delete many users",
							variant: "success",
						})
					);
				},
			})
		);
	}

	function renderCellHeader(item: Column) {
		if (item.path)
			return (
				<TableSortLabel
					active={sortColumn.path === item.path}
					direction={sortColumn.order}
					onClick={() => handleHeaderClick(item.path)}
				>
					{item.label}
				</TableSortLabel>
			);

		return <></>;
	}
}
