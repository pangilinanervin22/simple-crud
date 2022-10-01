import {
	Button,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { Users, Column } from "../../types";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

interface UserBodyTableProps {
	content: Users[];
	base: Column[];
	onCheck: any;
	checkList: string[];
}

export default function UserBodyTable({
	content,
	base,
	onCheck,
	checkList,
}: UserBodyTableProps) {
	const redirect = useNavigate();

	return (
		<>
			<TableContainer>
				<Table size="medium">
					<TableBody>
						{content.map((item) => (
							<TableRow key={item.id}>
								{base.map((base) => (
									<TableCell
										key={String(base.path)}
										align={base.align}
										width={base.width || "auto"}
									>
										{renderCellBody(item, base)}
									</TableCell>
								))}
								<TableCell align={"right"} width="20%">
									<Button
										size="small"
										color="info"
										variant="contained"
										onClick={() =>
											redirect(item.id, {
												replace: true,
											})
										}
									>
										Edit
									</Button>
									<Button
										size="small"
										color="error"
										variant="contained"
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
		if (base.path === "name")
			return (
				<>
					<Checkbox
						checked={checkList.includes(item.id)}
						onChange={(e, isCheck) => onCheck(isCheck, item.id)}
					/>
					{item[base.path]}
				</>
			);
		return item[base.path];
	}
}
