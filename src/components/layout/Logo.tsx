import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link className={`block ${className ? className : ""}`} to="/">
			Logo
		</Link>
	);
};

export default Logo;
