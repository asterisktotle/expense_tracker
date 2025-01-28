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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '@/components/ui/label';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { SelectCategory } from './SelectCategory';

const formSchema = z.object({
	details: z.string().min(1, { message: 'Details are required' }),
	amount: z.number().min(0.01, { message: 'Amount must be greater than 0' }),
	// category: z.enum(['income', 'expense'], {
	// 	required_error: 'Category is required',
	// }),
});

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

	// this is inside the handleSubmit
	// data: z.infer<typeof formSchema>
	const handleSubmit = () => {
		onSubmitSuccess(true);
		handleAddTransaction();

		console.log('this is data', transactions);
	};

	const {
		setDetails,
		details,
		handleAddTransaction,
		setAmount,
		amount,
		transactions,
		setLabel,
	} = context;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			details: '',
			amount: 0,
		},
	});

	useEffect(() => {
		if (transactLabel === 'expense') {
			setLabel('expense');
		} else if (transactLabel === 'income') {
			setLabel('income');
		}
	}, [transactLabel]);

	return (
		<div className="flex flex-col">
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
								<FormItem>
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

					{/* <FormField
						control={form.control}
						name="category"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<RadioGroup
											className="flex"
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
												setCategory(value);
											}}
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
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/> */}

					{/* TODO: MAKE THIS INCLUDE IN SCHEMA */}
					<div>
						<FormLabel>Category </FormLabel>
						<SelectCategory />
					</div>

					{/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectCategory
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setCategory?.(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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
