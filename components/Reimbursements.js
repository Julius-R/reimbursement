import React, { useState, useEffect } from "react";
import Reimbursement from "./Reimbursement";
import { Select, Text, Grid } from "@geist-ui/core";
import { Filter } from "@geist-ui/icons";

export default function Reimbursements({ reimbursements, role }) {
	const [filteredReimbursements, setFilteredReimbursements] = useState([]);
	const updateFilter = (e) => {
		if (e === "ALL") {
			setFilteredReimbursements(reimbursements);
		} else {
			let arr = reimbursements.filter(
				(reimbursement) => reimbursement.status === e
			);
			setFilteredReimbursements(arr);
		}
	};
	useEffect(() => {
		setFilteredReimbursements(reimbursements);
	}, [reimbursements]);
	return (
		<div>
			<section className="container">
				<Select
					placeholder="Status"
					type="secondary"
					onChange={updateFilter}>
					<Select.Option value="ALL">All</Select.Option>
					<Select.Option value="PENDING">Pending</Select.Option>
					<Select.Option value="APPROVED">Approved</Select.Option>
					<Select.Option value="DENIED">Denied</Select.Option>
				</Select>
				<Grid.Container gap={2} justify="center">
					{filteredReimbursements.map((reimbursement) => (
						<Grid xs={24} sm={12} key={reimbursement.id}>
							<Reimbursement
								role={role}
								reimbursement={reimbursement}
							/>
						</Grid>
					))}
				</Grid.Container>
			</section>
		</div>
	);
}
