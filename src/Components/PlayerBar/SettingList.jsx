import FontSize from "../Svg/FontSize";
import Playback from "../Svg/Playback";
import FontChange from "../Svg/FontChange";
import { useContext } from "react";
import { BookContext } from "../../Context/BookProvider";
import { ThemeContext } from "../../Context/ThemeProvider";

const SettingList = () => {
	const {
		showFontSize, 
		showOptions,
		showFonts,
	} = useContext(BookContext)
	const { selectedLanguage } = useContext(ThemeContext)
	return (
		<div className={`flex flex-col absolute bottom-5 -right-[22px] z-10 font-poppins text-sm items-center bg-white dark:bg-slate-800 shadow-theme-chapter-shadow w-[200px]`}>
			<div className="setting_options" onClick={ showFontSize }>
				<div className="w-5">
					<FontSize />
				</div>
				<span className={`${ selectedLanguage === 'en' ? 'font-poppins text-base' : ' font-solaimanLipi text-lg' }`}>
					{
						selectedLanguage === 'en' ? 'Font Size' : 'ফন্ট সাইজ'
					}
				</span>
			</div>
			<div className="setting_options" onClick={ showFonts }>
				<div className="w-5">
					<FontChange />
				</div>
				<span className={`${ selectedLanguage === 'en' ? 'font-poppins text-base' : 'font-solaimanLipi text-lg' }`}>
					{
						selectedLanguage === 'en' ? 'Font Family' : 'ফন্ট ফ্যামিলি'
					}
				</span>
			</div>
			<div className="setting_options" onClick={ showOptions }>
				<div className="w-5">
					<Playback />
				</div>
				<span className={`${ selectedLanguage === 'en' ? 'font-poppins text-base' : ' font-solaimanLipi text-lg' }`}>
					{
						selectedLanguage === 'en' ? 'Playback Speed' : 'প্লেব্যাক স্পিড'
					}
				</span>
			</div>
		</div>
	);
};

export default SettingList;