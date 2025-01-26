'use client';
import { createContext, ReactNode, useState } from 'react';
import formatAmount from '@/utils/formatAmount';

interface GlobalContextType {
	details: string;
	setDetails: (value: string) => void;
	amount: number;
	setAmount: (value: number) => void;
	category: string;
	setCategory: (value: string) => void;
	handleAddTransaction: () => void;
	transactions: TransactionType[];
}

interface TransactionType {
	id: number;
	details: string;
	amount: number;
	category: string;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalState = ({ children }: { children: ReactNode }) => {
	// state management
	const [details, setDetails] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('income');
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	const handleAddTransaction = () => {
		const newTransaction = {
			id: transactions.length + 1,
			details: details,
			amount: formatAmount(amount),
			category: category,
		};

		setTransactions([...transactions, newTransaction]);

		console.log('type amount ', typeof formatAmount(amount));

		// Reset the form
		setAmount(0);
		setDetails('');
		setCategory('income');
	};

	return (
		<GlobalContext.Provider
			value={{
				setDetails,
				details,
				amount,
				setAmount,
				category,
				setCategory,
				handleAddTransaction,
				transactions,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
