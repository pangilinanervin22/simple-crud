import { Button, Snackbar } from "@mui/material";
import {
	closeNotification,
	selectNotificationState,
	showNotification,
} from "@root/app/features/notificationSlice";
import { useAppDispatch } from "@root/app/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function GlobalNotification() {
	const notificationState = useSelector(selectNotificationState);
	const dispatch = useDispatch();

	console.log(notificationState);

	const handleClick = () => {
		dispatch(showNotification());
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;

		dispatch(closeNotification());
	};
	return (
		<>
			<Button onClick={handleClick}>Open simple snackbar</Button>
			<Snackbar
				open={notificationState.open}
				autoHideDuration={2000}
				onClose={handleClose}
				message="Note archived"
			/>
		</>
	);
}
