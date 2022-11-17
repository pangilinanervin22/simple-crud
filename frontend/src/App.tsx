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

const UserEdit = React.lazy(() => import("./components/UserEdit"));
const GlobalConfirmation = React.lazy(
	() => import("./components/GlobalConfirmation")
);
const GlobalNotification = React.lazy(
	() => import("./components/GlobalNotification")
);

function App() {
	const [themeMode, setThemeMode] = useState<PaletteMode>("dark");

	const theme = createTheme({
		palette: {
			mode: themeMode,

			primary: {
				main: "#0080ff",
			},
			secondary: {
				main: "#19857b",
			},
			error: {
				main: "#ff0000",
			},
		},

		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						color: "whitesmoke",
					},
				},
				defaultProps: {
					size: "small",
				},
			},
			MuiTableSortLabel: {
				styleOverrides: {
					root: {
						fontSize: "18px",
						fontWeight: "bold",
						opacity: "0.8",
						"&.Mui-active": { fontSize: "150%", opacity: "1" },
					},
				},
			},
		},

		typography: {
			fontWeightBold: "bolder",
			fontWeightRegular: "500",
			fontWeightLight: "normal",
			fontFamily:
				"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box sx={{ position: "relative", display: "flex" }}>
					{/* <SideBar /> */}
					<GlobalNotification />
					<GlobalConfirmation />
					<Box sx={{ width: "100%" }}>
						<NavBar toggleMode={setThemeMode} mode={themeMode} />
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
