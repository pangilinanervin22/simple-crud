import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<h1>Navbar</h1>
			<ul>
				List
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/test">Test</NavLink>
				</li>
				<li>
					<NavLink to="/another">Another</NavLink>
				</li>
			</ul>
		</>
	);
}
