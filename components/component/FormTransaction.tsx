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

const formSchema = z.object({
	details: z.string().nonempty({
		message: 'Please enter a description',
	}),
	amount: z.number().positive({
		message: 'Please enter a valid amount',
	}),
});

export default function FormTransaction() {
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

					<Button type="submit" className="w-full">
						{' '}
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
