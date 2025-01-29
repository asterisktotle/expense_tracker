// 'use client';
// import { useContext } from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { CategoryType } from '../category/categorytype';

interface SelectCategoryType {
	onChange: (value: CategoryType) => void;
	value: CategoryType | '';
	label: string;
}

export function SelectCategory({ onChange, value, label }: SelectCategoryType) {
	return (
		<Select
			onValueChange={(val) => onChange(val as CategoryType)}
			value={value}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a category" />
			</SelectTrigger>
			<SelectContent>
				{label === 'expense' ? (
					<SelectGroup>
						<SelectItem value="food">Food</SelectItem>
						<SelectItem value="social-life">Social Life</SelectItem>
						<SelectItem value="pets">Pets</SelectItem>
						<SelectItem value="transport">Transport</SelectItem>
						<SelectItem value="culture">Culture</SelectItem>
						<SelectItem value="household">Household</SelectItem>
						<SelectItem value="apparel">Apparel</SelectItem>
						<SelectItem value="beauty">Beauty</SelectItem>
						<SelectItem value="health">Health</SelectItem>
						<SelectItem value="education">Education</SelectItem>
						<SelectItem value="gift">Gift</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectGroup>
				) : (
					<SelectGroup>
						<SelectItem value="allowance">Allowance</SelectItem>
						<SelectItem value="salary">Salary</SelectItem>
						<SelectItem value="bonus">Bonus</SelectItem>
						<SelectItem value="petty-cash">Petty Cash</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectGroup>
				)}
			</SelectContent>
		</Select>
	);
}
