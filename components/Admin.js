import React from "react";
import Reimbursements from "./Reimbursements";

export default function Admin({ user }) {
	const [reimbursements, setReimbursements] = React.useState([]);
	React.useEffect(() => {
		fetch("./api/reimbursements", {
			method: "POST",
			body: JSON.stringify({
				role: "ADMIN"
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
			<Reimbursements reimbursements={reimbursements} role="ADMIN" />
		</div>
	);
}
