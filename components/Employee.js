import React from "react";
import Reimbursements from "./Reimbursements";

export default function Employee({ user }) {
	let employee = user;
	const [reimbursements, setReimbursements] = React.useState([]);
	React.useEffect(() => {
		fetch("./api/reimbursements", {
			method: "POST",
			body: JSON.stringify({
				role: "USER",
				id: employee.id,
				desire: "SEARCH"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setReimbursements(data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			{user.username}
			{console.log(reimbursements)}
			<Reimbursements reimbursements={reimbursements} role="USER" />
		</div>
	);
}
