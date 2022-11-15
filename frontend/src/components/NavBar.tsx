import {
	AppBar,
	Typography,
	Tooltip,
	Button,
	Zoom,
	IconButton,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

export default function NavBar() {
	return (
		<AppBar
			color="secondary"
			sx={{
				width: "100%",
				position: "static",
				textAlign: "left",
				padding: " 10px  20px",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Typography variant="h5"> Simple Crud Demo</Typography>

			<Tooltip
				title={
					<Typography variant="body1">
						Just a demo data is store in array manage by redux
					</Typography>
				}
				TransitionComponent={Zoom}
				leaveDelay={1000}
			>
				<IconButton size="small">
					<HelpIcon fontSize="large" />
				</IconButton>
			</Tooltip>
		</AppBar>
	);
}
