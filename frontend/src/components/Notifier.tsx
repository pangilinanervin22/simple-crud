import {
	removeNotistack,
	selectNotiStackState,
} from "@root/app/features/notistackSlice";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Notifiers() {
	return (
		<>
			<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
				<Notifier />
			</SnackbarProvider>
		</>
	);
}

function Notifier() {
	const notification = useSelector(selectNotiStackState);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	// useEffectt(() => {
	// 	notification.forEach(
	// 		({ key, message,}) => {
	// 			// if (dismissed) {
	// 			//     // dismiss snackbar using notistack
	// 			//     closeSnackbar(key);
	// 			//     return;
	// 			// }

	// 			// do nothing if snackbar is already displayed
	// 			// if (displayed.includes(key)) return;

	// 			// display snackbar using notistack
	// 			enqueueSnackbar(message, {
	// 				key,

	// 				onExited: (event, myKey) => {
	// 					// remove this snackbar from redux store
	// 					console.log("removing " + myKey);
	// 					dispatch(removeNotistack(myKey));
	// 					removeDisplayed(myKey);
	// 				},
	// 			});

	// 			// keep track of snackbars that we've displayed
	// 			storeDisplayed(key);
	// 		}
	// 	);
	// }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

	return (
		<>
			<h1>Notistack</h1>
			<button onClick={() => enqueueSnackbar("That was easy!")}>
				Show snackbar
			</button>
		</>
	);
}
