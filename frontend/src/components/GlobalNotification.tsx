import { Alert, Snackbar } from "@mui/material";
import {
	closeNotification,
	selectNotificationState,
	showNotification,
} from "@root/app/features/notificationSlice";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function GlobalNotification() {
	const notificationState = useSelector(selectNotificationState);
	const dispatch = useDispatch();

	console.log(notificationState);

	const handleClick = () => {
		dispatch(showNotification({ message: "hey", variant: "error" }));
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;

		dispatch(closeNotification());
	};
	useEffect(() => {
		return () => {};
	}, [notificationState]);

	return (
		<>
			{/* <Button onClick={handleClick}>Open simple snackbar</Button> */}

			<Snackbar
				open={notificationState.open}
				autoHideDuration={notificationState.timeout}
				onClose={handleClose}
				key={notificationState.variant + notificationState.message}
			>
				<Alert severity={notificationState.variant || "error"}>
					{notificationState.message}
				</Alert>
			</Snackbar>
		</>
	);
}
