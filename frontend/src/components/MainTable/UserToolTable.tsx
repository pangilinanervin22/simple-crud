import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import {
	Search as SearchIcon,
	Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const UserToolTable = ({ handleSearch }: { handleSearch: Function }) => {
	const redirect = useNavigate();

	console.log("render");

	return (
		<>
			<Box
				sx={{
					m: "8px",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<TextField
					size="small"
					placeholder={`Search Name`}
					onChange={(e) => handleSearch(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Box>
					<IconButton size="medium" color="primary">
						<RefreshIcon fontSize="large" />
					</IconButton>
					<Button
						variant="contained"
						onClick={() => redirect("new", { replace: true })}
					>
						Add new data
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default memo(UserToolTable);
