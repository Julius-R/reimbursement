import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
	Select,
	Text,
	Card,
	Divider,
	Button,
	Modal,
	ButtonGroup
} from "@geist-ui/core";
import {
	Coffee,
	Home,
	Truck,
	BookOpen,
	Trash,
	CheckCircle,
	XCircle
} from "@geist-ui/icons";

/* 
	TODO: Implement api calls for reimbursements updated, created, and deleted both front and backend
*/
export default function Reimbursement({
	role,
	reimbursement,
	updateFilteredReimbursements
}) {
	const [showWarningModal, setShowWarningModal] = useState(false);
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
	const displayModifyButton = (role) => {
		switch (role) {
			case "ADMIN":
				return (
					<ButtonGroup scale={1 / 3}>
						<Button
							scale={1 / 3}
							icon={<CheckCircle color="green" />}
							shadow
							type="secondary">
							Approve
						</Button>
						<Button
							scale={1 / 3}
							icon={<XCircle color="red" />}
							shadow
							type="secondary">
							Deny
						</Button>
						<Button
							onClick={() => setShowWarningModal(true)}
							scale={1 / 3}
							icon={<Trash />}
							shadow
							type="secondary">
							Delete
						</Button>
					</ButtonGroup>
				);
			case "USER":
				return (
					<Button
						onClick={() => setShowWarningModal(true)}
						width="100%"
						icon={<Trash />}
						shadow
						type="secondary">
						Delete
					</Button>
				);
			default:
				return null;
		}
	};
	const updateReimbursement = async (val) => {};
	const deleteReimbursement = async () => {
		const res = await fetch(`/api/reimbursements/${reimbursement.id}`, {
			method: "DELETE"
		});
		setShowWarningModal(false);

		if (res.status === 200) {
			toast.success("Reimbursement deleted successfully", {
				position: "top-right",
				autoClose: 1500,
				onClose: () =>
					updateFilteredReimbursements(reimbursement, "DELETE")
			});
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
						{new Date(reimbursement.createdAt).toLocaleString()}
					</Text>
				</Text>
				{reimbursement.reviewerId !== null && (
					<Text h4>
						Reviewed:
						<Text
							span
							style={{ fontWeight: 300, fontSize: "1rem" }}
							ml="5px">
							{new Date(reimbursement.updatedAt).toLocaleString()}
						</Text>
					</Text>
				)}
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
				{reimbursement.note !== null && <Text h4>Comments:</Text>}
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
			{reimbursement.status === "PENDING" && (
				<Card.Footer>{displayModifyButton(role)}</Card.Footer>
			)}
			<Modal visible={showWarningModal}>
				<Modal.Title>Warning</Modal.Title>
				<Modal.Subtitle>Deleting Reimbursement</Modal.Subtitle>
				<Modal.Content>
					<p>
						Are you sure that you want to delete this reimbursement?
					</p>
				</Modal.Content>
				<Modal.Action
					passive
					onClick={() => setShowWarningModal(false)}>
					Cancel
				</Modal.Action>
				<Modal.Action onClick={() => deleteReimbursement()}>
					Yes
				</Modal.Action>
			</Modal>
			<ToastContainer />
		</Card>
	);
}
