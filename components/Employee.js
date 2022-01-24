import React from "react";
import Reimbursements from "./Reimbursements";

export default function Employee({ user }) {
	let employee = user;
	const [reimbursements, setReimbursements] = React.useState([]);
	const [shouldReload, setShouldReload] = React.useState(false);
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
				setShouldReload(false);
			})
			.catch((err) => console.log(err));
	}, [shouldReload]);
	return (
		<div>
			<Reimbursements
				reimbursements={reimbursements}
				setShouldReload={setShouldReload}
				user={user}
				role={user.role}
			/>
		</div>
	);
}
