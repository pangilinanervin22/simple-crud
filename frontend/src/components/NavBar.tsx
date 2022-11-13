import { Box, AppBar, Typography } from "@mui/material";

export default function NavBar() {
	return (
		<AppBar
			color="secondary"
			sx={{
				width: "100%",
				position: "static",
				textAlign: "left",
				padding: " 10px  20px",
			}}
		>
			<Typography variant="h5">FullStack Simple Crud </Typography>
		</AppBar>
	);
}
