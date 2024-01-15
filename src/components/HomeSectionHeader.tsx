import React from "react";
import { Link } from "react-router-dom";
type HomeSectionHeaderProps = {
	title: string;
	linkLabel?: string;
	href?: string;
	reversed?: boolean;
};
const HomeSectionHeader = ({ title, href, linkLabel, reversed }: HomeSectionHeaderProps) => {
	if (reversed) {
		return (
			<div className="flex items-center justify-between gap-4">
				{href && linkLabel && (
					<Link
						className="font-medium text-black bg-white rounded-md p-2 shadow-sm transition-all hover:scale-110 hover:bg-primary hover:text-white"
						to={href}
					>
						{linkLabel}
					</Link>
				)}
				<div className="flex-1 h-[2px] bg-primary-500"></div>
				<h2 className="m-0 text-black text-xl font-bold">{title}</h2>
			</div>
		);
	} else {
		return (
			<div className="flex items-center justify-between gap-4">
				<h2 className="m-0 text-black text-xl font-bold">{title}</h2>
				<div className="flex-1 h-[2px] bg-primary-500"></div>
				{href && linkLabel && (
					<Link
						className="font-medium text-black bg-white rounded-md p-2 shadow-sm transition-all hover:scale-110 hover:bg-primary hover:text-white"
						to={href}
					>
						{linkLabel}
					</Link>
				)}
			</div>
		);
	}
};

export default HomeSectionHeader;
