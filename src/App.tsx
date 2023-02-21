import { useState } from 'react';
import './App.css';
import { Toggle } from './components/toggle';
import { TimePicker } from './components/time-picker';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-1/3 flex gap-2 items-center">
				<div className="w-1/4">
					<Toggle />
				</div>

				<TimePicker />
			</div>
		</div>
	);
}

export default App;
