'use client';
import { createContext, ReactNode, useState } from 'react';
import formatAmount from '@/utils/formatAmount';

interface TransactionType {
	id: number;
	details: string;
	amount: number;
	label: string;
	category: string;
}

interface TransactionInputType {
	details: string;
	amount: number;
	category: string;
	label: string;
}

interface GlobalContextType {
	details: string;
	setDetails: (value: string) => void;
	amount: number;
	setAmount: (value: number) => void;
	category: string;
	setCategory: (value: string) => void;
	label: string;
	setLabel: (value: string) => void;
	handleAddTransaction: (data: TransactionInputType) => void;
	transactions: TransactionType[];
}

interface TransactionDataProps {
	details: string;
	amount: number;
	category: string;
	label: string;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalState = ({ children }: { children: ReactNode }) => {
	// state management
	const [details, setDetails] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [label, setLabel] = useState('');
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	// add the input from form transaction
	const handleAddTransaction = (transactionData: TransactionDataProps) => {
		const newTransaction = {
			id: transactions.length + 1,
			details: transactionData.details,
			amount: formatAmount(transactionData.amount),
			category: transactionData.category,
			label: transactionData.label,
		};

		// Update the list of transactions
		setTransactions((prevTransactions) => [
			...prevTransactions,
			newTransaction,
		]);
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
