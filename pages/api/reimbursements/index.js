import prisma from "../../../util/prisma";

/*
 * /api/reimbursements
 * If the user is an ADMIN, they can view all reimbursements
 * If the user is a USER, they can view their reimbursements
 * If the user is a USER, they can create a reimbursement
 */

export default async function handler(req, res) {
	if (req.body.role === "ADMIN") {
		const reimbursements = await prisma.reimbursement.findMany();
		res.status(200).send(reimbursements);
	} else {
		// Checking the desire of the request to determine which query to run
		switch (req.body.desire) {
			case "CREATE":
				const reimbursement = await prisma.reimbursement.create({
					data: {
						status: req.body.val.status,
						type: req.body.val.type,
						description: req.body.val.description,
						amount: req.body.val.amount,
						authorId: req.body.val.authorId
					}
				});
				res.status(200).send(reimbursement);
				break;
			case "SEARCH":
				const reimbursements = await prisma.reimbursement.findMany({
					where: {
						authorId: req.body.id
					}
				});
				res.status(200).send(reimbursements);
				break;
			default:
				res.status(400).send("Method not supported");
		}
	}
}
