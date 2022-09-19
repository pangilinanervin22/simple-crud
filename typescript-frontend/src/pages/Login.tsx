import { Grid, TextField } from "@mui/material";

export default function Login() {
	return (
		<>
			<h1>login</h1>
			<Grid container columns={{ xs: 18, sm: 16, md: 12 }}>
				<Grid item xs={6} sm={8} md={4} bgcolor="red">
					1st
				</Grid>
				<Grid item xs={4} sm={6} md={4} bgcolor="blue">
					2nd
				</Grid>
				<Grid xs={8} sm={2} md={4} item bgcolor="green">
					3rd
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={4} bgcolor="red">
					1st
				</Grid>
				<Grid item xs={4} bgcolor="blue">
					2nd
				</Grid>
				<Grid xs={4} item bgcolor="green">
					3rd
				</Grid>
			</Grid>
		</>
	);
}
