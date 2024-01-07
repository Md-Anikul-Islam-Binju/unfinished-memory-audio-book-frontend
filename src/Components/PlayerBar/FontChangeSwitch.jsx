import { useContext } from "react";
import LeftArrow from "../Svg/LeftArrow";
import { BookContext } from "../../Context/BookProvider";
import { fontFamilyCollection } from "../../Constants";
import { ThemeContext } from "../../Context/ThemeProvider";

const FontChangeSwitch = () => {
	const {showSetting, handleFontFamilyUpdate, fontFamilyUpdate} = useContext(BookContext)
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
						selectedLanguage === 'en' ? 'Choose Font' : 'ফন্ট নির্বাচন করুন'
					}
				</span> 
			</div>
			<div className="flex flex-col h-[287px] overflow-x-auto" id="scrollBarStyle">
				{
					fontFamilyCollection.map((fontFamily) => (
						<span 
							className={`playback_speed_list border-b-theme-border-1 border-theme-border ${fontFamilyUpdate.name === fontFamily.name ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`}
							key={fontFamily.id}
							onClick={() => handleFontFamilyUpdate(fontFamily)}
						>{ fontFamily.name }</span>
					))
				}
			</div>
		</div>
	);
};

export default FontChangeSwitch;