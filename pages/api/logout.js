import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../util/session";

export default withIronSessionApiRoute(logout, ironOptions);

async function logout(req, res) {
	await req.session.destroy();
	res.status(200).send("ok");
}
