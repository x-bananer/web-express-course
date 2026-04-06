import express from "express";
const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.get("/api/v1/cats", (req, res) => {
	const data = {
		cat_id: 1,
		name: "Fluffy",
		birthdate: "8.12.2025",
		weight: 5,
		owner: "Ksenia",
		image: "https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat",
	};

	res.json(data);
});

app.use("/public", express.static("public"));

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
