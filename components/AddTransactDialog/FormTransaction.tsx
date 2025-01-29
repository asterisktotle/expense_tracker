'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { SelectCategory } from './SelectCategory';
import { CategoryType } from '../category/categorytype';
const formSchema = z.object({
	details: z.string().min(1, { message: 'Details are required' }),
	amount: z.number().min(0.01, { message: 'Amount must be greater than 0' }),
	category: z.string().min(1, { message: 'Select a category' }),
});

type FormData = z.infer<typeof formSchema>;

interface FormTransactionProps {
	onSubmitSuccess: (isValid: boolean) => void;
	transactLabel: string;
}

export default function FormTransaction({
	onSubmitSuccess,
	transactLabel,
}: FormTransactionProps) {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('AddTransaction must be used within a GlobalProvider');
	}

	const {
		setDetails,
		details,
		handleAddTransaction,
		setAmount,
		amount,
		transactions,
		setLabel,
		setCategory,
	} = context;

	const handleSubmit = (data: FormData) => {
		setLabel(transactLabel);
		handleAddTransaction({
			details: data.details,
			amount: data.amount,
			category: data.category,
			label: transactLabel,
		});
		onSubmitSuccess(true);

		console.log('this is data', transactions);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			details: '',
			amount: 0,
			category: '',
		},
	});

	return (
		<div className="flex flex-col">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="details"
						render={({ field }) => {
							return (
								<FormItem className="flex flex-col mb-5">
									<FormLabel>Details</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter transaction details"
											onChange={(e) => {
												field.onChange(e.target.value);
												setDetails(e.target.value);
											}}
											value={details || ''}
										/>
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
								<FormItem className="flex flex-col mb-5">
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											placeholder="0.00"
											onChange={(e) => {
												const value = Number(e.target.value);
												field.onChange(value);
												setAmount(value);
											}}
											value={amount || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="flex flex-col mb-5">
								<FormLabel>Category</FormLabel>
								<FormControl>
									<SelectCategory
										label={transactLabel}
										value={field.value as CategoryType | ''}
										onChange={(value: CategoryType) => {
											field.onChange(value);
											setCategory(value);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-3">
						<Button type="submit" className="w-full">
							{' '}
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
