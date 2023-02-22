import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TimePicker } from '../../components/time-picker';
import request from '../../utils/request';
import { Toggle } from '../../components/toggle';

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export default function AvailabilityTemplate() {
	const [times, setTimes] = useState(
		Array(7)
			.fill({
				start: { hours: 9, minutes: 0 },
				end: { hours: 17, minutes: 0 },
				enabled: false,
			})
			.map((time, index) => ({ ...time, day: index + 1 }))
	);
	const [dateRange, setDateRange] = useState([null, null]);
	const [isChecked, setIsChecked] = useState(false);

	const onTimeChange = (time: any, day: number, start = true) => {
		setTimes((prev) => {
			const newTimes = [...prev];
			if (start) {
				newTimes[day].start = time;
			} else {
				newTimes[day].end = time;
			}

			return newTimes;
		});
	};

	const onToggle = (enabled: boolean, day: number) => {
		setTimes((prev) => {
			const newTimes = [...prev];
			newTimes[day] = { ...newTimes[day], enabled };
			return newTimes;
		});
	};

	const saveChanges = async (e: any) => {
		e.preventDefault();
		// [{start: {hours:9, minutes:0} , end: {hours:17, minutes:0}, days: [1,2,3,4,5,6,7]}]
		const availabilities = times
			.filter((time: any) => time.enabled)
			.reduce((acc, curr) => {
				//check if curr start and end time is already in acc
				const found = acc.find(
					(time: any) =>
						time.start.hours === curr.start.hours &&
						time.start.minutes === curr.start.minutes &&
						time.end.hours === curr.end.hours &&
						time.end.minutes === curr.end.minutes
				);
				if (found) {
					found.days.push(curr.day);
				} else {
					acc.push({
						start: curr.start,
						end: curr.end,
						days: [curr.day],
					});
				}

				return acc;
			}, []);

		const result = await request.post(
			'/availabilities/bulk',
			isChecked
				? {
						availabilities,
						limit: dateRange,
				  }
				: { availabilities }
		);

		//@ts-ignore
		if (result.success === true) {
			alert('Availabilities saved successfully');
		}
	};
	return (
		<div className="flex flex-col border shadow-sm p-4 items-center">
			<div className="flex flex-col gap-4 items-center">
				{days.map((day, i) => (
					<div key={i} className="flex items-center">
						<div className="w-1/3 flex gap-2 ">
							<Toggle
								onToggle={(enabled) => onToggle(enabled, i)}
							/>
							<label>{day}</label>
						</div>

						<div className="w-2/3 ">
							<TimePicker
								onEndTimeChange={(time: any) => {
									onTimeChange(time, i, false);
								}}
								onStartTimeChange={(time: any) => {
									onTimeChange(time, i, true);
								}}
							/>
						</div>
					</div>
				))}
			</div>

			<div className="flex gap-44 mt-4 mb-4">
				<div className="flex items-center ">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						onChange={() => {
							setIsChecked(!isChecked);
						}}
						className="accent-blue-500 w-4 h-4"
						checked={isChecked}
					/>
					<label htmlFor="default-checkbox" className="ml-2 ">
						Limit Future Bookings
					</label>
				</div>
				<DatePicker
					clearButtonClassName=""
					className="border-2 rounded-md p-2 border-gray-500 hover:border-gray-800"
					selectsRange={true}
					startDate={dateRange[0]}
					endDate={dateRange[1]}
					onChange={(update: any) => {
						setDateRange(update);
					}}
					disabled={!isChecked}
					placeholderText="Select a date range"
					withPortal
				/>
			</div>

			<button
				onClick={saveChanges}
				className="bg-gray-900 text-white rounded-md p-3 m-3 w-1/3">
				Save Changes
			</button>
		</div>
	);
}
