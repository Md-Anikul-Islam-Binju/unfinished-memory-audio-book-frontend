import { useContext } from "react";
import LeftArrow from "../Svg/LeftArrow";
import { BookContext } from "../../Context/BookProvider";
import { ThemeContext } from "../../Context/ThemeProvider";

const PlaybackSpeed = () => {
	const {showSetting, handleSpeedChange, selectedSpeed, convertEngToBng} = useContext(BookContext)
	const { selectedLanguage } = useContext(ThemeContext)
	return (
		<div className="choose_option_wrap">
			<div 
				className="choose_wrap" 
				onClick={ showSetting }
			>
				<div className="w-5">
					<LeftArrow />
				</div>
				<span>
					{
						selectedLanguage === 'en' ? 'Options' : 'অপশন'
					}
				</span> 
			</div>
			<div className="flex flex-col h-[287px] overflow-x-auto" id="scrollBarStyle">
				<span 
					className={`playback_speed_list border-b-theme-border-1 border-theme-border ${selectedSpeed === 0.75 ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`} 
					onClick={() => handleSpeedChange(0.75)}
				>{convertEngToBng(0.75)}</span>
				<span 
					className={`playback_speed_list border-b-theme-border-1 border-theme-border ${selectedSpeed === 1 ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`} 
					onClick={() => handleSpeedChange(1)}
				>{selectedLanguage === 'en' ? 'Normal' : 'নরমাল'}</span>
				<span 
					className={`playback_speed_list border-b-theme-border-1 border-theme-border ${selectedSpeed === 1.25 ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`} 
					onClick={() => handleSpeedChange(1.25)}
				>{convertEngToBng(1.25)}</span>
				<span 
					className={`playback_speed_list border-b-theme-border-1 border-theme-border ${selectedSpeed === 1.5 ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`} 
					onClick={() => handleSpeedChange(1.5)}
				>{convertEngToBng(1.5)}</span>
			</div>
		</div>
	);
};

export default PlaybackSpeed;