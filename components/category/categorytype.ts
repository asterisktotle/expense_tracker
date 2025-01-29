type ExpenseCategoryType =
	| 'food'
	| 'social-life'
	| 'pets'
	| 'transport'
	| 'culture'
	| 'household'
	| 'apparel'
	| 'beauty'
	| 'health'
	| 'education'
	| 'gift'
	| 'other';

type IncomeCategoryType =
	| 'allowance'
	| 'salary'
	| 'bonus'
	| 'petty-cash'
	| 'other';

export type CategoryType = ExpenseCategoryType | IncomeCategoryType;
