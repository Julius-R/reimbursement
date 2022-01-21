import React from "react";
import { Select, Text, Card, Divider, Button } from "@geist-ui/core";
import { Coffee, Home, Truck, BookOpen, Trash, Edit } from "@geist-ui/icons";

export default function Reimbursement({ role, reimbursement }) {
	const displayTypeIcon = (type) => {
		switch (type) {
			case "LODGING":
				return <Home />;
			case "TRAVEL":
				return <Truck />;
			case "FOOD":
				return <Coffee />;
			case "OTHER":
			default:
				return <BookOpen />;
		}
	};
	return (
		<Card width="400px">
			<Card.Content>
				<Text b>Reimbursement ID #{reimbursement.id}</Text>
			</Card.Content>
			<Divider y={0} />
			<Card.Content>
				<Text h4>
					Amount:{" "}
					<Text
						span
						style={{ fontWeight: 300, fontSize: "1rem" }}
						ml="5px">
						${reimbursement.amount}
					</Text>
				</Text>
				<Text h4>
					Status:{" "}
					<Text
						span
						style={{ fontWeight: 300, fontSize: "1rem" }}
						ml="5px">
						{reimbursement.status}
					</Text>
				</Text>
				<Text h4>
					Type:{" "}
					<Text
						span
						style={{
							fontWeight: 300,
							fontSize: "1rem"
						}}
						ml="5px">
						{displayTypeIcon(reimbursement.type)}
					</Text>
				</Text>
				<Text h4>
					Submitted:
					<Text
						span
						style={{ fontWeight: 300, fontSize: "1rem" }}
						ml="5px">
						{new Date(reimbursement.created).toLocaleString()}
					</Text>
				</Text>
				<Text h4>
					Reviewed:
					<Text
						span
						style={{ fontWeight: 300, fontSize: "1rem" }}
						ml="5px">
						{new Date(reimbursement.updated).toLocaleString()}
					</Text>
				</Text>
				<Text h6 style={{ marginTop: "-10px" }}>
					Reviewed By:
					<Text span style={{ fontWeight: 300 }} ml="5px">
						{reimbursement.resolver}
					</Text>
				</Text>
				<Text h4>Description:</Text>
				<Text
					p
					style={{
						marginTop: "-10px",
						fontWeight: 300,
						fontSize: "1rem"
					}}>
					{reimbursement.description}
				</Text>
				<Text h4>Comments:</Text>
				<Text
					p
					style={{
						marginTop: "-10px",
						fontWeight: 300,
						fontSize: "1rem"
					}}>
					{reimbursement.note}
				</Text>
			</Card.Content>
			<Card.Footer>
				{role === "ADMIN" ? (
					<Button width="100%" icon={<Edit />} type="secondary">
						Update
					</Button>
				) : (
					<Button width="100%" icon={<Trash />} type="secondary">
						Delete
					</Button>
				)}
			</Card.Footer>
		</Card>
	);
}
