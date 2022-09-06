import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
	palette: {
		mode: "dark",
		// background: "",

		primary: {
			main: "#0080ff",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: "#ff0000",
		},
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					color: "whitesmoke",
				},
			},
			defaultProps: {
				size: "small",
			},
		},
	},

	typography: {
		fontWeightBold: "bolder",
		fontWeightRegular: "500",
		fontWeightLight: "normal",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	},
});

export default theme;
