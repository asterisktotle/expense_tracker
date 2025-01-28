'use client';

import { Button } from '../ui/button';
import { useState } from 'react';
import FormTransaction from './FormTransaction';

const Register = () => {
	let [open, setOpen] = useState(false);
	return (
		<>
			<FormTransaction />
		</>
	);
};

export default Register;
