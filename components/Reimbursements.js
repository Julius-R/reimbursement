import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Reimbursement from "./Reimbursement";
import {
	Input,
	Select,
	Text,
	Button,
	Grid,
	Spacer,
	Loading,
	Modal,
	Textarea
} from "@geist-ui/core";
import { Filter, DollarSign } from "@geist-ui/icons";

export default function Reimbursements({ reimbursements, role }) {
	const [filteredReimbursements, setFilteredReimbursements] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(true);
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		reset,
		formState: { errors }
	} = useForm();
	const updateFilteredReimbursements = (update, updateType) => {
		if (updateType === "updateReimbursement") {
			setFilteredReimbursements(
				filteredReimbursements.map((reimbursement) =>
					reimbursement.id === update.id ? update : reimbursement
				)
			);
		} else {
			setFilteredReimbursements(
				filteredReimbursements.filter(
					(reimbursement) => reimbursement.id !== update.id
				)
			);
		}
	};
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
		setIsLoading(false);
		reimbursements.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
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
				<Spacer h={1} />
				<Button
					shadow
					type="secondary"
					onClick={() => setShowModal(true)}>
					Add Reimbursement
				</Button>
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
								updateFilteredReimbursements={
									updateFilteredReimbursements
								}
							/>
						</Grid>
					))}
					{isLoading && <Loading>Grabbing Reimbursements</Loading>}
					{isLoading === false && isEmpty === true && (
						<Grid xs={24} mb="5px">
							<Text p>
								Currently, there are no reimbursements to show
							</Text>
						</Grid>
					)}
				</Grid.Container>
			</section>
			<Modal visible={showModal}>
				<Modal.Title>Create Reimbursement</Modal.Title>
				<Modal.Subtitle>
					Please ensure that all information here is accurate.
				</Modal.Subtitle>
				<Modal.Content>
					<form
						onSubmit={() => {
							alert("Submitted");
						}}>
						<Spacer h={1} />
						<Input
							width="100%"
							{...register("amount", {
								required: true,
								min: 10.0
							})}
							placeholder="10.00"
							icon={<DollarSign />}>
							{errors.username?.type === "required" && (
								<Text small type="error">
									Amount is required
								</Text>
							)}
						</Input>
						<Spacer h={1} />
						<Select
							width="100%"
							placeholder="Filter By Status"
							type="secondary"
							onChange={(e) => {
								setValue("type", e);
							}}>
							<Select.Option value="FOOD">Food</Select.Option>
							<Select.Option value="TRAVEL">Travel</Select.Option>
							<Select.Option value="LODGING">
								Lodging
							</Select.Option>
							<Select.Option value="OTHER">Other</Select.Option>
						</Select>
						<Spacer h={1} />
						<Textarea
							width="100%"
							{...register("description", {
								required: true
							})}
							placeholder="Please enter a description."
						/>
					</form>
				</Modal.Content>
				<Modal.Action
					onClick={() => {
						setShowModal(false);
						reset();
					}}>
					Cancel
				</Modal.Action>
				<Modal.Action
					onClick={() => {
						const values = getValues();
						// TODO: Validate that amount is a number
						// TODO: Handle case if no type selected for type
						// TODO: Configure error handling if values are invalid or empty
						console.log(parseInt(values.amount));
						console.log(values);
					}}>
					Submit
				</Modal.Action>
			</Modal>
		</>
	);
}
