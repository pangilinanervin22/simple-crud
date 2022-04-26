import { Box, Button } from "@mui/material/";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

export default function MUITest() {
	return (
		<>
			<h1>MUIFLEX</h1>
			<Box sx={{ md: "520px", background: "red" }}>Box 1</Box>
			<Button startIcon={<AccountCircleIcon />}>Click</Button>

			<Box
				component="article"
				sx={{
					margin: "auto",
					width: "600px",
					height: "400px",
					display: "grid",
					gap: 1,
					gridTemplateColumns: "repeat(3, 1fr)",
					"&:hover": {
						color: "red",
						backgroundColor: "wheat",
					},
					// display: "flex",
					// flexDirection: "column",
					// justifyContent: "space-between",
					// alignContent: "center",

					// background: "red",
					// padding: "20px",}
				}}
			>
				<div sx={{ width: "30px" }}>Box 1</div>
				<div>Box 2</div>
				<div>Box 3</div>
				<div>Box 1</div>
				<div>Box 2</div>
				<div>Box 3</div>
				<div>Box last</div>
			</Box>
		</>
	);
}
