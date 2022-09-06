import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";

export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1, mb: "30px" }}>
			<AppBar position="fixed">
				<Toolbar variant="dense">
					<h1>Hello</h1>
					<SideBar />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
