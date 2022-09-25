import MainTable from "../components/MainTable";
import { Outlet } from "react-router-dom";

export default function Users() {
	return (
		<>
			<Outlet />
			<MainTable />
		</>
	);
}
