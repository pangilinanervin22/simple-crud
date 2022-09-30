import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	Box,
} from "@mui/material";
import { showNotification } from "../../app/features/notificationSlice";
import { deleteUser, userById } from "../../app/features/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserDeleteConfirmation() {
	const [isOpen, setIsOpen] = useState(true);

	const params = useParams();
	const dispatch = useDispatch();
	const redirect = useNavigate();
	const data = useSelector((state: any) => userById(state, params.id!));

	return (
		<>
			<Dialog open={isOpen} maxWidth="lg">
				<DialogTitle>
					Are you sure you want to delete this user
				</DialogTitle>
				<DialogContent>
					<DialogActions
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							type="submit"
							variant="contained"
							color="error"
							onClick={handleConfirm}
						>
							Confirm
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={handleActions}
						>
							Cancel
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);

	function handleConfirm() {
		handleActions();
		dispatch(deleteUser(params.id));
		dispatch(
			showNotification({
				message: "Successfully delete " + data?.name,
				variant: "success",
			})
		);
	}

	function handleActions() {
		redirect("../", { replace: true });
		setIsOpen(false);
	}
}
