import { useState } from 'react';
import './App.css';
import { Toggle } from './components/toggle';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<Toggle />
		</div>
	);
}

export default App;
