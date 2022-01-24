import prisma from "../../../util/prisma";

export default async function handler(req, res) {
	switch (req.method) {
		case "PATCH":
			const reimbursement = await prisma.reimbursement.update({
				where: {
					id: req.query.id
				},
				data: {
					status: req.body.status,
					reviewer: req.body.reviewer,
					note: req.body.note
				}
			});
			return res.status(200).send();
		case "DELETE":
			const reimbursement = await prisma.reimbursement.delete({
				where: {
					id: req.query.id
				}
			});
			return res.status(200).send(reimbursement);
		default:
			return res.status(400).send("Method not supported");
	}
}
