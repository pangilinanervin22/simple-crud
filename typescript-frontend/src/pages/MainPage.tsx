import { nanoid } from "@reduxjs/toolkit";
import {
	decrement,
	increment,
	selectCountState,
} from "@root/app/features/counterSlice";
import { showNotification } from "@root/app/features/notificationSlice";
import {
	addUser,
	selectAllUsers,
	userStatus,
	selectUserById,
	selectUserState,
	updateUser,
} from "@root/app/features/userSlice";
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
					dispatch(showNotification());
					dispatch(increment());
				}}
			>
				increment
			</button>
			<button onClick={() => dispatch(decrement())}>decrement</button>
			<button>hello</button>
		</div>
	);
}
