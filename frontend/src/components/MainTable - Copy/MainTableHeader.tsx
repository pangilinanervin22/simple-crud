import { Table, TableCell, TableHead, TableRow, useTheme } from "@mui/material";

interface thisProps {
	base: any[];
	renderCell: Function;
}

const HeaderTable = ({ base, renderCell: render }: thisProps) => {
	const theme = useTheme();

	return (
		<>
			<Table>
				<TableHead
					sx={{
						background: theme.palette.primary.main,
					}}
				>
					<TableRow>
						{base.map((item) => (
							<TableCell
								sx={{ fontSize: "18px", fontWeight: "bold" }}
								width={item.width}
								key={item.path}
								align={item.align}
							>
								{render(item)}
							</TableCell>
						))}
						<TableCell
							align="right"
							width="20%"
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

export default HeaderTable;
