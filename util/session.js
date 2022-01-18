// Config for iron session

export const ironOptions = {
	cookieName: "reimbursement-session",
	password: process.env.SESSION_PW,
	cookieOptions: {
		secure: process.env.NODE_ENV === "production"
	}
};
