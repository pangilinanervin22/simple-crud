import {
	AppBar,
	Typography,
	Tooltip,
	Zoom,
	IconButton,
	Box,
	useTheme,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { DarkMode, LightMode } from "@mui/icons-material";

interface props {
	toggleMode: Function;
}

export default function NavBar({ toggleMode }: props) {
	const mode = useTheme().palette.mode;

	return (
		<AppBar
			color="primary"
			sx={{
				width: "100%",
				position: "static",
				textAlign: "left",
				padding: " 15px",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				height: "10vh",
			}}
		>
			<Typography variant="h5"> Simple Crud Demo</Typography>

			<Box>
				<IconButton
					size="small"
					onClick={() =>
						toggleMode(mode == "dark" ? "light" : "dark")
					}
				>
					{mode == "dark" ? (
						<DarkMode fontSize="large" />
					) : (
						<LightMode fontSize="large" />
					)}
				</IconButton>
				<Tooltip
					title={
						<Typography variant="body1">
							"Just a demo" data is store in array manage by
							redux.
						</Typography>
					}
					TransitionComponent={Zoom}
					leaveDelay={500}
				>
					<IconButton size="small">
						<HelpIcon fontSize="large" />
					</IconButton>
				</Tooltip>
			</Box>
		</AppBar>
	);
}
