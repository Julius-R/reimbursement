import React from "react";
import Reimbursements from "./Reimbursements";

export default function Admin({ user }) {
	const [reimbursements, setReimbursements] = React.useState([]);
	const [shouldReload, setShouldReload] = React.useState(false);
	const fetchReimbursements = async () => {
		const res = await fetch("./api/reimbursements", {
			method: "POST",
			body: JSON.stringify({
				role: "ADMIN"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		setReimbursements(data);
	};
	React.useEffect(() => {
		fetchReimbursements();
	}, [shouldReload]);
	return (
		<div>
			<Reimbursements
				reimbursements={reimbursements}
				user={user}
				role={user.role}
				setShouldReload={setShouldReload}
			/>
		</div>
	);
}
