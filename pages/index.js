import Layout from "../components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../util/session";
import { Text } from "@geist-ui/core";

export default function Home({ loggedInUser, role }) {
	return (
		<Layout isLoggedIn={true}>
			<div className="container">
				{console.log(loggedInUser)}
				<Text p>
					Caching is very important for fast Web sites. This article
					describes different methods of caching and how to use HTTP
					Headers to control them.
				</Text>
				<Text p b>
					A brief description of the changes between the early
					versions of HTTP, to the modern HTTP/2, the emergent HTTP/3
					and beyond.
				</Text>
			</div>
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
