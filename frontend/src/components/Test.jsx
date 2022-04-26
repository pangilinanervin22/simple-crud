import React, { useState } from "react";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import FirstTest from "../page/FirstTest";
import SecondTest from "../page/SecondTest";

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
