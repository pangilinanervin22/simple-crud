import { Box, Button, Drawer } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";

export default function SideBar() {
	const [state, setState] = React.useState(false);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	return (
		<>
			<Drawer
				anchor="left"
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				sx={{ width: [100, 200, 300] }}
			>
				<Box sx={{ width: [150, 200, 250] }}>
					<Typography variant="h5">Sample Bar</Typography>
				</Box>
			</Drawer>
			<Button onClick={toggleDrawer("left", true)}>{"left"}</Button>
		</>
	);
}
