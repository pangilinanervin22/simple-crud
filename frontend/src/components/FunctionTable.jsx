import React, { useState, useEffect } from "react";
import httpService from "../services/httpService";
import PropTypes from "prop-types";
import FormikSample from "./FormikSample";

const apiEndpoint = "http://localhost:4000/api/movies/";

const FunctionTable = () => {
	const [data, setData] = useState([]);
	const [pickData, setPickData] = useState({});
	const [modalVisibility, setmodalVisibility] = useState(false);

	useEffect(() => {
		async function getData() {
			const res = await httpService.get(apiEndpoint);
			setData(res.data);
		}

		getData();
	}, []);

	return (
		<>
			{modalVisibility ? (
				<FormikSample
					data={pickData}
					isVisible={true}
					handleSubmit={handleSubmit}
					handelCancel={handelCancel}
				/>
			) : null}

			<h1>Function Component</h1>
			<button className="button-add" onClick={onHandleAdd}>
				Add
			</button>
			<button className="button-error" onClick={handleError}>
				Error
			</button>

			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th></th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{data.map((item) => (
						<tr key={item._id}>
							<td>{item.title}</td>
							<td>{item.genre}</td>

							<td>
								<button
									className="button-update"
									onClick={() => {
										setPickData(item);
										setmodalVisibility(true);
									}}
								>
									Update
								</button>
							</td>
							<td>
								<button
									className="button-delete"
									onClick={() => handleDelete(item)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);

	async function getData() {
		const anotherRes = await httpService.get(apiEndpoint);
		setData(anotherRes.data);

		return anotherRes.data;
	}

	async function handleAdd(post) {
		const obj = { title: post.title, genre: post.genre };

		const res = await httpService.post(apiEndpoint, obj);
		console.log(res);
		getData();
	}

	async function handleUpdate(post) {
		await httpService.put(`${apiEndpoint}/${post._id}`, {
			title: post.title,
			genre: post.genre,
		});

		setData([...data]);
		getData();
	}

	async function handleDelete(post) {
		const origTableState = data;
		const temp = data.filter((index) => index._id !== post._id);

		setData(temp);
		try {
			await httpService.delete(`${apiEndpoint}/${post._id}`);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				console.log(ex.response, ex.response.status);
				alert("Eror index not found ");
			}
			setData({ tableData: origTableState });
		}
	}

	async function handleError(post) {
		console.log(post);

		try {
			//unexpected error
			await httpService.delete(`s${apiEndpoint}`);
			//expected error
			// await axios.delete(`$s{apiEndpoint}/${post._id}`);
		} catch (ex) {
			if (ex.response) alert("Expected Error ");
		}
	}

	async function handleSubmit(post, isUpdating = false) {
		if (isUpdating) {
			if (JSON.stringify(post) !== JSON.stringify(pickData))
				await handleUpdate(post);
		} else await handleAdd(post);

		setmodalVisibility(false);
		setPickData({});
	}

	async function onHandleAdd() {
		setPickData({ title: "", genre: "" });
		setmodalVisibility(true);
	}

	function handelCancel() {
		console.log("hey");
		setPickData({ title: "", genre: "" });
		setmodalVisibility(false);
	}
};

FunctionTable.propTypes = {
	data: PropTypes.array,
};

export default FunctionTable;
