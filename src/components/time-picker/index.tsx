import { useState } from 'react';
import DatePicker from 'react-datepicker';

export const TimePicker = ({
	onStartTimeChange = (time: any) => {},
	onEndTimeChange = (time: any) => {},
}) => {
	const [startDate, setStartDate] = useState({ hours: 9, minutes: 0 });
	const [endDate, setEndDate] = useState({ hours: 17, minutes: 0 });

	return (
		<div className="flex gap-1 items-center">
			<div>
				<DatePicker
					className="w-3/4 border-2 rounded-md p-2 border-gray-500 hover:border-gray-800 "
					selected={
						new Date(0, 0, 0, startDate.hours, startDate.minutes)
					}
					onChange={(date: Date) => {
						setStartDate({
							hours: date.getHours(),
							minutes: date.getMinutes(),
						});
						onStartTimeChange({
							hours: date.getHours(),
							minutes: date.getMinutes(),
						});
					}}
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
					selected={new Date(0, 0, 0, endDate.hours, endDate.minutes)}
					onChange={(date: Date) => {
						setEndDate({
							hours: date.getHours(),
							minutes: date.getMinutes(),
						});
						onEndTimeChange({
							hours: date.getHours(),
							minutes: date.getMinutes(),
						});
					}}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="Time"
					dateFormat="h:mm aa"
					filterTime={(time: Date) => {
						return (
							time.getHours() > startDate.hours ||
							(time.getHours() === startDate.hours &&
								time.getMinutes() > startDate.minutes)
						);
					}}
				/>
			</div>
		</div>
	);
};
