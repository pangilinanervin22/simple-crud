import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";

interface thisProps {
	content: any[];
	base: any[];
	renderCell: Function;
	handleDelete: Function;
	handleEdit: Function;
}

export default function BodyTable({
	content,
	base,
	renderCell,
	handleDelete: deleteCell,
	handleEdit: editCell,
}: thisProps) {
	return (
		<>
			<TableContainer>
				<Table size="medium">
					<TableBody>
						{content.map((item) => (
							<TableRow key={item._id || item.path}>
								{base.map((base) => (
									<TableCell
										key={String(base.path)}
										align={base.align || "right"}
										width={base.width || "auto"}
									>
										{renderCell(item, base)}
									</TableCell>
								))}
								<TableCell align={"right"} width="20%">
									<Button
										size="small"
										color="info"
										variant="contained"
										onClick={() => editCell(item._id)}
									>
										Edit
									</Button>
									<Button
										size="small"
										color="error"
										variant="contained"
										onClick={() => deleteCell(item._id)}
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
}
