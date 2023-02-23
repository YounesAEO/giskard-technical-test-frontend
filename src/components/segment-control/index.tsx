import cn from 'classnames';

const SegmentedControl = ({
	data = [],
	value: _value,
	onChange = (_: any) => {},
}: {
	data: any[];
	value: any;
	onChange?: any;
}) => {
	return (
		<div className="bg-blue-gray-50 border border-gray-300 flex justify-between items-center rounded-sm">
			{data?.map(({ value, label }, i) => (
				<a
					key={i}
					href="#notif-read"
					className={cn(
						'py-1.5 px-4 focus:outline-none border-gray-300 text-xs flex-grow text-center',
						{
							'text-gray-500 hover:bg-gray-50': value !== _value,
							'bg-gray-800 text-white': value === _value,
							'border-r': data?.length - 1 !== i,
						}
					)}
					onClick={(e) => {
						e.preventDefault();
						console.log(value, _value);
						onChange(value);
					}}>
					{label}
				</a>
			))}
		</div>
	);
};

export default SegmentedControl;
