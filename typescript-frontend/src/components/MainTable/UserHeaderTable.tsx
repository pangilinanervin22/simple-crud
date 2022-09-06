import { Table, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { Column } from "@root/types";

const UserHeaderTable = ({
	base,
	render,
}: {
	base: Column[];
	render: Function;
}) => {
	const theme = useTheme();

	return (
		<>
			<Table>
				<TableHead sx={{ background: theme.palette.primary.main }}>
					<TableRow>
						{base.map((item) => (
							<TableCell
								width="18%"
								key={item.path}
								align={item.align}
							>
								{render(item)}
							</TableCell>
						))}
						<TableCell
							align="right"
							width="auto"
							sx={{ fontSize: "20px" }}
						>
							{"Action"}
						</TableCell>
					</TableRow>
				</TableHead>
			</Table>
		</>
	);
};

export default UserHeaderTable;
