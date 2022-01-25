const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {
	createReimbursement,
	updateReimbursement,
	displayAllReimbursements,
	displayUsersReimbursements,
	deleteReimbursement
} from "../../util/prisma";

export default function handler(req, res) {
	displayUsersReimbursements(req.body.data);

	// Filter out if request is from an admin or user
	// if (req.body.role === "USER") {
	// 	// filter by request method
	// 	switch (req.query.method) {
	// 		case "POST":

	// 	}
	// }
	// if (req.session.user.role === "admin") {
	// }
}

// createReimbursement().finally(() => {
// 	prisma.$disconnect();
// });
// res.status(200)
