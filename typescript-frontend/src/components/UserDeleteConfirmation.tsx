import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	Box,
} from "@mui/material";
import { showNotification } from "@root/app/features/notificationSlice";
import { deleteUser } from "@root/app/features/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDeleteConfirmation() {
	const [isOpen, setIsOpen] = useState(true);

	const params = useParams();
	const dispatch = useDispatch();
	const redirect = useNavigate();

	console.log(params.id);

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
		// dispatch(showNotification());
		dispatch(deleteUser(params.id));
		handleActions();
	}

	function handleActions() {
		setIsOpen(false);
		redirect("../", { replace: true });
	}
}
