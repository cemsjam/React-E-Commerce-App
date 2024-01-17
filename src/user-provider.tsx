import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import useUserStore from "./stores/userStore";

const UserProvider = () => {
	const { userId } = useAuth();
	const { user } = useUser();
	const setCurrentUser = useUserStore((state) => state.setCurrentUser);
	useEffect(() => {
		if (userId && user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(null);
		}
	}, [userId]);
	return null;
};

export default UserProvider;
