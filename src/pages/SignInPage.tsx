import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<SignIn />
		</div>
	);
};

export default SignInPage;
