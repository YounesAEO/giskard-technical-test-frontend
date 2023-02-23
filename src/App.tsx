import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AvailabilityTemplate from './templates/availability';
import ReservationTemplate from './templates/reservation';

const router = createBrowserRouter([
	{ path: '/', element: <AvailabilityTemplate /> },
	{ path: '/availability', element: <AvailabilityTemplate /> },
	{ path: '/reservation', element: <ReservationTemplate /> },
]);
function App() {
	return (
		<div className="flex flex-col h-screen mt-4 items-center justify-center gap-y-4">
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
