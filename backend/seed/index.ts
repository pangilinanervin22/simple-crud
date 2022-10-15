import axios from "axios";
import { faker } from "@faker-js/faker";

const URL = "http://localhost:4000/api/users/";

async function fetchSomething() {
	const fetch = await axios.get(URL);
	return fetch.data;
}

async function seedUsers(total: number = 5) {
	for (let i = 0; i < total; i++) {
		const gender: "Male" | "Female" | any = faker.helpers.arrayElement([
			"Male",
			"Female",
		]);

		axios.post(URL, {
			name:
				faker.name.firstName(gender) +
				" " +
				faker.name.lastName(gender),
			age: faker.datatype.number({
				min: 18,
				max: 65,
			}),
			position: faker.name.jobType(),
			gender,
		});
	}
}
// seedUsers();
fetchSomething().then((data) => console.log(data.length));
