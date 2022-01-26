import Layout from "../components/Layout";
import Employee from "../components/Employee";
import Admin from "../components/Admin";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../util/session";
import { Display, Grid, Text, Image } from "@geist-ui/core";

export default function Home({ loggedInUser, role }) {
	return (
		<Layout>
			<div className="container">
				<Display
					width="100%"
					height="240px"
					style={{ textAlign: "center" }}
					caption={
						<Text p font="1.5rem">
							Welcome, {loggedInUser.name}
						</Text>
					}>
					<Image
						alt="backdrop"
						style={{
							objectFit: "cover",
							height: "200px",
							width: "100%"
						}}
						src="/headerdash.jpg"
					/>
				</Display>
			</div>
			{role === "USER" ? (
				<Employee user={loggedInUser} />
			) : (
				<Admin user={loggedInUser} />
			)}
			<footer className="footer">
				<Text p>[Reim inc.] &copy; {new Date().getFullYear()}</Text>
			</footer>
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
