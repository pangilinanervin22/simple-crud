import { Outlet } from "react-router-dom";
import UserTable from "../components/UserTable";

export default function Users() {
	return (
		<>
			<Outlet />
			<UserTable />
		</>
	);
}
