import React, { useState } from "react";

export default function Test() {
	const [modalVisibility, setmodalVisibility] = useState(false);

	return (
		<>
			<h1>Test wew </h1>
			<form>
				<input
					type="text"
					id="title"
					name="title"
					minLength="3"
					maxLength="15"
					required
				/>
				<br></br>

				<input
					type="text"
					id="genre"
					name="genre"
					minLength="3"
					maxLength="15"
					required
				/>
				<br></br>

				<input
					type="number"
					id="quantity"
					name="quantity"
					min="1"
					max="5"
					required
				/>
				<br></br>

				<input type="submit" value="Submit" />
			</form>
		</>
	);
}
