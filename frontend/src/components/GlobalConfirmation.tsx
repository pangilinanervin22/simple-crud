import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	closeConfirmation,
	selectConfirmationState,
} from "../app/features/confirmationSlice";

export default function GlobalConfirmation() {
	const dispatch = useDispatch();
	const state = useSelector(selectConfirmationState);

	return (
		<>
			<Dialog open={state.open} maxWidth="lg">
				<DialogTitle> {state.message} </DialogTitle>
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
		state.actionClick();
		handleActions();
	}

	function handleActions() {
		dispatch(closeConfirmation());
	}
}
