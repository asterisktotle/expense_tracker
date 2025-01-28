'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from '@/components/ui/dialog';

import TabsTransaction from '../AddTransactDialog/TabsTransact';

export default function AddTransaction() {
	const closeDialogRef = useRef<HTMLButtonElement>(null);

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
			<DialogContent className=" h-fit sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Transaction</DialogTitle>
					<DialogDescription>{null}</DialogDescription>
				</DialogHeader>
				{/* The handleFormSubmit returns a validation from nested TabsTransact > FormTransaction */}
				<TabsTransaction onSubmitSuccess={handleFormSubmit} />
				<DialogClose ref={closeDialogRef} className="hidden" />
			</DialogContent>
		</Dialog>
	);
}
