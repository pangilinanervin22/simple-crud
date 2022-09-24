import { nanoid } from "@reduxjs/toolkit";
import {
	decrement,
	increment,
	selectCountState,
} from "@root/app/features/counterSlice";
import { showNotification } from "@root/app/features/notificationSlice";
import { userStatus } from "@root/app/features/userSlice";
import { allUsers } from "@root/data/users";
import { useDispatch, useSelector } from "react-redux";

export default function MainPage() {
	const data = useSelector(selectCountState);
	const dispatch = useDispatch();

	const status = useSelector(userStatus);

	console.log(status, 2);

	return (
		<div>
			<h1>Value : {data.count}</h1>
			<button
				onClick={() => {
					dispatch(
						showNotification({
							message: "hey",
							variant: "success",
						})
					);

					dispatch(increment());
				}}
			>
				increment
			</button>
			<button
				onClick={() => {
					dispatch(
						showNotification({
							message: "hey",
							variant: "error",
						})
					);
					dispatch(decrement());
				}}
			>
				decrement
			</button>
			<button
				onClick={() => {
					dispatch(
						showNotification({
							message: "wew",
							variant: "error",
						})
					);
					dispatch(decrement());
				}}
			>
				hello
			</button>
		</div>
	);
}
