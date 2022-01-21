import React from "react";
import Reimbursement from "./Reimbursement";

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
			{reimbursements.map((reimbursement) => (
				<Reimbursement
					key={reimbursement.id}
					role={user.role}
					reimbursement={reimbursement}
				/>
			))}
		</div>
	);
}
