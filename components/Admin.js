import React from "react";
import Reimbursement from "./Reimbursement";

export default function Admin({ user }) {
	const [reimbursements, setReimbursements] = React.useState([]);
	React.useEffect(() => {
		fetch("./api/reimbursements")
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
			<Reimbursement />
		</div>
	);
}
