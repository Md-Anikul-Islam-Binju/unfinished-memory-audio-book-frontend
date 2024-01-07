/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { BookContext } from "../Context/BookProvider";

const Line = ({ page }) => {
	const {audioTime} = useContext(BookContext)
	const {start_time, end_time, line} = page

	if(!start_time || !end_time) {
		return (
			''
		);
	}

	const [startTimeMinute, startTimeSeconds, startTimeMillisecond] = start_time.split(':')
	const startTime = (parseInt(startTimeMinute) * 60 + parseInt(startTimeSeconds)) * 1000 + parseInt(startTimeMillisecond)
	const [endTimeMinute, endTimeSeconds, endTimeMillisecond] = end_time.split(':')
	const endTime = (parseInt(endTimeMinute) * 60 + parseInt(endTimeSeconds)) * 1000 + parseInt(endTimeMillisecond)

	return (
		<>
			{
				<span className={`${audioTime >= startTime && audioTime <= endTime ? 'bg-theme-line-highlight transition-all duration-300 ease-in-out' : ''}`}>
					{line}
				</span>
			}
		</>
	);
};

export default Line;