import { useContext } from "react";
import LeftArrow from "../Svg/LeftArrow";
import { BookContext } from "../../Context/BookProvider";

const ThemeColorSwitch = () => {
	const {showSetting} = useContext(BookContext)
	return (
		<div className="flex flex-col absolute bottom-5 -right-[22px] bg-white shadow-theme-chapter-shadow w-[200px] min-h-[339px] z-20">
			<div 
				className="flex font-semibold gap-2 font-poppins text-sm items-center shadow-theme-chapter-shadow px-2 py-4 hover:bg-theme-books-bn transition-all duration-300 ease-in-out h-[52px]"
				onClick={ showSetting }
			>
				<div className="w-5">
					<LeftArrow />
				</div>
				<span>Choose Theme</span> 
			</div>
			<div className="flex flex-col h-[287px] overflow-x-auto" id="scrollBarStyle">
				<span className="playback_speed_list border-b-theme-border-1 border-theme-border">Theme Color 1</span>
				<span className="playback_speed_list border-b-theme-border-1 border-theme-border">Theme Color 2</span>
				<span className="playback_speed_list border-b-theme-border-1 border-theme-border">Theme Color 3</span>
				<span className="playback_speed_list border-b-theme-border-1 border-theme-border">Theme Color 4</span>
			</div>
		</div>
	);
};

export default ThemeColorSwitch;