import React from "react";
import httpService from "../services/httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const apiEndpoint = "http://localhost:4000/api/movies/";

export default class ClassTable extends React.Component {
	static propTypes = { title: PropTypes.string };

	state = {
		tableData: [],
	};

	render() {
		return (
			<React.Fragment>
				<ToastContainer position="top-center" theme="light" />
				<h1>{this.props.title}</h1>
				<button className="button-add" onClick={this.handleAdd}>
					Add
				</button>
				<button className="button-update" onClick={this.getData}>
					Update
				</button>
				<button className="button-error" onClick={this.handleError}>
					Error
				</button>

				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.tableData.map((post) => (
							<tr key={post._id}>
								<td>{post.title}</td>
								<td>{post.genre}</td>

								<td>
									<button
										className="button-update"
										onClick={() => this.handleUpdate(post)}
									>
										Update
									</button>
								</td>
								<td>
									<button
										className="button-delete"
										onClick={() => this.handleDelete(post)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}

	async componentDidUpdate() {
		// own rest api  nodeJs from : restOnlySample
		const res = await httpService.get(apiEndpoint);
		this.setState({ tableData: res.data });
	}

	async componentDidMount() {
		// own rest api  nodeJs from : restOnlySample
		const res = await httpService.get(apiEndpoint);
		this.setState({ tableData: res.data });
	}

	getData = async () => {
		const res = await httpService.get(apiEndpoint);
		this.setState({ tableData: res.data });
		return res.data;
	};

	handleAdd = async () => {
		const obj = { title: `Mosh`, genre: `Educational` };

		const res = await httpService.post(apiEndpoint, obj);
		const tableData = [...this.state.tableData, res.data];

		this.setState({ tableData });
	};

	handleUpdate = async (post) => {
		post.title = "updated";

		this.setState({ tableData: [...this.state.tableData] });

		await httpService.put(`${apiEndpoint}/${post._id}`, {
			title: post.title,
			genre: post.genre,
		});
	};

	handleDelete = async (post) => {
		console.log(post);
		const origTableState = this.state.tableData;
		const temp = this.state.tableData.filter((index) => index._id !== post._id);

		this.setState({ tableData: temp });

		try {
			// if error it will back to orig state
			await httpService.delete(`${apiEndpoint}/${post._id}`);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				console.log(ex.response, ex.response.status);
				alert("Eror index not found ");
			}
			this.setState({ tableData: origTableState });
		}
	};

	handleError = async (post) => {
		console.log(post);
		try {
			//unexpected error
			await httpService.delete(`s${apiEndpoint}/${post._id}`);
			//expected error
			// await axios.delete(`$s{apiEndpoint}/${post.id}`);
		} catch (ex) {
			if (ex.response) alert("Expected Error ");
		}
	};
}
