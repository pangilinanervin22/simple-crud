import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import MainTable from "./MovieTable";
import MovieFormDialog from "./MovieFormDialog";
import useToggle from "../../hooks/useToggle";
import MovieDeleteDialog from "./MovieDeleteDialog";
import httpService from "../../services/httpService";
import { useGlobalContext } from "../../context";

const apiEndpoint = "http://localhost:3000/movies/";

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
	const { movies, loading, openSnackBar } = useGlobalContext();

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
				handleConfirmDialog={addMovie}
				handleOpenDialog={() => {
					setToggleForm();
					resetForm();
				}}
			/>
			<MovieDeleteDialog
				isOpen={toggleDelete}
				currentObject={pickData}
				handleDelete={deleteMovie}
				handleOpenDialog={() => {
					setToggleDelete();
					resetForm();
				}}
			/>
			<MainTable
				tableBase={base}
				handleOpenDialog={setToggleForm}
				tableData={tableData}
				refreshData={fetchData}
			/>
		</>
	);

	async function fetchData() {
		const res = await httpService.get(apiEndpoint);

		setTableData(res.data);
	}

	function resetForm() {
		setPickData({
			title: "",
			genre: "",
		});
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

			openSnackBar("success", "Successful action");
		} catch (error) {
			openSnackBar("error", `${post.title} are not found`);
		}

		resetForm();
	}

	async function deleteMovie() {
		try {
			await httpService.delete(`${apiEndpoint}/${pickData.id}`);
			openSnackBar(
				"success",
				`${pickData.title} are successfully deleted`
			);
		} catch (error) {
			openSnackBar("error", `${post.title} are not found`);
		}

		resetForm();
		setToggleDelete();
	}
}
