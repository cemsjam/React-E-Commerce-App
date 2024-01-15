import { UserProfile, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Account = () => {
	const { isSignedIn } = useAuth();
	if (!isSignedIn) {
		return <Navigate to="/sign-in" replace={true} />;
	}
	return (
		<div>
			<UserProfile />
		</div>
	);
};

export default Account;
