import { useState } from 'react';
import DatePicker from 'react-datepicker';

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setHours(9);
DEFAULT_START_DATE.setMinutes(0);

const DEFAULT_END_DATE = new Date();
DEFAULT_END_DATE.setHours(17);
DEFAULT_END_DATE.setMinutes(0);

export const TimePicker = () => {
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

	return (
		<div className="flex gap-1 items-center">
			<div>
				<DatePicker
					className="w-3/4 border-2 rounded-md p-2 border-gray-500 hover:border-gray-800 "
					selected={startDate}
					onChange={(date: Date) => setStartDate(date)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="Time"
					dateFormat="h:mm aa"
				/>
			</div>

			<div className="w-1/3 text-2xl font-medium">-</div>
			<div>
				<DatePicker
					className="w-3/4 border-2 rounded-md p-2 border-gray-500 hover:border-gray-800 "
					selected={endDate}
					onChange={(date: Date) => setEndDate(date)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="Time"
					dateFormat="h:mm aa"
				/>
			</div>
		</div>
	);
};
