import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link className={`block rounded-sm overflow-hidden ${className ? className : ""}`} to="/">
			<img src="/images/dummy-logo.png" alt="Dummy Logo" className="w-16 object-contain" />
		</Link>
	);
};

export default Logo;
