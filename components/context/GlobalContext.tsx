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
	label: string;
	setLabel: (value: string) => void;
	handleAddTransaction: () => void;
	transactions: TransactionType[];
}

interface TransactionType {
	id: number;
	details: string;
	amount: number;
	label: string;
	category: string;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalState = ({ children }: { children: ReactNode }) => {
	// state management
	const [details, setDetails] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [label, setLabel] = useState('');
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	const handleAddTransaction = () => {
		const newTransaction = {
			id: transactions.length + 1,
			details: details,
			amount: formatAmount(amount),
			category: category,
			label: label,
		};

		setTransactions([...transactions, newTransaction]);

		console.log('list of transact', transactions);

		// Reset the form
		setAmount(0);
		setDetails('');
		setCategory('');
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
				label,
				setLabel,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
