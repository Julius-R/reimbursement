import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
	const router = useRouter();
	const { register, handleSubmit, errors } = useForm();

	const attemptLogin = async (values) => {
		const res = await fetch("http://localhost:3000/api/login", {
			method: "POST",
			body: JSON.stringify({
				username: "rwrff",
				password: "msujdf"
			})
		});
		console.log(res.status);
		if (res.status === 200) {
			router.push("/");
		} else {
			toast.error("Whoops! Look like your login info wasn't correct.");
		}
	};

	return (
		<Layout>
			<section className="login">
				<form
					action="#"
					method="POST"
					onSubmit={handleSubmit(attemptLogin)}
					className="login-form">
					<h1>Login</h1>
					<input type="submit" />
				</form>
			</section>
			<ToastContainer />
		</Layout>
	);
}
