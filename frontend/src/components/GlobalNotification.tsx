import { Alert, Snackbar } from "@mui/material";
import {
	closeNotification,
	selectNotificationState,
} from "../app/features/notificationSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function GlobalNotification() {
	const notification = useSelector(selectNotificationState);
	const dispatch = useDispatch();

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;

		dispatch(closeNotification());
	};

	return (
		<>
			{/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
			<Snackbar
				open={notification.open}
				autoHideDuration={notification.timeout}
				onClose={handleClose}
				key={notification.variant + notification.message}
			>
				<Alert severity={notification.variant}>
					{notification.message}
				</Alert>
			</Snackbar>
		</>
	);
}
