import MainTable from "@root/components/MainTable/index";
import { Outlet } from "react-router-dom";

export default function Users() {
	return (
		<>
			<Outlet />
			<MainTable />
		</>
	);
}
