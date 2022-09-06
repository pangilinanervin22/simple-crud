import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Test() {
	const { movies, loading } = useGlobalContext();

	console.log("test");

	return (
		<>
			<h1>Test Main </h1>
			<ul>
				<li>
					<NavLink to="/test/first">First</NavLink>
				</li>
				<li>
					<NavLink to="/test/second">Second</NavLink>
				</li>
			</ul>
			<br />
			<br />
			<Outlet />
			{/* {loading ? <h1>loading</h1> : <h1>done</h1>} */}
		</>
	);
}
