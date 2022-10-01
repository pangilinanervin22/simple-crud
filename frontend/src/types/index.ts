import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface Column {
	label: "Name" | "Age" | "Position" | "Gender";
	path: string;
	align?: "right" | "left";
	width?: number | string;
	content?: ReactJSXElement;
}

export interface Users {
	name: string;
	age: number;
	position: string;
	gender: string;
	id: string;
}

export type sortColumn = {
	path: string;
	order: string;
};
