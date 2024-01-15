import { Link, redirect } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { User, ShoppingCart, Heart } from "lucide-react";

import { useCartStore } from "@/stores/cartStore";
import { useOffcanvasStore } from "@/stores/offcanvasStore";

import VisualOnlySvg from "@/components/VisualOnlySvg";
import Button from "@/components/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu/DropdownMenu";

const NavbarActions = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const { signOut } = useClerk();
	const cartItems = useCartStore((state) => state.cartItems);
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
	const isUserSignedIn = isLoaded && isSignedIn;

	return (
		<ul className="flex items-center">
			{/* PROFILE */}
			<li>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button
							variant="icon"
							as="div"
							className="relative w-8 h-8"
							aria-label="Profile Menu"
						>
							<VisualOnlySvg>
								<User size={20} />
							</VisualOnlySvg>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{!isUserSignedIn ? (
							<>
								<DropdownMenuItem>
									<Button
										as="div"
										variant="primary"
										fit="full"
										alignment="center"
										buttonSize="md"
										className="rounded-sm"
									>
										<Link className="d-block w-full h-full text-center" to="/sign-in">
											Sign In
										</Link>
									</Button>
								</DropdownMenuItem>
								<DropdownMenuSeparator className="bg-slate-100" />
								<DropdownMenuItem>
									<Button
										fit="full"
										alignment="center"
										buttonSize="md"
										as="div"
										variant="outlined-primary"
										className="rounded-sm"
									>
										<Link className="d-block w-full h-full text-center" to="/sign-up">
											Sign Up
										</Link>
									</Button>
								</DropdownMenuItem>
							</>
						) : (
							<>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/account">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Orders</DropdownMenuItem>
								<DropdownMenuItem className="text-red-500">
									<Link className="text-red-500" onClick={() => signOut()} to="/">
										Log out
									</Link>
								</DropdownMenuItem>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</li>
			{/* WISHLIST */}
			<li>
				<Button variant="icon" className="relative w-8 h-8" as="div">
					<Link to="/wishlist" aria-label="Visit Wishlist Page">
						<VisualOnlySvg>
							<Heart size={20} />
						</VisualOnlySvg>
					</Link>
					{/* {cartItems?.length > 0 && (
						<span className="badge absolute top-0 right-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-primary text-white text-sm font-semibold transition-all">
							{cartItems?.length}
						</span>
					)} */}
				</Button>
			</li>
			{/* CART */}
			<li>
				<Button
					variant="icon"
					className="relative w-8 h-8"
					onClick={toggleOffcanvas}
					aria-label="Toggle Shopping Cart"
				>
					<VisualOnlySvg>
						<ShoppingCart size={20} />
					</VisualOnlySvg>
					{cartItems?.length > 0 && (
						<span className="badge absolute top-0 right-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-primary text-white text-sm font-semibold transition-all">
							{cartItems?.length}
						</span>
					)}
				</Button>
			</li>
		</ul>
	);
};

export default NavbarActions;
