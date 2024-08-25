import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Collapsible";
import { Plus, Minus } from "lucide-react";
import { Label } from "../FormElements/Label";
import { Checkbox } from "../FormElements/Checkbox";
import { CategoryType } from "@/types/CategoryType";
import { useFilter } from "./useFilter";

type CollapsibleCheckboxListProps = {
	triggerTitle: string;
	arr: string[] | CategoryType[];
	defaultOpen?: boolean;
	onCheckboxChange: Function;
	filterProperty: "categories" | "brands";
};

const CollapsibleCheckboxList = ({
	arr,
	triggerTitle,
	defaultOpen = false,
	onCheckboxChange,
	filterProperty,
}: CollapsibleCheckboxListProps) => {
	const [open, setOpen] = useState(defaultOpen);
	const { setFilters, filtersObj } = useFilter();

	const handleOnChange = (value: string) => {
		const newFilters = { ...filtersObj };
		const currentFilterArr = newFilters[filterProperty] || [];
		let newFilterArr = [...currentFilterArr];

		if (newFilterArr.includes(value)) {
			newFilterArr = newFilterArr.filter((el) => el !== value);
		} else {
			newFilterArr.push(value);
		}

		newFilters[filterProperty] = newFilterArr;
		setFilters({ [filterProperty]: value });
		onCheckboxChange(newFilters);
	};

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<button type="button" className="w-full border-b border-gray-200  py-3 flex justify-between items-center group">
					<span className="font-semibold text-gray-900">{triggerTitle}</span>
					{open ? (
						<Minus size={16} className="text-gray-400 group-hover:text-gray-500" />
					) : (
						<Plus size={16} className="text-gray-400 group-hover:text-gray-500" />
					)}
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent className="py-3 pb-1">
				<div className="flex flex-col gap-1">
					{arr.length > 0 &&
						arr?.map((item) => {
							if (filterProperty === "brands") {
								return (
									<div key={"filter-item-" + item} className="flex items-center gap-2">
										<Checkbox
											checked={filtersObj.brands.includes(item.toLowerCase())}
											id={item}
											onClick={() => handleOnChange(item.toLowerCase())}
										/>
										<Label htmlFor={item}>{item[0].toUpperCase() + item.slice(1)}</Label>
									</div>
								);
							} else if (filterProperty === "categories") {
								return (
									<div key={"filter-item-" + item.name} className="flex items-center gap-2">
										<Checkbox
											checked={filtersObj.categories.includes(item.name.toLowerCase())}
											id={item.name}
											onClick={() => handleOnChange(item.name.toLowerCase())}
										/>
										<Label htmlFor={item.name}>{item.name[0].toUpperCase() + item.name.slice(1)}</Label>
									</div>
								);
							}
						})}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default CollapsibleCheckboxList;
