import {
	Box,
	createTheme,
	CssBaseline,
	Palette,
	PaletteMode,
	ThemeProvider,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import MainPage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import useThemeHook from "./mui/themes";

const UserEdit = React.lazy(() => import("./components/UserEdit"));
const GlobalConfirmation = React.lazy(
	() => import("./components/GlobalConfirmation")
);
const GlobalNotification = React.lazy(
	() => import("./components/GlobalNotification")
);

function App() {
	const [currentTheme, toggleMode] = useThemeHook();

	return (
		<>
			<ThemeProvider theme={currentTheme}>
				<CssBaseline />
				<Box sx={{ position: "relative", display: "flex" }}>
					{/* <SideBar /> */}
					<GlobalNotification />
					<GlobalConfirmation />
					<Box sx={{ width: "100%" }}>
						<NavBar toggleMode={toggleMode} />
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
								<Route path="/" element={<Users />}>
									<Route path="/:id" element={<UserEdit />} />
								</Route>

								<Route path="/login" element={<Login />} />
								<Route path="/home" element={<MainPage />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</React.Suspense>
					</Box>
				</Box>
			</ThemeProvider>
		</>
	);
}

export default App;
