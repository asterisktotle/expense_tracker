'use client';

import AddTransaction from './AddTransaction';
import FormTransaction from './FormTransaction';
import { PieSummary } from './PieChart';
import Summary from './Summary';

const Main = () => {
	return (
		<div className="flex flex-col h-svh   pt-2 px-2">
			<div className="flex justify-between">
				<header className=" flex justify-between mb-5 mt-3 font-bold text-2xl text-blue-500 mx-5 w-screen">
					<h1>Expense Tracker</h1> <AddTransaction />
				</header>
			</div>
			<div className="flex  flex-col gap-3 items-center ">
				<Summary />
				<PieSummary />
			</div>
			<div>
				<FormTransaction />
			</div>
		</div>
	);
};

export default Main;
