import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
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

export default function Reimbursements({
	reimbursements,
	role,
	user,
	setShouldReload
}) {
	const [filteredReimbursements, setFilteredReimbursements] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		setError,
		reset,
		clearErrors,
		formState: { errors }
	} = useForm();

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
	const createReimbursement = async (values) => {
		const res = await fetch("/api/reimbursements", {
			method: "POST",
			body: JSON.stringify({
				desire: "CREATE",
				val: values
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		setButtonLoading(false);
		setShowModal(false);
		reset();
		if (res.status === 200) {
			toast("Reimbursement created successfully!", {
				onClose: () => setShouldReload(true),
				type: "success",
				pauseOnHover: false,
				autoClose: 1500
			});
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
				<Grid.Container
					alignContent="space-between"
					justify="flex-start">
					<Grid xs={24} mb="5px">
						<Text h4>Reimbursements:</Text>
					</Grid>
					{filteredReimbursements.map((reimbursement) => (
						<Grid
							xs={24}
							sm={12}
							lg={8}
							mb="15px"
							key={reimbursement.id}>
							<Reimbursement
								width="100%"
								role={role}
								admin={user.role === "ADMIN" ? user.id : null}
								reimbursement={reimbursement}
								setShouldReload={setShouldReload}
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
					<form>
						<Spacer h={1} />
						<Input
							type={
								errors.amount?.type === "required"
									? "error"
									: "default"
							}
							width="100%"
							{...register("amount", {
								required: true
							})}
							placeholder="10.00"
							icon={<DollarSign />}></Input>
						{errors.amount?.type === "required" && (
							<Text small type="error">
								{errors.amount?.message}
							</Text>
						)}
						<Spacer h={1} />
						<Select
							type="secondary"
							width="100%"
							placeholder="Filter By Status"
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
							type={
								errors.description?.type === "required"
									? "error"
									: "default"
							}
							width="100%"
							{...register("description", {
								required: true
							})}
							placeholder="Please enter a description."
						/>
						{errors.description?.type === "required" && (
							<Text small type="error">
								{errors.description?.message}
							</Text>
						)}
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
					loading={buttonLoading}
					onClick={() => {
						setButtonLoading(true);
						clearErrors();
						let errorCount = 0;
						const values = getValues();
						const amount = parseFloat(values.amount);
						if (isNaN(amount)) {
							setError("amount", {
								type: "required",
								message:
									"Amount can not be blank, and must be a number"
							});
							errorCount++;
							setButtonLoading(false);
						}
						if (!!values.description.trim("") === false) {
							setError("description", {
								type: "required",
								message: "Description can not be blank"
							});
							errorCount++;
							setButtonLoading(false);
						}
						const data = {
							amount: values.amount,
							description: values.description,
							type: values?.type ?? "OTHER",
							authorId: user.id
						};
						if (errorCount === 0) createReimbursement(data);
					}}>
					Submit
				</Modal.Action>
			</Modal>
			<ToastContainer />
		</>
	);
}
