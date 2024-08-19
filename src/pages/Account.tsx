import { UserProfile, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Account = () => {
	const { isSignedIn, isLoaded } = useAuth();
	if (!isSignedIn && isLoaded) {
		return <Navigate to="/sign-in" replace={true} />;
	}
	return (
		<div className="px-4 py-8">
			<UserProfile
				appearance={{ elements: { rootBox: "w-full max-w-screen-2xl mx-auto", card: "w-full rounded-lg" } }}
			/>
		</div>
	);
};

export default Account;
