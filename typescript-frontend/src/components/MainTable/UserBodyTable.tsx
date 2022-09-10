import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { deleteUser } from "@root/app/features/userSlice";
import { Column, Users } from "@root/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UserBodyTableProps {
	content: Users[];
	base: Column[];
}

export default function UserBodyTable({ content, base }: UserBodyTableProps) {
	const redirect = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<TableContainer sx={{ height: "350px" }}>
				<Table size="medium">
					<TableBody>
						{content.map((item) => (
							<TableRow key={item.id}>
								{base.map((base) => (
									<TableCell
										width="18%"
										align={base.align}
										key={base.path || base.label}
									>
										{renderCellBody(item, base)}
									</TableCell>
								))}
								<TableCell align={"right"} width="auto">
									<Button
										color="info"
										variant="contained"
										size="small"
										onClick={() =>
											redirect(item.id, {
												replace: true,
											})
										}
									>
										Edit
									</Button>
									<Button
										color="error"
										variant="contained"
										size="small"
										onClick={() =>
											redirect(`delete/${item.id}`, {
												replace: true,
											})
										}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);

	function renderCellBody(item: any, base: any) {
		return item[base.path];
	}
}
