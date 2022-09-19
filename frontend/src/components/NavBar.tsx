import { Box, AppBar } from "@mui/material";

export default function NavBar() {
	return (
		<AppBar
			color="secondary"
			sx={{
				width: "100%",
				position: "static",
				height: "50px",
				textAlign: "center",
			}}
		>
			Hello World
		</AppBar>
	);
}
