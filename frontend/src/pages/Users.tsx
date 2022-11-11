import UserTableFetch from "../components/UserTableFetch";
import { Outlet } from "react-router-dom";
import UserTable from "../components/UserTable";

export default function Users() {
	return (
		<>
			<UserTableFetch />
			<Outlet />
			{/* <UserTable /> */}
		</>
	);
}
