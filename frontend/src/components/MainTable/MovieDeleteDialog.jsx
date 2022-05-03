import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React from "react";

export default function MovieDeleteDialog({
	currentObject,
	handleOpenDialog,
	handleDelete,
	isOpen = false,
}) {
	return (
		<>
			<Dialog open={isOpen} onClose={handleOpenDialog}>
				<DialogTitle>{"Confirmation the Action"}</DialogTitle>
				<DialogContent sx={{ minWidth: "500px" }}>
					<DialogContentText>
						{"Are your sure you want delete this data "}
						{currentObject.title}
					</DialogContentText>
					<DialogActions sx={{ mt: 2 }}>
						<Button
							variant="contained"
							color="error"
							onClick={handleDelete}
							autoFocus
						>
							Agree
						</Button>
						<Button variant="contained" onClick={handleOpenDialog}>
							Disagree
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}
