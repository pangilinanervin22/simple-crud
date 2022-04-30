import { Alert, Button, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import MainTable from "./MovieTable";
import MovieFormDialog from "./MovieFormDialog";
import useToggle from "../../hooks/useToggle";
import MovieDeleteDialog from "./MovieDeleteDialog";
import httpService from "../../services/httpService";

const apiEndpoint = "http://localhost:4000/movies/";

export default function index() {
	const base = [
		{
			path: "title",
			label: "Title",
		},
		{ path: "genre", label: "Genre" },
		{
			key: "edit",
			content: (item) => (
				<Button
					align="right"
					color="primary"
					startIcon={<EditIcon />}
					onClick={() => {
						setPickData(item);
						setToggleForm();
					}}
				>
					Edit
				</Button>
			),
		},
		{
			key: "delete",
			content: (item) => (
				<Button
					align="right"
					color="error"
					startIcon={<DeleteForeverIcon />}
					onClick={() => {
						setPickData(item);
						setToggleDelete();
					}}
				>
					Delete
				</Button>
			),
		},
	];

	const [tableData, setTableData] = useState([]);
	const [toggleForm, setToggleForm] = useToggle(false);
	const [toggleDelete, setToggleDelete] = useToggle(false);
	const [toggleSnackBar, setToggleSnackBar] = useToggle(true);
	const [snackBarData, setSnackBarData] = useState({
		status: "success",
		message: "reload successfully",
	});

	const [pickData, setPickData] = useState({
		title: "",
		genre: "",
	});

	useEffect(() => {
		async function fetchData() {
			const res = await httpService.get(apiEndpoint);

			setTableData(res.data);
		}

		fetchData();
	}, [pickData]);

	return (
		<>
			<MovieFormDialog
				currentObject={pickData}
				isOpen={toggleForm}
				handleOpenDialog={setToggleForm}
				handleConfirmDialog={addMovie}
			/>
			<MovieDeleteDialog
				isOpen={toggleDelete}
				handleOpenDialog={setToggleDelete}
				handleDelete={deleteMovie}
				currentObject={pickData}
			/>
			<MainTable
				tableBase={base}
				handleOpenDialog={setToggleForm}
				tableData={tableData}
			/>

			<Snackbar
				open={toggleSnackBar}
				autoHideDuration={3000}
				onClose={setToggleSnackBar}
				children={"wew"}
			>
				<Alert severity={snackBarData.status} sx={{ width: "100%" }}>
					{snackBarData.message}
				</Alert>
			</Snackbar>
		</>
	);

	function resetForm() {
		setPickData({
			title: "",
			genre: "",
		});
	}

	function openSnackBar(status, message) {
		setSnackBarData({ status, message });
		setToggleSnackBar();
	}

	async function addMovie(post) {
		const obj = { title: post.title, genre: post.genre };

		try {
			if (post.id)
				await httpService.put(`${apiEndpoint}/${post.id}`, {
					title: post.title,
					genre: post.genre,
				});
			else await httpService.post(apiEndpoint, obj);
		} catch (error) {
			openSnackBar("error", error.message);
		}

		resetForm();
	}

	async function deleteMovie() {
		try {
			await httpService.delete(`${apiEndpoint}/${pickData.id}`);
		} catch (error) {
			openSnackBar("error", error.message);
		}

		setToggleDelete();
		resetForm();
	}
}
