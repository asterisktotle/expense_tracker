'use client';
import { useContext, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from '@/components/ui/dialog';

import { GlobalContext } from '../context/GlobalContext';

import FormTransaction from './FormTransaction';

export default function AddTransaction() {
	const closeDialogRef = useRef<HTMLButtonElement>(null);
	// const { addTransaction } = useContext(GlobalContext);

	// const handleAddTransaction = (formData) => {
	// 	addTransaction({
	// 		id: Date.now(),
	// 		details: formData.details,
	// 		amount: formData.amount,
	// 		category: formData.category,
	// 		date: new Date(),
	// 	});
	// };

	const handleFormSubmit = (isValid: boolean) => {
		if (isValid) {
			// handleAddTransaction();
			closeDialogRef.current?.click();
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="bg-green-500 hover:bg-green-400 text-white font-semibold py-5 transition-all duration-300 ease-in-out"
				>
					Add Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className=" sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Transaction</DialogTitle>
					<DialogDescription>{null}</DialogDescription>
				</DialogHeader>
				<FormTransaction onSubmitSuccess={handleFormSubmit} />
				<DialogClose ref={closeDialogRef} className="hidden" />
			</DialogContent>
		</Dialog>
	);
}

// this is under the dialog header
{
	/* <div className="flex flex-col">
<Label htmlFor="transact-details" className="text-right">
	Enter Description
</Label>
<Input
	required
	id="transact-details"
	type="text"
	value={details}
	placeholder="Add details"
	onChange={(e) => setDetails(e.target.value)}
	className="col-span-3"
/>
</div>
<div>
<Label htmlFor="amount" className="text-right">
	Enter Amount
</Label>
<Input
	required
	id="amount"
	onChange={(e) => setAmount(e.target.value)}
	value={amount}
	type="number"
	className="col-span-3"
/>
</div>

<div className="flex flex-col gap-2">
<RadioGroup
	className="flex"
	defaultValue={category}
	onValueChange={(value) => setCategory(value)}
>
	<div className="flex items-center space-x-2">
		<RadioGroupItem value="income" id="r1" />
		<Label htmlFor="r1">Income</Label>
	</div>
	<div className="flex items-center space-x-2">
		<RadioGroupItem value="expense" id="r2" />
		<Label htmlFor="r2">Expense</Label>
	</div>
</RadioGroup>

<DialogFooter>
	<DialogClose onClick={handleAddTransaction}>
		<Button
			className="bg-green-500 font-thin text-white p-2 rounded-sm w-full "
			type="submit"
		>
			Save Transaction
		</Button>
	</DialogClose>
</DialogFooter>
</div> */
}
