import { useContext } from "react";
import { BookContext } from "../../Context/BookProvider";
import Mute from "../Svg/Mute";
import Unmute from "../Svg/Unmute";
import Pause from "../Svg/Pause";
import Play from "../Svg/Play";
import Setting from "../Svg/Setting";
import Forward from "../Svg/Forward";
import Backward from "../Svg/Backward";
import SettingOptions from "./SettingOptions";
import AudioFile from "./AudioFile";

const MainPlayerBar = () => {
	const {
		toggleMute,
		isMuted,
		backward,
		chapter,
		forward,
		togglePlay,
		isPlaying,
		settingOpen,
		toggleSettingVisibility,
		userAlertCustomMessage,
	} = useContext(BookContext)

	
	return (
		<div className="w-full h-[20%] flex items-end">
			<AudioFile />
			{
				chapter ?
					<div className="w-full flex justify-around items-center rounded-full bg-theme-books-bn h-[100px] shadow-theme-chapter-shadow">
						<div className="cursor-pointer text-theme-heading-text" onClick={toggleMute}>
							{
								isMuted ? (
									<Mute />
								) : (
									<Unmute /> 
								)
							}
						</div>
						<div className="cursor-pointer text-theme-heading-text" onClick={backward}>
							<Backward />
						</div>
						<div className="cursor-pointer text-theme-heading-text" onClick={togglePlay}>
							{
								isPlaying ? (
									<Pause />
								) : (
									<Play />
								)
							} 
						</div>
						<div className="cursor-pointer text-theme-heading-text" onClick={forward}>
							<Forward />
						</div>
						<div 
							className="cursor-pointer settings-container text-theme-heading-text relative" 
							onClick={() => toggleSettingVisibility(!settingOpen)}
						>
							<Setting />
							<SettingOptions />
						</div>
					</div>
				:
				<div className="w-full flex justify-around items-center rounded-full bg-theme-books-bn h-[100px] shadow-theme-chapter-shadow ">
					<div className="cursor-pointer text-theme-heading-text" onClick={() => userAlertCustomMessage('দুঃখিত!','অনুগ্রহ করে প্রথমে কোন অধ্যায় সিলেক্ট করুন তারপর অডিও চালু করুন।', 'warning', '#0094FF')}>
						<Unmute />
					</div>
					<div className="cursor-pointer text-theme-heading-text" onClick={() => userAlertCustomMessage('দুঃখিত!','অনুগ্রহ করে প্রথমে কোন অধ্যায় সিলেক্ট করুন তারপর অডিও চালু করুন।', 'warning', '#0094FF')}>
						<Backward />
					</div>
					<div className="cursor-pointer text-theme-heading-text" onClick={() => userAlertCustomMessage('দুঃখিত!','অনুগ্রহ করে প্রথমে কোন অধ্যায় সিলেক্ট করুন তারপর অডিও চালু করুন।', 'warning', '#0094FF')}>
						<Play />
					</div>
					<div className="cursor-pointer text-theme-heading-text" onClick={() => userAlertCustomMessage('দুঃখিত!','অনুগ্রহ করে প্রথমে কোন অধ্যায় সিলেক্ট করুন তারপর অডিও চালু করুন।', 'warning', '#0094FF')}>
						<Forward />
					</div>
					<div className="cursor-pointer settings-container text-theme-heading-text relative" onClick={() => userAlertCustomMessage('দুঃখিত!','অনুগ্রহ করে প্রথমে কোন অধ্যায় সিলেক্ট করুন তারপর অডিও চালু করুন।', 'warning', '#0094FF')}>
						<Setting />
					</div>
				</div>
			}
		</div>
	);
};

export default MainPlayerBar;