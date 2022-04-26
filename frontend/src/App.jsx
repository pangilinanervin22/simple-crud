import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Test from "./components/Test";
import Another from "./components/Another";
import Navbar from "./components/Navbar";
import FirstTest from "./page/FirstTest";
import SecondTest from "./page/SecondTest";
import theme from "./theme/theme";
import SideBar from "./components/SideBar";
import NotFound from "./page/NotFound";
const MUITest = React.lazy(() => import("./components/MUIFlex"));
const MainTable = React.lazy(() => import("./components/MainTable"));
const LoginForm = React.lazy(() => import("./page/LoginForm"));
export default function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SideBar />
				{/* <MainTable /> */}
				{/* <MUITest /> */}
				{/* <LoginForm /> */}
				<BrowserRouter>
					<Navbar />
					<Suspense fallback={<div>Loading.....</div>}>
						<br />
						<Routes>
							<Route path="test" element={<Test />}>
								<Route path="first" element={<FirstTest />} />
								<Route path="second" element={<SecondTest />} />
							</Route>
							<Route path="another" element={<Another />} />
							<Route path="/" element={<MainTable />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
						<br />
						<h3>footer</h3>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}
