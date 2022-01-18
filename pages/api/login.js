const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../util/session";

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
	const { email, password } = req.body;
	const loggedInUser = await prisma.user.findOne({
		where: {
			email: email,
			password: password
		}
	});
	req.session.user = {
		user: loggedInUser,
		role: loggedInUser.role
	};
	await req.session.save();
	res.status(200);
}
