import {
	AccountCircle,
	FireExtinguisher,
	Home,
	TableChart,
} from "@mui/icons-material";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
	const redirect = useNavigate();
	const [value, setValue] = useState("");

	const handleChange = (event: React.SyntheticEvent, stringLink: string) => {
		redirect(stringLink, { replace: true });
		setValue(stringLink);
	};

	return (
		<Paper
			sx={{
				width: "250px",
				height: "100vh",
			}}
		>
			<Box height="50px" bgcolor="dodgerblue">
				<Typography
					fontSize="25px"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "left",
						p: "10px",
					}}
				>
					<FireExtinguisher fontSize="large" color="action" /> Sample
					Bar
				</Typography>
			</Box>

			<Tabs
				value={value}
				onChange={handleChange}
				orientation="vertical"
				textColor="primary"
				indicatorColor="primary"
			>
				<Tab
					value=""
					label="Home"
					icon={<Home fontSize="large" />}
					iconPosition={"start"}
				/>
				<Tab
					value="users"
					label="Table"
					icon={<TableChart />}
					iconPosition={"start"}
				/>
				<Tab
					value="login"
					label="Login"
					icon={<AccountCircle />}
					iconPosition={"start"}
				/>
			</Tabs>

			<List>
				<ListItemButton selected={value === ""}>
					<ListItemIcon>
						<Home />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItemButton>
				<ListItemButton selected={value === "users"}>
					<ListItemIcon>
						<TableChart />
					</ListItemIcon>
					Table
				</ListItemButton>
				<ListItemButton selected={value === "login"}>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText primary="login" />
				</ListItemButton>
			</List>
		</Paper>
	);
}
