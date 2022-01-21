import React, { useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input, Button, Text, Spacer } from "@geist-ui/core";
import { Key, User } from "@geist-ui/icons";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const attemptLogin = async (values) => {
		setIsLoading(true);
		const res = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (res.status === 200) {
			router.push("/");
		} else {
			setIsLoading(false);
			toast.error("Whoops! Look like your login info wasn't correct.");
		}
	};

	return (
		<Layout>
			<section className="login">
				<div className="container">
					<form
						action="#"
						method="POST"
						onSubmit={handleSubmit(attemptLogin)}
						className="login-form">
						<Text h3>Sign in to continue</Text>
						<Input
							width="100%"
							{...register("username", {
								required: true,
								maxLength: 20
							})}
							placeholder="Username"
							icon={<User />}>
							{errors.username?.type === "required" && (
								<Text small type="error">
									Username is required
								</Text>
							)}
						</Input>
						<Spacer h={1} />
						<Input.Password
							width="100%"
							{...register("password", {
								required: true
							})}
							placeholder="Password"
							icon={<Key />}>
							{errors.password?.type === "required" && (
								<Text small type="error">
									Password is required
								</Text>
							)}
						</Input.Password>
						<Spacer h={1} />
						<Button
							loading={isLoading}
							width="100%"
							htmlType="submit"
							shadow
							type="secondary">
							Login
						</Button>
					</form>
				</div>
			</section>
			<ToastContainer />
		</Layout>
	);
}
