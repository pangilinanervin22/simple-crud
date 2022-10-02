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
	Delete,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EventHandler, memo, MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { deleteManyUser } from "../../app/features/userSlice";

interface UserToolTableProps {
	handleSearch: Function;
	handleTrash: MouseEventHandler;
	checkList: string[];
}

const UserToolTable = ({
	handleSearch,
	handleTrash,
	checkList,
}: UserToolTableProps) => {
	const redirect = useNavigate();
	const dispatch = useDispatch();

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
					{checkList.length == 0 ||
						"Selected Users: " + checkList.length}
					<IconButton
						size="medium"
						color="primary"
						disabled={checkList.length === 0}
						onClick={handleTrash}
					>
						<Delete fontSize="large" />
					</IconButton>
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
