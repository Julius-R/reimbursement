import Layout from "../components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../util/session";

export default function Home({ loggedInUser, role }) {
	return (
		<Layout>
			<h1>Hello Next.js</h1>
		</Layout>
	);
}

/* 
Todo: Create method to redirect to either Admin or User page if logged in based on role

*/

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;
		if (!user) {
			return {
				redirect: {
					statusCode: 302,
					destination: "/login"
				}
			};
		} else {
			return {
				props: {
					loggedInUser: user.user,
					role: user.role
				}
			};
		}
	},
	ironOptions
);
