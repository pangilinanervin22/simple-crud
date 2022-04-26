import React, { useState } from "react";
import FunctionTable from "./FunctionTable";
import "../css/table.css";
import Test from "./Test";

export default function Home() {
	return (
		<>
			<FunctionTable title={"FunctionComponent"} />
			<h1>Home </h1>
		</>
	);
}
