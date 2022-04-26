import { Button } from "@mui/material";
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
	const [toggleFormValue, setToggleForm] = useToggle(false);
	const [toggleDeleteValue, setToggleDelete] = useToggle(false);
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
				isOpen={toggleFormValue}
				handleOpenDialog={setToggleForm}
				handleConfirmDialog={addMovie}
			/>
			<MovieDeleteDialog
				isOpen={toggleDeleteValue}
				handleOpenDialog={setToggleDelete}
				handleDelete={deleteMovie}
				currentObject={pickData}
			/>
			<MainTable
				tableBase={base}
				handleOpenDialog={setToggleForm}
				tableData={tableData}
			/>
		</>
	);

	function resetForm() {
		setPickData({
			title: "",
			genre: "",
		});
	}

	async function addMovie(post) {
		const obj = { title: post.title, genre: post.genre };

		console.log(post.id == true);

		if (post.id)
			await httpService.put(`${apiEndpoint}/${post.id}`, {
				title: post.title,
				genre: post.genre,
			});
		else await httpService.post(apiEndpoint, obj);

		resetForm();
	}

	async function deleteMovie() {
		await httpService.delete(`${apiEndpoint}/${pickData.id}`);

		setToggleDelete();
		resetForm();
	}
}
