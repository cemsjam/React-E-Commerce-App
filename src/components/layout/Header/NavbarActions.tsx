import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { User, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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
import { useWishlistStore } from "@/stores/wishlistStore";

const NavbarActions = () => {
	const [open, setOpen] = useState(false);
	const { isLoaded, isSignedIn } = useAuth();
	const { signOut } = useClerk();
	const { user } = useUser();
	const cartItems = useCartStore((state) => state.cartItems);
	const toggleOffcanvas = useOffcanvasStore((state) => state.toggleOffcanvas);
	const wishlists = useWishlistStore((state) => state.wishlists);
	const activeUser = user ? user.id : "default";
	const isUserSignedIn = isLoaded && isSignedIn;
	const wishlistCount = user ? wishlists[user.id]?.length : wishlists["default"]?.length;
	return (
		<ul className="flex items-center">
			{/* PROFILE */}
			<li>
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<div>
							<Button
								variant="icon"
								as="button"
								className={cn("relative w-10 h-10", {
									"after:scale-100": open,
								})}
								aria-label="Profile Menu"
							>
								<VisualOnlySvg>
									<User size={20} />
								</VisualOnlySvg>
							</Button>
						</div>
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
										className="rounded-sm !p-0"
										onClick={() => setOpen(false)}
									>
										<Link className="d-block w-full h-full text-center p-2" to="/sign-in">
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
										className="rounded-sm !p-0"
										onClick={() => setOpen(false)}
									>
										<Link className="d-block w-full h-full text-center p-2" to="/sign-up">
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
				<Button variant="icon" className="relative w-10 h-10" as="div">
					<Link
						to="/wishlist"
						className=" w-full h-full flex items-center justify-center"
						aria-label="Visit Wishlist Page"
					>
						<VisualOnlySvg>
							<Heart size={20} />
						</VisualOnlySvg>
					</Link>
					{wishlistCount && wishlistCount > 0 && (
						<span className="badge absolute top-0 left-0 w-4 h-4 inline-flex justify-center items-center rounded-full bg-primary text-white text-sm font-semibold transition-all">
							{wishlistCount}
						</span>
					)}
				</Button>
			</li>
			{/* CART */}
			<li>
				<Button
					variant="icon"
					className="relative w-10 h-10"
					onClick={toggleOffcanvas}
					aria-label="Toggle Shopping Cart"
				>
					<VisualOnlySvg>
						<ShoppingCart className="relative z-[2]" size={20} />
					</VisualOnlySvg>
					{cartItems[activeUser]?.length > 0 && (
						<span className="badge absolute -top-2 -left-2 w-4 h-4 inline-flex justify-center items-center rounded-full bg-primary text-white text-sm font-semibold transition-all">
							{cartItems[activeUser]?.length}
						</span>
					)}
				</Button>
			</li>
		</ul>
	);
};

export default NavbarActions;
