import Layout from "../components/Layout";
import Employee from "../components/Employee";
import Admin from "../components/Admin";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../util/session";

export default function Home({ loggedInUser, role }) {
	return (
		<Layout isLoggedIn={true}>
			{role === "USER" ? (
				<Employee user={loggedInUser} />
			) : (
				<Admin user={loggedInUser} />
			)}
		</Layout>
	);
}

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
		}
		return {
			props: {
				loggedInUser: user.user,
				role: user.role
			}
		};
	},
	ironOptions
);
