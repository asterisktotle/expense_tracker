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
	deleteTransaction: (id: number) => void;
	editTransaction: (
		selectedTransact: EditedTransactionDataProps,
		index: number
	) => void;
}

interface TransactionDataProps {
	details: string;
	amount: number;
	category: string;
	label: string;
}

interface EditedTransactionDataProps {
	details: string;
	amount: number;
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

	const deleteTransaction = (id: number) => {
		setTransactions((prevTransact) =>
			prevTransact.filter((transact) => transact.id !== id)
		);
	};

	const editTransaction = (
		selectedTransact: EditedTransactionDataProps,
		index: number
	) => {
		setTransactions((prevTransact) =>
			prevTransact.map((transact, i) =>
				i === index
					? {
							id: transactions[index].id,
							details: selectedTransact.details,
							amount: selectedTransact.amount,
							category: selectedTransact.category,
							label: transactions[index].label,
					  }
					: transact
			)
		);

		console.log('edit saved');
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
				deleteTransaction,
				editTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
