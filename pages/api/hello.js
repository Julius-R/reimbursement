const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {
	createReimbursement,
	updateReimbursement,
	displayAllReimbursements,
	displayUsersReimbursements,
	deleteReimbursement
} from "../../util/prisma";

const createUser = async () => {
	const pop = await prisma.user.create({
		data: {
			email: "jrobins@reim.com",
			username: "JDev27",
			password: "un53cur3dP@ssw0rd",
			name: "Julius Robinson",
			role: "ADMIN"
		}
	});
};

export default function handler(req, res) {
	// createReimbursement().finally(() => {
	// 	prisma.$disconnect();
	// });
	// res.status(200)
}
