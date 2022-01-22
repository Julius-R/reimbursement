import React, { useState, useEffect } from "react";
import Reimbursement from "./Reimbursement";
import { Select, Text, Grid, Spacer } from "@geist-ui/core";
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
		<>
			<section className="container">
				<Select
					placeholder="Filter By Status"
					type="secondary"
					onChange={updateFilter}>
					<Select.Option value="ALL">All</Select.Option>
					<Select.Option value="PENDING">Pending</Select.Option>
					<Select.Option value="APPROVED">Approved</Select.Option>
					<Select.Option value="DENIED">Denied</Select.Option>
				</Select>
				<Spacer h={2} />
				<Grid.Container justify="center">
					<Grid xs={24} mb="5px">
						<Text h4>Reimbursements:</Text>
					</Grid>
					{filteredReimbursements.map((reimbursement) => (
						<Grid xs={24} mb="5px" key={reimbursement.id}>
							<Reimbursement
								role={role}
								reimbursement={reimbursement}
							/>
						</Grid>
					))}
				</Grid.Container>
			</section>
		</>
	);
}
