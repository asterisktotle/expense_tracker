'use client';
import { useContext } from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { GlobalContext } from '../context/GlobalContext';

export function SelectCategory() {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('SelectCategory must be within GlobalContextProvider');
	}

	const { setCategory } = context;

	const handleOnChange = (value) => {
		setCategory(value);
	};

	return (
		<Select onValueChange={handleOnChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Category</SelectLabel>
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
					<SelectItem value="other">other</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
