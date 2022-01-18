// Config for iron session

export const ironOptions = {
	cookieName: "reimbursement-session",
	password: env("SESSION_PASSWORD"),
	cookieOptions: {
		secure: process.env.NODE_ENV === "production"
	}
};
