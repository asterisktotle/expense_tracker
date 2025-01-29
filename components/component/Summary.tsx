'use client';
import { GlobalContext } from '../context/GlobalContext';
import { useContext, useEffect } from 'react';
const Summary = () => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('AddTransaction must be used within a GlobalProvider');
	}
	const { transactions } = context;

	useEffect(() => {
		console.log('Transaction updated: ', transactions);
	}, [transactions]);

	const expenses = transactions.filter(
		(transaction) => transaction.label === 'expense'
	);
	const income = transactions.filter(
		(transaction) => transaction.label === 'income'
	);

	const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
	const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

	return (
		<div className="  w-[90%]  flex flex-col  items-center sm:bg-blue-400 rounded-xl border bg-card text-card-foreground">
			<h2 className="font-bold text-[1.2rem] pt-2">Transactions</h2>
			<div className="flex flex-col w-full p-2 gap-2">
				<div className="flex flex-col gap-1 ">
					<p className=" border-black font-semibold">Expenses</p>
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
				</div>

				<p> Total: P{totalExpenses ? totalExpenses : ' 0.00'} </p>
			</div>

			<div className="flex flex-col w-full p-2 gap-2 bg-gray-300">
				<div className="flex flex-col gap-1 ">
					<p className="font-semibold ">Income</p>

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
				</div>

				<p> Total: P{totalIncome ? totalIncome : ' 0.00'} </p>
			</div>
		</div>
	);
};

export default Summary;
