import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Box,
	TextField,
	InputAdornment,
	IconButton,
	CircularProgress,
} from "@mui/material";
import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { paginate } from "./utils/paginate";
import { sortPath } from "./utils/sortPath";

export default class MainTable extends Component {
	state = {
		currentPage: 0,
		pageSize: 15,
		sortColumn: { path: "title", order: "asc" },
		searchQuery: "",
	};

	render() {
		const { tableBase, handleOpenDialog, tableData, refreshData } =
			this.props;

		return (
			<>
				<Paper
					sx={{
						width: "800px",
						margin: "auto",
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							m: "8px",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<TextField
							size="small"
							onChange={this.handleSearch}
							placeholder={`Search title`}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						<Box>
							<IconButton
								onClick={refreshData}
								size="medium"
								color="primary"
							>
								<RefreshIcon fontSize="large" />
							</IconButton>
							<Button
								variant="contained"
								onClick={handleOpenDialog}
							>
								Add new data
							</Button>
						</Box>
					</Box>
					<Table>
						<TableHead sx={{ background: "#e8e800" }}>
							<TableRow>
								{tableBase.map((item) => (
									<TableCell
										width="25%"
										sx={{ fontSize: "20px" }}
										key={item.path || item.key}
									>
										{this.renderCellHeader(
											item,
											this.state.sortColumn
										)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
					</Table>
					{tableData.length === 0 ? (
						<Box
							height="350px"
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<CircularProgress />
						</Box>
					) : (
						<TableContainer sx={{ height: 350 }}>
							<Table size="medium">
								<TableBody>
									{this.getDataTable().map((item) => (
										<TableRow key={item.id}>
											{tableBase.map((base) => (
												<TableCell
													width="25%"
													key={base.path || base.key}
												>
													{this.renderCellBody(
														item,
														base
													)}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					<TablePagination
						component="div"
						sx={{ background: "#e8e800" }}
						page={this.state.currentPage}
						count={tableData.length}
						rowsPerPage={this.state.pageSize}
						rowsPerPageOptions={[5, 15, 30]}
						onPageChange={this.handlePage}
						onRowsPerPageChange={this.handlePageSize}
					></TablePagination>
				</Paper>
			</>
		);
	}

	//utility
	getDataTable = () => {
		const { tableData } = this.props;
		const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
		let data = [...tableData];

		if (searchQuery)
			data = data.filter((item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase())
			);

		data = paginate(data, currentPage, pageSize);
		data = sortPath(data, sortColumn.path, sortColumn.order);

		return data;
	};

	// event handlers
	handlePage = (event, value) => {
		this.setState({ currentPage: value });
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: event.target.value, currentPage: 0 });
	};

	handleHeaderClick = (path) => {
		let temp = { ...this.state.sortColumn };

		if (temp.path === path)
			temp.order = temp.order === "asc" ? "desc" : "asc";
		else temp = { path, order: "asc" };

		this.setState({ sortColumn: { ...temp } });
	};

	handleSearch = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	renderCellBody(item, base) {
		if (base.content) return base.content(item);

		return item[base.path];
	}

	renderCellHeader(item, sortObject) {
		if (item.path)
			return (
				<TableSortLabel
					active={sortObject.path === item.path}
					direction={sortObject.order || ""}
					onClick={() => this.handleHeaderClick(item.path)}
				>
					{item.label}
				</TableSortLabel>
			);

		return <></>;
	}
}
