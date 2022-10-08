import {
	deleteManyUser,
	deleteUser,
	resetUser,
	selectAllUsers,
} from "../app/features/userSlice";
import { useSelector } from "react-redux";
import MainTable from "./MainTable";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Users } from "../types";
import { useNavigate } from "react-router-dom";
import { addConfirmation } from "../app/features/confirmationSlice";
import { showNotification } from "../app/features/notificationSlice";
import { useDispatch } from "react-redux";

export interface Column {
	label: "Name" | "Age" | "Position" | "Gender";
	path: string;
	align?: "right" | "left";
	width?: number | string;
	content?: ReactJSXElement;
}

const Columns: Column[] = [
	{ label: "Name", path: "name", align: "left", width: "auto" },
	{ label: "Age", path: "age", align: "right", width: "10%" },
	{ label: "Position", path: "position", align: "right", width: "20%" },
	{ label: "Gender", path: "gender", align: "right", width: "15%" },
];

export default function UserTable() {
	const data: Array<Users> = useSelector(selectAllUsers);
	const redirect = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<MainTable
				data={data}
				base={Columns}
				handleAdd={handleAdd}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				handleTrash={handleTrash}
				handleRefresh={handleRefresh}
			/>
		</>
	);

	function handleAdd() {
		redirect("new", { replace: true });
	}

	function handleEdit(id: string) {
		redirect(id, { replace: true });
	}

	function handleDelete(id: string, event: Function) {
		dispatch(
			addConfirmation({
				message: "Are you sure you want to delete this user?",
				actionClick: () => {
					event();
					dispatch(deleteUser(id));
					dispatch(
						showNotification({
							message: "Successfully delete user",
							variant: "success",
						})
					);
				},
			})
		);
	}

	function handleTrash(temp: [], event: Function) {
		dispatch(
			addConfirmation({
				message: "Are you sure you want to delete this users?",
				actionClick: () => {
					event();
					dispatch(deleteManyUser(temp));
					dispatch(
						showNotification({
							message: "Successfully delete users",
							variant: "success",
						})
					);
				},
			})
		);
	}

	function handleRefresh() {
		dispatch(
			addConfirmation({
				message: "This action will reset all users?",
				actionClick: () => {
					dispatch(resetUser());
					dispatch(
						showNotification({
							message: "Successfully reset users",
							variant: "success",
						})
					);
				},
			})
		);
	}
}
