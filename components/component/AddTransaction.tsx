'use client';
import { useContext, useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlobalContext } from '../context/GlobalContext';

export default function AddTransaction() {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('AddTransaction must be used within a GlobalProvider');
	}

	const {
		setDetails,
		details,
		setCategory,
		category,
		setAmount,
		amount,
		handleAddTransaction,
	} = context;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="bg-black text-white ">
					Add Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Transaction</DialogTitle>
					<DialogDescription>{null}</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col">
					<div>
						<Label htmlFor="transact-details" className="text-right">
							Enter Description
						</Label>
						<Input
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
							id="amount"
							onChange={(e) => setAmount(e.target.value)}
							value={amount}
							type="number"
							className="col-span-3"
						/>
					</div>

					<div></div>
				</div>

				<RadioGroup
					required
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
					<DialogClose
						className="bg-black text-white p-1 rounded-sm w-full "
						onClick={handleAddTransaction}
					>
						Save Transaction
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
