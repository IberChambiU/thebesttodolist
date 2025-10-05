

export const productLoader = ({ params }) => {
	const id = params.id;
	console.log("id", id);
	if (id === "2") {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { params };
}
