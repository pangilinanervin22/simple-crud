import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import MainPage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import React from "react";
import { CircularProgress } from "@mui/material";
import SideBar from "./components/SideBar";
import UserEditFetch from "./components/UserEditFetch";

const UserEdit = React.lazy(() => import("./components/UserEdit"));
const GlobalConfirmation = React.lazy(
	() => import("./components/GlobalConfirmation")
);
const GlobalNotification = React.lazy(
	() => import("./components/GlobalNotification")
);

function App() {
	return (
		<>
			<Box sx={{ position: "relative", display: "flex" }}>
				<SideBar />
				<GlobalNotification />
				<GlobalConfirmation />
				<Box sx={{ width: "100%" }}>
					<NavBar />
					<React.Suspense
						fallback={
							<Box
								sx={{
									height: "350px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<CircularProgress />
							</Box>
						}
					>
						<Routes>
							{/* <Route path="/" element={<Users />}>
								<Route path="/:id" element={<UserEdit />} />
							</Route> */}
							<Route path="/" element={<Users />}>
								<Route
									path="/:id"
									element={<UserEditFetch />}
								/>
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
