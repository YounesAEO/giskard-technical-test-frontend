import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ReservationModal from '../../components/reservation-modal';
import AvailableTimes from '../../components/available-times';
import SegmentedControl from '../../components/segment-control';
import request from '../../utils/request';
import { addMonths, isWithinDates } from '../../utils/helpers';
import 'react-calendar/dist/Calendar.css';
import './reservation.css';

interface IReservationTemplateState {
	_id?: string;
	availableDates: IAvailability[] | [];
	duration: number;
	title: string;
}

export interface IAvailability {
	start: { hours: number; minutes: number };
	end: { hours: number; minutes: number };
	days: number[];
}

// test with dummy data
const dummyData: IAvailability[] = [
	{
		start: { hours: 9, minutes: 0 },
		end: { hours: 12, minutes: 0 },
		days: [1, 2, 3],
	},
	{
		start: { hours: 13, minutes: 0 },
		end: { hours: 17, minutes: 0 },
		days: [4, 5, 6, 7],
	},
];

export default function ReservationTemplate() {
	const [state, setState] = useState<IReservationTemplateState>({
		availableDates: [],
		duration: 30,
		title: 'Meeting With Younes',
	});
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedDateTime, setSelectedDateTime] = useState(new Date());
	const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
	const [reservations, setReservations] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const limitEnd = null;
	const limitStart = null;

	// add useEffect to fetch data from the backend and set the state
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			// call the backend to get the available dates
			const response = await request.get('/availabilities');
			//@ts-ignore
			if (response.success) {
				const { data } = response;
				const availableDates = data.map((date: any) => {
					return {
						start: {
							hours: date.start.hours,
							minutes: date.start.minutes,
						},
						end: {
							hours: date.end.hours,
							minutes: date.end.minutes,
						},
						days: date.days,
					};
				});

				setState({
					availableDates,
					duration: 30,
					title: 'Meeting With Younes',
				});
			}

			// call the backend to get the reservations
			const reservationsResponse = await request.get('/reservations');
			//@ts-ignore
			if (reservationsResponse.success) {
				const { data: reservations } = reservationsResponse;
				setReservations(
					reservations.map((reservation: any) => {
						return {
							start: new Date(reservation.start),
							end: new Date(reservation.end),
						};
					})
				);
			}
			setIsLoading(false);
		})();
	}, []);

	// fix this function

	return (
		<>
			<ReservationModal
				data={{
					reservationDateTime: selectedDateTime,
					duration: state.duration,
				}}
				isOpen={isReservationModalOpen}
				onClose={() => setIsReservationModalOpen(false)}
				onConfirm={async () => {
					setIsReservationModalOpen(false);
					const reservationsResponse = await request.get(
						'/reservations'
					);
					//@ts-ignore
					if (reservationsResponse.success) {
						const { data: reservations } = reservationsResponse;
						setReservations(
							reservations.map((reservation: any) => {
								return {
									start: new Date(reservation.start),
									end: new Date(reservation.end),
								};
							})
						);
					}
				}}
			/>
			<div className="flex w-2/3 bg-white border divide-x shadow-sm">
				<div className="flex flex-col items-center w-1/2 p-8 space-y-6 opacity-80">
					<div className="flex-shrink-0">
						<div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-900 rounded-full">
							<span className="font-medium text-gray-100 text-2xl">
								YA
							</span>
						</div>
					</div>

					<h1 className="text-2xl font-semibold text-center text-gray-800">
						{`Meeting With Younes`}
					</h1>

					<div className="flex items-center justify-center w-full p-2 text-gray-700">
						<Calendar
							className="_react-calendar"
							// onChange={(value: Date, e: any) => {
							// 	setSelectedDate(value);
							// }}
							onClickDay={(value, e) => {
								setSelectedDate(value);
							}}
							value={selectedDate}
							defaultView="month"
							view="month"
							maxDetail="month"
							maxDate={limitEnd || addMonths(new Date(), 2)}
							minDate={limitStart || new Date()}
							// @ts-ignore
							tileDisabled={({ date, view }) => {
								if (view === 'month') {
									return !isWithinDates(
										date,
										state.availableDates
									);
								}
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col w-1/2 p-8 h-screen">
					<div className="mb-8 space-y-4">
						<h3 className="font-bold">How long do you need?</h3>

						<SegmentedControl
							data={[
								{ value: 15, label: '15 mins' },
								{ value: 30, label: '30 mins' },
								{ value: 60, label: '1 hour' },
							]}
							value={state?.duration || 30}
							onChange={(value: any) => {
								setState({
									...state,
									duration: value,
								});
							}}
						/>
					</div>

					<h3 className="mb-4 font-bold">What time works best ?</h3>
					{!isLoading ? (
						<AvailableTimes
							availableTimes={state?.availableDates.filter(
								(item) =>
									item.days.includes(selectedDate.getDay())
							)}
							reservations={reservations}
							duration={state?.duration}
							selectedDate={selectedDate}
							onSelectDate={(date: Date) => {
								setSelectedDateTime(date);
								setIsReservationModalOpen(true);
							}}
						/>
					) : (
						<div>Loading...</div>
					)}
				</div>
			</div>
		</>
	);
}
