import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Test() {
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
		</>
	);
}
