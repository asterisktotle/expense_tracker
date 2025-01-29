'use client';

// TODO: expenses and income will have its own pie chart, make this a reusable component
// 1. change the charData to be dynamic and use the list of transactions
// 2. change the tooltip label to be the transactions label

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';
import { useContext, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { GlobalContext } from '../context/GlobalContext';

const chartData = [
	{ browser: 'chrome', visitors: 200, fill: 'var(--color-chrome)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
	{ expense: 'internet', value: 187, fill: 'var(--color-firefox)' },
	// { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
	// { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
	{ expense: 'food', value: 99, fill: 'var(--color-food)' },
	{ expense: 'pets', value: 99, fill: 'var(--color-pets)' },
	{ expense: 'other', value: 99, fill: 'var(--color-other)' },
];

const data = [
	{ category: 'beauty', amount: 221, fill: 'var(--color-beauty)' },
	{ category: 'food', amount: 221, fill: 'var(--color-food)' },
	{ category: 'pets', amount: 221, fill: 'var(--color-pets)' },
	{ category: 'other', amount: 221, fill: 'var(--color-other)' },
];

export function PieSummary() {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('PieSummary must be used within a GlobalProvider');
	}

	const { transactions } = context;

	const chartDatas =
		transactions.length > 0
			? transactions.map(({ category, amount }) => ({
					category,
					amount,
					fill: `var(--color-${category})`,
			  }))
			: null;

	const chartConfig = {
		value: {
			label: 'value',
		},
		food: {
			label: 'Food',
			color: 'hsl(var(--chart-1))',
		},
		pets: {
			label: 'Pets',
			color: 'hsl(var(--chart-2))',
		},
		beauty: {
			label: 'Beauty',
			color: 'hsl(var(--chart-3))',
		},
		transport: {
			label: 'Transport',
			color: 'hsl(var(--chart-4))',
		},
		other: {
			label: 'Other',
			color: 'hsl(var(--chart-5))',
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Pie Chart - Label List</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="browser" hideLabel />}
						/>
						<Pie
							data={chartDatas && chartDatas.length > 0 ? chartDatas : data}
							dataKey="amount"
						>
							<LabelList
								dataKey="category"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartConfig) =>
									chartConfig[value]?.label
								}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
