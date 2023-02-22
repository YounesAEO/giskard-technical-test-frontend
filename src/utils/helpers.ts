import { IAvailability } from '../templates/reservation';
export const addMonths = (date: Date, n: number) => {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + n);
	return newDate;
};

export const getSlots = (
	start: { hours: number; minutes: number },
	end: { hours: number; minutes: number },
	duration: number
) => {
	const slots = [];
	const startMinutes = start.hours * 60 + start.minutes;
	const endMinutes = end.hours * 60 + end.minutes;
	for (let i = startMinutes; i < endMinutes; i += duration) {
		const startHours = Math.floor(i / 60);
		const startMinutes = i % 60;
		const endHours = Math.floor((i + duration) / 60);
		const endMinutes = (i + duration) % 60;
		slots.push({
			start: {
				hours: startHours,
				minutes: startMinutes,
			},
			end: {
				hours: endHours,
				minutes: endMinutes,
			},
		});
	}
	return slots;
};

export const formatTime = (date: Date) => {
	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	return formatter.format(date);
};

export const isWithinDates = (date: Date, availableDates: IAvailability[]) => {
	return availableDates.some((availableDate) => {
		return availableDate.days.includes(date.getDay() + 1);
	});
};
