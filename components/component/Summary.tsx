'use client';
import { GlobalContext } from '../context/GlobalContext';
import { useContext } from 'react';
import formatAmount from '@/utils/formatAmount';
const Summary = () => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('AddTransaction must be used within a GlobalProvider');
	}
	const { transactions } = context;

	const expenses = transactions.filter(
		(transaction) => transaction.category === 'expense'
	);
	const income = transactions.filter(
		(transaction) => transaction.category === 'income'
	);

	const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
	const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

	return (
		<div>
			<h2>Transactions</h2>
			<div className="flex flex-col w-full p-2 bg-gray-300">
				<p>Expenses</p>
				{expenses && expenses.length ? (
					expenses.map((transaction) => {
						return (
							<div className="flex gap-2  " key={transaction.id}>
								<p>P {transaction.amount}</p>
								{/* <p>{transaction.category}</p> */}
								<p>{transaction.details}</p>
							</div>
						);
					})
				) : (
					<p>No Transactions</p>
				)}

				<p> Total: P{totalExpenses ? totalExpenses : ' 0.00'} </p>
			</div>

			<div className="flex flex-col w-full p-2 bg-gray-300">
				<p>Income</p>
				{income && income.length ? (
					income.map((transaction) => {
						return (
							<div className="flex gap-2  " key={transaction.id}>
								<p>P {transaction.amount}</p>
								{/* <p>{transaction.category}</p> */}
								<p>{transaction.details}</p>
							</div>
						);
					})
				) : (
					<p>No Transactions</p>
				)}

				<p> Total: P{totalIncome ? totalIncome : ' 0.00'} </p>
			</div>
		</div>
	);
};

export default Summary;
