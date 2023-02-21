import { useState } from 'react';
import DatePicker from 'react-datepicker';
import React from 'react';

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setHours(9);
DEFAULT_START_DATE.setMinutes(0);

const DEFAULT_END_DATE = new Date();
DEFAULT_END_DATE.setHours(17);
DEFAULT_END_DATE.setMinutes(0);

export const TimePicker = () => {
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
	const [isStartOpen, setIsStartOpen] = useState(false);
	const [isEndOpen, setIsEndOpen] = useState(false);

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

		// <div className="flex gap-4 justify-center">
		// 	<div>
		// 		<button
		// 			className="border-2 rounded-md p-2 border-gray-500 hover:border-gray-800 "
		// 			onClick={(e: any) => {
		// 				e.preventDefault();
		// 				setIsStartOpen(!isStartOpen);
		// 			}}>
		// 			{new Intl.DateTimeFormat('en-US', {
		// 				hour: 'numeric',
		// 				minute: 'numeric',
		// 				hour12: true,
		// 			}).format(startDate)}
		// 		</button>
		// 		{isStartOpen && (
		// 			<div>
		// 				<DatePicker
		// 					selected={startDate}
		// 					showTimeSelect
		// 					showTimeSelectOnly
		// 					timeIntervals={15}
		// 					timeCaption="Start Time"
		// 					dateFormat="h:mm aa"
		// 					onChange={(date: Date) => {
		// 						setIsStartOpen(!isStartOpen);
		// 						setStartDate(date);
		// 					}}
		// 					inline
		// 				/>
		// 			</div>
		// 		)}
		// 	</div>

		// 	<div>-</div>
		// 	<div>
		// 		<button
		// 			className="border-2 rounded-md p-2 border-gray-500 hover:border-gray-800 "
		// 			onClick={(e: any) => {
		// 				e.preventDefault();
		// 				setIsEndOpen(!isEndOpen);
		// 			}}>
		// 			{new Intl.DateTimeFormat('en-US', {
		// 				hour: 'numeric',
		// 				minute: 'numeric',
		// 				hour12: true,
		// 			}).format(endDate)}
		// 		</button>
		// 		{isEndOpen && (
		// 			<div>
		// 				<DatePicker
		// 					selected={endDate}
		// 					showTimeSelect
		// 					showTimeSelectOnly
		// 					timeIntervals={15}
		// 					timeCaption="End Time"
		// 					dateFormat="h:mm aa"
		// 					onChange={(date: Date) => {
		// 						setIsEndOpen(!isEndOpen);
		// 						setEndDate(date);
		// 					}}
		// 					inline
		// 				/>
		// 			</div>
		// 		)}
		// 	</div>
		// </div>
	);
};
