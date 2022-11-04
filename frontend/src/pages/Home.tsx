import { nanoid } from "@reduxjs/toolkit";
import {
	decrement,
	increment,
	selectCountState,
} from "../app/features/counterSlice";
import { showNotification } from "../app/features/notificationSlice";
import { userStatus } from "../app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addConfirmation } from "../app/features/confirmationSlice";
import { RootState } from "../app/store";
import { useGetUserByIdQuery } from "../app/api/apiSlice";

export default function MainPage() {
	const data = useSelector(selectCountState);
	const dispatch = useDispatch();

	const status = useSelector(userStatus);
	const { data: data2, isLoading } = useGetUserByIdQuery(
		"634ad56012f79e18e6ec2c4f"
	);

	console.log(data2, 2);

	return (
		<div>
			<h1> Testing ground for logic </h1>
			<h1>Value : {data.count}</h1>
			<button
				onClick={() => {
					dispatch(increment());
					dispatch(
						showNotification({
							message: "Success notification sample ",
							variant: "success",
						})
					);
					dispatch(
						addConfirmation({
							message: "Hello Sample",
							actionClick: () => console.log(data.count),
						})
					);
				}}
			>
				increment
			</button>
			<button
				onClick={() => {
					dispatch(
						showNotification({
							message: "Something wrong sample",
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
