import { useContext } from "react";
import { BookContext } from "../../Context/BookProvider";
import SettingList from "./SettingList";
import PlaybackSpeed from "./PlaybackSpeed";
import FontsizeList from "./FontsizeList";
import LanguageSwitch from "./LanguageSwitch";
import FontChangeSwitch from "./FontChangeSwitch";
import ThemeColorSwitch from "./ThemeColorSwitch";

const SettingOptions = () => {
	const {
		settingOpen,
		isOptionsVisible,
		isFontSizeVisible,
		isLanguagesVisible,
		isFontChangeVisible,
		isThemeColorVisible
	} = useContext(BookContext)
	return (
		<div className="absolute bottom-0 right-0">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-2">
						{
							settingOpen && (
								<SettingList />
							)
						}
						
						{
							isOptionsVisible && (
								<PlaybackSpeed />
							)
						}
						{
							isFontSizeVisible && (
								<FontsizeList />
							)
						}
						{
							isLanguagesVisible && (
								<LanguageSwitch />
							)
						}
						{
							isFontChangeVisible && (
								<FontChangeSwitch />
							)
						}
						{
							isThemeColorVisible && (
								<ThemeColorSwitch />
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingOptions;