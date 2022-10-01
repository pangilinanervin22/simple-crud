import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import GlobalNotification from "./components/GlobalNotification";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import MainPage from "./pages/Home";
import NotFound from "./pages/NotFound";
import User from "./components/MainTable/UserEdit";
import Users from "./pages/Users";
import React from "react";
import { CircularProgress } from "@mui/material";

const UserDelete = React.lazy(
	() => import("./components/MainTable/UserDelete")
);

const UserEdit = React.lazy(() => import("./components/MainTable/UserEdit"));

function App() {
	return (
		<>
			<Box sx={{ position: "relative", display: "flex" }}>
				<SideBar />
				<GlobalNotification />
				<Box sx={{ width: "100%" }}>
					<NavBar />
					<React.Suspense
						fallback={
							<Box
								height="350px"
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<CircularProgress />
							</Box>
						}
					>
						<Routes>
							<Route path="/" element={<Users />}>
								<Route
									path="delete/:id"
									element={<UserDelete />}
								/>
								<Route path=":id" element={<UserEdit />} />
							</Route>

							<Route path="/login" element={<Login />} />
							<Route path="/home" element={<MainPage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</React.Suspense>
				</Box>
			</Box>
		</>
	);
}

export default App;
