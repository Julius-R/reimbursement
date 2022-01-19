const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../util/session";

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
	const { username, password } = await req.body;
	console.log(req.body);
	const loggedInUser = await prisma.user.findUnique({
		where: {
			login_credentials: {
				username: `${username}`,
				password: `${password}`
			}
		}
	});
	if (loggedInUser === null) {
		res.status(401).send("Unauthorized");
	} else {
		req.session.user = {
			user: loggedInUser,
			role: loggedInUser.role
		};
		await req.session.save();
		res.status(200).send("ok");
	}
}
