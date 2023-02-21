import { useState } from 'react';
import './App.css';
import { Toggle } from './components/toggle';
import { TimePicker } from './components/time-picker';

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-y-4">
			{days.map((day) => (
				<div className="w-1/2 flex gap-2 items-center">
					<div className="w-1/3 flex gap-2">
						<Toggle />
						<label>{day}</label>
					</div>

					<div className="w-2/3">
						<TimePicker />
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
