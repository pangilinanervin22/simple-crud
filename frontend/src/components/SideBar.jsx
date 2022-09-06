import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function SideBar() {
	const [toggleSideBar, setToggleSideBar] = React.useState(false);
	const [tabValue, setTabValue] = React.useState(false);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setToggleSideBar({ ...toggleSideBar, [anchor]: open });
	};

	console.log(tabValue);
	return (
		<>
			<Drawer
				anchor="left"
				open={toggleSideBar["left"]}
				onClose={toggleDrawer("left", false)}
				sx={{ width: [100, 200, 300] }}
				variant="permanent"
			>
				<Box sx={{ width: [150, 200, 250] }}>
					<Typography variant="h5">Sample Bar</Typography>
					<Link label="Home" value="/another" to="/">
						Home
					</Link>
					<Link label="Test" value="/test" to="/test">
						Test
					</Link>
					<Link label="Another" value="/another" to="/another">
						Another
					</Link>
				</Box>
			</Drawer>
		</>
	);

	function handleChangeTab(event, newValue) {
		setTabValue(newValue);
	}
}
