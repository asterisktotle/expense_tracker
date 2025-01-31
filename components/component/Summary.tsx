'use client';
import { GlobalContext } from '../context/GlobalContext';
import { useContext, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
const Summary = () => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('AddTransaction must be used within a GlobalProvider');
	}
	const { transactions, deleteTransaction, editTransaction } = context;

	const expenses = transactions.filter(
		(transaction) => transaction.label === 'expense'
	);
	const income = transactions.filter(
		(transaction) => transaction.label === 'income'
	);

	const [isEdit, setIsEdit] = useState(false);
	const [editedAmount, setEditedAmount] = useState<number>(0);
	const [editedDetails, setEditedDetails] = useState<string>('');
	const [editedCategory, setEditedCategory] = useState<string>('');
	// const [index, setIndex] = useState<number | null>(null);

	const handleEditSubmit = (selectedIndex: number) => {
		const editedTransact = {
			details: editedDetails || transactions[selectedIndex].details,
			amount: editedAmount || transactions[selectedIndex].amount,
			category: editedCategory || transactions[selectedIndex].category,
		};
		editTransaction(editedTransact, selectedIndex);
		setIsEdit(!isEdit);
	};

	// const editedTransact = {
	// 	id: transactions[index].id,
	// 	details: selectedTransact.details,
	// 	amount: selectedTransact.amount,
	// 	category: transactions[index].category,
	// 	label: selectedTransact.label,
	// };

	const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
	const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

	return (
		<div className="  w-full sm:w-[40rem] lg:w-[55rem] flex flex-col  items-center rounded-xl border bg-card text-card-foreground">
			<h2 className="font-bold text-[1.2rem] pt-2">Transactions</h2>
			<div className="flex flex-col w-full p-2 gap-2">
				<div className="flex flex-col gap-1 ">
					<p className=" border-black font-semibold">Expenses</p>
					{expenses && expenses.length ? (
						expenses.map((transaction, index) => {
							return (
								<div
									className="flex gap-2 justify-between "
									key={transaction.id}
								>
									{isEdit ? (
										<div className="flex gap-10">
											<Input
												value={editedAmount}
												placeholder={String(`P ${transaction.amount}`)}
												onChange={(e) =>
													setEditedAmount(Number(e.target.value))
												}
											></Input>
											<Input
												value={editedDetails}
												placeholder={transaction.details}
												onChange={(e) => setEditedDetails(e.target.value)}
											></Input>
											<Input
												value={editedCategory}
												placeholder={transaction.category}
												onChange={(e) => setEditedCategory(e.target.value)}
											></Input>
											<Button onClick={() => handleEditSubmit(index)}>
												{isEdit ? 'Save' : 'Edit'}
											</Button>
										</div>
									) : (
										<div className="flex gap-10">
											<p>P {transaction.amount}</p>
											<p>{transaction.details}</p>
											<p>{transaction.category}</p>
										</div>
									)}
									<div className="flex gap-2">
										<button
											className="bg-blue-400 px-2 py-1 text-white rounded-md text-center shadow-md w-[4rem]"
											onClick={() => {
												setIsEdit(true);
											}}
										>
											Edit
										</button>
										<button
											className="bg-red-400 px-2 py-1 text-white rounded-md text-center shadow-md w-[4rem]"
											onClick={() => deleteTransaction(transaction.id)}
										>
											Delete
										</button>
									</div>
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
									<p>{transaction.details}</p>
									<p>{transaction.category}</p>
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
