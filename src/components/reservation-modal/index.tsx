import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import request from '../../utils/request';

export default function ReservationModal({
	isOpen,
	data,
	onClose = () => {},
	onConfirm = () => {},
}: {
	isOpen: boolean;
	data: { reservationDateTime: Date; duration: number };
	onClose: () => any;
	onConfirm: () => any;
}) {
	const [reservationDetails, setReservationDetails] = useState({
		name: '',
		title: '',
		email: '',
	});
	const [isLoading, setIsloading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const _onClose = () => {
		if (isLoading) return;
		onClose();
	};

	const _onConfirm = async (e: any) => {
		e.preventDefault();
		setIsloading(true);
		const payload = {
			start: data.reservationDateTime,
			end: new Date(
				data.reservationDateTime.getTime() + data.duration * 60000
			),
			...reservationDetails,
		};
		const response = await request.post('/reservations', payload);
		console.log(response);
		// @ts-ignore
		if (response.success) {
			onConfirm();
			_onClose();
		} else {
			// show error message
			onClose();
		}

		setIsloading(false);
	};

	const isButtonDisabled =
		!reservationDetails.name ||
		!reservationDetails.title ||
		!reservationDetails.email ||
		isDisabled ||
		isLoading;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900">
									Confirm Reservation
								</Dialog.Title>
								<div className="mt-1 mb-3">
									<p className="text-sm text-gray-500">
										Please provide the following details to
										confirm your reservation.
									</p>
								</div>

								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700">
										Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="mt-2 mb-3 p-2 border border-gray-300  block w-full shadow-sm rounded-md"
										placeholder="What's your name?"
										onChange={(e) => {
											setReservationDetails({
												...reservationDetails,
												name: e.target.value,
											});
										}}
									/>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700">
										Title
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="mt-2 mb-3 p-2 border border-gray-300  block w-full shadow-sm rounded-md"
										placeholder="What's this reservation for?"
										onChange={(e) => {
											setReservationDetails({
												...reservationDetails,
												title: e.target.value,
											});
										}}
									/>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700">
										Email address
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="mt-2 mb-3 p-2 border border-gray-300  block w-full shadow-sm rounded-md"
										placeholder="What's your email?"
										onChange={(e) => {
											setReservationDetails({
												...reservationDetails,
												email: e.target.value,
											});

											// check if input has invalid attirbute
											if (e.target.validity.valid) {
												setIsDisabled(false);
											} else {
												setIsDisabled(true);
											}
										}}
									/>
								</div>

								<div className="mt-4 float-right">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent disabled:text-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:enabled:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
										// @ts-ignore
										onClick={_onConfirm}
										disabled={isButtonDisabled}>
										{isLoading
											? 'Loading...'
											: 'Confirm Reservation'}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
