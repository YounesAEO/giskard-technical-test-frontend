import { getSlots, formatTime } from '../../utils/helpers';

const AvailableTimes = ({
	availableTimes,
	reservations,
	selectedDate,
	duration = 30,
	onSelectDate = (date: Date) => {},
}: {
	availableTimes: {
		start: { hours: number; minutes: number };
		end: { hours: number; minutes: number };
	}[];
	reservations: {
		start: Date;
		end: Date;
	}[];
	selectedDate: Date;
	duration: number;
	onSelectDate: any;
}) => {
	// fetch available times
	const slots: {
		start: { hours: number; minutes: number };
		end: { hours: number; minutes: number };
	}[] = availableTimes.flatMap(({ start, end }) => {
		return getSlots(start, end, duration).filter((slot) => {
			return !reservations.some((reservation) => {
				const reservationStart = new Date(reservation.start);
				const reservationEnd = new Date(reservation.end);
				const slotStart = new Date(selectedDate);
				slotStart.setHours(slot.start.hours, slot.start.minutes);
				const slotEnd = new Date(selectedDate);
				slotEnd.setHours(slot.end.hours, slot.end.minutes);
				return (
					(slotStart >= reservationStart &&
						slotStart < reservationEnd) ||
					(slotEnd > reservationStart && slotEnd <= reservationEnd)
				);
			});
		});
	});

	return (
		<div className="flex flex-col space-y-4 overflow-auto max-h-96">
			<div className="flex flex-col pr-2 space-y-2">
				{slots?.length > 0 ? (
					slots?.map((item, idx) => {
						return (
							<div
								key={idx}
								className="flex items-center justify-center flex-1 py-4 border rounded-sm cursor-pointer hover:bg-gray-100 hover:border-gray-400"
								onClick={(e) => {
									e && e.preventDefault();
									const dateTime = new Date(selectedDate);
									dateTime.setHours(
										item.start.hours,
										item.start.minutes
									);

									onSelectDate(dateTime);
								}}>
								<span className="text-gray-600">
									{formatTime(
										new Date(
											0,
											0,
											0,
											item.start.hours,
											item.start.minutes
										)
									)}
								</span>
							</div>
						);
					})
				) : (
					<p className="mt-4 font-medium text-center text-gray-400">
						No times available
					</p>
				)}
			</div>
		</div>
	);
};
export default AvailableTimes;
