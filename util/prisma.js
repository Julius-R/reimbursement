import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

export const createReimbursement = async (val) => {
	const reimbursement = await prisma.reimbursement.create({
		data: {
			status: val.status,
			type: val.type,
			description: val.description,
			amount: val.amount,
			author: val.author
		}
	});
};

export const updateReimbursement = async (val) => {
	const reimbursement = await prisma.reimbursement.update({
		where: {
			id: val.id
		},
		data: {
			status: val.status,
			reviewer: val.reviewer,
			note: val.note
		}
	});
};

export const displayAllReimbursements = async (val) => {
	const reimbursements = await prisma.reimbursement.findMany();
};

export const displayUsersReimbursements = async (val) => {
	console.log("Val: " + val);
	const reimbursements = await prisma.reimbursement.findMany({
		where: {
			authorId: val
		}
	});
};

export const deleteReimbursement = async (val) => {
	const reimbursement = await prisma.reimbursement.delete({
		where: {
			id: val.id
		}
	});
};
