import { Paper, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import UserDeleteConfirmation from "./components/UserDeleteConfirmation";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import Users from "./pages/Users";

function App() {
	console.log(" render");

	return (
		<>
			<Box sx={{ position: "relative", display: "flex" }}>
				<SideBar />
				<Box sx={{ width: "100%" }}>
					<NavBar />
					<Routes>
						<Route path="users" element={<Users />}>
							<Route path=":id" element={<User />} />
							<Route
								path="delete/:id"
								element={<UserDeleteConfirmation />}
							/>
						</Route>

						<Route path="login" element={<Login />} />
						<Route path="" element={<MainPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Box>
			</Box>
		</>
	);
}

export default App;
