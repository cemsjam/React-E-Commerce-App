import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
	return (
		// <footer className="shadow bg-gray-800">
		// 	<div className="container p-4 md:flex md:items-center md:justify-between">
		// 		<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
		// 			© 2024{" "}
		// 			<Link to="/" className="hover:underline">
		// 				Cems™
		// 			</Link>
		// 			. All Rights Reserved.
		// 		</span>
		// 		<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
		// 			<li>
		// 				<a href="#" className="hover:underline me-4 md:me-6">
		// 					About
		// 				</a>
		// 			</li>
		// 			<li>
		// 				<a href="#" className="hover:underline me-4 md:me-6">
		// 					Privacy Policy
		// 				</a>
		// 			</li>
		// 			<li>
		// 				<a href="#" className="hover:underline me-4 md:me-6">
		// 					Licensing
		// 				</a>
		// 			</li>
		// 			<li>
		// 				<a href="#" className="hover:underline">
		// 					Contact
		// 				</a>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </footer>

		<footer className=" shadow bg-gray-900">
			<div className="container p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Logo className="text-gray-400 mb-4 md:mb-0" />
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400">
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								About
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Licensing
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm sm:text-center text-gray-400">
					© 2024{" "}
					<Link to="/" className="hover:underline">
						Cems™
					</Link>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
