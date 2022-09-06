import { Alert, Snackbar } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import useToggle from "./hooks/useToggle";
import httpService from "./services/httpService";

const url = "http://localhost:4000/movies/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [toggleSnackBar, setToggleSnackBar] = useToggle(false);
	const [snackBarData, setSnackBarData] = useState({
		status: "success",
		message: "reload successfully",
	});

	const fetchMovies = useCallback(async () => {
		setLoading(true);
		try {
			const res = await httpService.get("url");
			setMovies(res.data);
		} catch (error) {
			console.log(error.message);
			openSnackBar("success", error.message);
			setMovies([]);
		} finally {
			setLoading(false);
		}
	}, [movies]);

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<AppContext.Provider
			value={{ loading, movies, updateMovies, openSnackBar }}
		>
			{children}
			<Snackbar
				open={toggleSnackBar}
				autoHideDuration={3000}
				onClose={setToggleSnackBar}
			>
				<Alert severity={snackBarData.status} sx={{ width: "100%" }}>
					{snackBarData.message}
				</Alert>
			</Snackbar>
		</AppContext.Provider>
	);

	function updateMovies() {
		fetchMovies();
	}

	function openSnackBar(status, message) {
		setSnackBarData({ status, message });
		setToggleSnackBar();
	}
};

// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
