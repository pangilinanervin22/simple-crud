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
import { memo, MouseEventHandler } from "react";

interface thisProps {
	handleSearch: Function;
	checkList: string[];
	handleTrash: MouseEventHandler;
	handleAdd: MouseEventHandler;
	handleRefresh: MouseEventHandler;
}

const ToolTable = ({
	handleSearch,
	checkList,
	handleTrash,
	handleAdd,
	handleRefresh,
}: thisProps) => {
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
					<>
						{checkList.length == 0 ||
							"Selected Users: " + checkList.length}
					</>
					<IconButton
						size="medium"
						color="primary"
						disabled={checkList.length === 0}
						onClick={handleTrash}
					>
						<Delete fontSize="large" />
					</IconButton>
					<IconButton
						size="medium"
						color="primary"
						onClick={handleRefresh}
					>
						<RefreshIcon fontSize="large" />
					</IconButton>
					<Button variant="contained" onClick={handleAdd}>
						Add new data
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default memo(ToolTable);
