'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormTransaction from './FormTransaction';

interface FormTransactionProps {
	onSubmitSuccess: (isValid: boolean) => void;
}

export default function TabsTransaction({
	onSubmitSuccess,
}: FormTransactionProps) {
	return (
		<Tabs defaultValue="expense">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="expense">Expense</TabsTrigger>
				<TabsTrigger value="income">Income</TabsTrigger>
			</TabsList>

			<TabsContent value="expense">
				<Card className="bg-red-300 ">
					<CardHeader className="text-center">
						<CardTitle>Expense</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<FormTransaction
							onSubmitSuccess={onSubmitSuccess}
							transactLabel="expense"
						/>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="income">
				<Card className="bg-green-300">
					<CardHeader>
						<CardTitle className="text-center">Income</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<FormTransaction
							onSubmitSuccess={onSubmitSuccess}
							transactLabel="income"
						/>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
