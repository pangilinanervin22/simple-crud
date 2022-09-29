import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import GlobalNotification from "./components/GlobalNotification";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import UserDeleteConfirmation from "./components/MainTable/UserDelete";
import Login from "./pages/Login";
import MainPage from "./pages/Home";
import NotFound from "./pages/NotFound";
import User from "./components/MainTable/UserEdit";
import Users from "./pages/Users";

function App() {
	console.log(" render app");

	return (
		<>
			<Box sx={{ position: "relative", display: "flex" }}>
				<SideBar />
				<GlobalNotification />
				<Box sx={{ width: "100%" }}>
					<NavBar />
					<Routes>
						<Route path="/users/" element={<Users />}>
							<Route
								path="delete/:id"
								element={<UserDeleteConfirmation />}
							/>
							<Route path=":id" element={<User />} />
						</Route>

						<Route path="/login" element={<Login />} />
						<Route path="" element={<MainPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Box>
			</Box>
		</>
	);
}

export default App;
