const formatAmount = (amount) => {
	return Number((Math.round(amount * 100) / 100).toFixed(2));
};

export default formatAmount;
