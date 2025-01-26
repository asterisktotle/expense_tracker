'use client';

import AddTransaction from './AddTransaction';
import Summary from './Summary';

const Main = () => {
	return (
		<div className="flex flex-col h-svh ">
			<div className="flex justify-between w-svw">
				<header className="font-bold text-2xl text-blue-500">
					Expense Tracker
				</header>
				<AddTransaction />
			</div>
			<div>
				<Summary />
			</div>
		</div>
	);
};

export default Main;
