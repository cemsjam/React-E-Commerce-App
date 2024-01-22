import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Collapsible";
import { Plus, Minus } from "lucide-react";
import { Label } from "../FormElements/Label";
import { Checkbox } from "../FormElements/Checkbox";

type CollapsibleCheckboxListProps = {
	triggerTitle: string;
	arr: string[];
	defaultOpen?: boolean;
	onCheckboxChange: Function;
};

const CollapsibleCheckboxList = ({
	arr,
	triggerTitle,
	defaultOpen = false,
	onCheckboxChange,
}: CollapsibleCheckboxListProps) => {
	const [open, setOpen] = useState(defaultOpen);

	const handleOnChange = (value: string) => {
		onCheckboxChange(value);
	};
	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<button
					type="button"
					className="w-full border-b border-gray-200  py-3 flex justify-between items-center group"
				>
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
					{arr.map((item) => (
						<div key={"filter-item-" + item} className="flex items-center gap-2">
							<Checkbox id={item} onChange={() => handleOnChange(item)} />
							<Label htmlFor={item}>{item[0].toUpperCase() + item.slice(1)}</Label>
						</div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default CollapsibleCheckboxList;
