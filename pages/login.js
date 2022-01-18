import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();

	return (
		<Layout>
			<button
				onClick={() => {
					fetch("http://localhost:3000/api/login", {
						method: "POST",
						body: JSON.stringify({
							username: "pbunyan23",
							password: "Ch00seMe!"
						})
					}).then((res) => {
						if (res.status === 200) {
							router.push("/");
						}
					});
				}}>
				Login
			</button>
		</Layout>
	);
}
