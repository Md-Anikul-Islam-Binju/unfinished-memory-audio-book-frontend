/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { BookContext } from "../../Context/BookProvider";

const LineHighlight = ({ lineData }) => {
	const {audioTime} = useContext(BookContext)
	const {start_time, end_time, line} = lineData

	if(!start_time || !end_time) {
		return (
			<span>
				{line}
			</span>
		);
	}

	const [startTimeMinute, startTimeSeconds, startTimeMillisecond] = start_time.split(':')
	const startTime = (parseInt(startTimeMinute) * 60 + parseInt(startTimeSeconds)) * 1000 + parseInt(startTimeMillisecond)
	const [endTimeMinute, endTimeSeconds, endTimeMillisecond] = end_time.split(':')
	const endTime = (parseInt(endTimeMinute) * 60 + parseInt(endTimeSeconds)) * 1000 + parseInt(endTimeMillisecond)

	return (
		<>
			{
				<span className={`${audioTime >= startTime && audioTime <= endTime ? 'text-theme-lang-switcher transition-all duration-700 ease-in-out font-bold' : ''}`}>
					{line}
				</span>
			}
		</>
	);
};

export default LineHighlight;