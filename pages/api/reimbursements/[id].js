import prisma from "../../../util/prisma";

export default async function handler(req, res) {
	switch (req.method) {
		case "PATCH":
			const reimbursement = await prisma.reimbursement.update({
				where: {
					id: parseInt(req.query.id)
				},
				data: {
					status: req.body.status,
					note: req.body.note,
					reviewer: {
						connect: {
							id: req.body.reviewer
						}
					}
				}
			});
			return res.status(200).send(reimbursement);
		case "DELETE":
			const deletedReimbursement = await prisma.reimbursement.delete({
				where: {
					id: parseInt(req.query.id)
				}
			});
			return res.status(200).send(deletedReimbursement);
		default:
			return res.status(400).send("Method not supported");
	}
}
