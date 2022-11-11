import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
	useDeleteManyUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../app/api/apiSlice";
import { addConfirmation } from "../app/features/confirmationSlice";
import { showNotification } from "../app/features/notificationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainTable from "./MainTable";

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

export default function UserTableFetch() {
	const { data, refetch, isSuccess } = useGetUsersQuery("");
	const redirect = useNavigate();
	const dispatch = useDispatch();

	const [deleteUser] = useDeleteUserMutation();
	const [deleteManyUser] = useDeleteManyUserMutation();

	return (
		<>
			<MainTable
				data={isSuccess ? data : []}
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
					deleteUser(id);
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
					deleteManyUser(temp);
					refetch();
					event();
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
		refetch();

		// dispatch(
		// 	addConfirmation({
		// 		message: "This action will reset all users?",
		// 		actionClick: () => {
		// 			dispatch(
		// 				showNotification({
		// 					message: "Successfully reset users",
		// 					variant: "success",
		// 				})
		// 			);
		// 		},
		// 	})
		// );
	}
}
