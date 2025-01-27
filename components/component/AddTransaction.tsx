'use client';
import { useContext } from 'react';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

// FORM ERROR MESSAGE
const formSchema = z.object({
	details: z.string().nonempty({
		message: 'Please enter a description',
	}),
	amount: z.number().positive({
		message: 'Please enter a valid amount',
	}),
});

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

	// FORM DEFAULT VALUES
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			details: '',
			amount: 0,
		},
	});

	const handleSubmit = () => {
		console.log('submitted');
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

				{/* <div className="flex flex-col">
					<div>
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

					<div></div>
				</div> */}

				<div className="flex flex-col gap-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<FormField
								control={form.control}
								name="details"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Details</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							<div>
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
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
