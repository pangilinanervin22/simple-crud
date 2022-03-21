import React, { useState } from "react";
import FunctionTable from "./FunctionTable";
import "../css/table.css";
import Test from "./common/Test";

export default function Home() {
	return (
		<>
			<FunctionTable title={"FunctionComponent"} />
			{/* <Test /> */}
		</>
	);
}
