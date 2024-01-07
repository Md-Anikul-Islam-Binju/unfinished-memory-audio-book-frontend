/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Mute from "../Components/Svg/Mute";
import Unmute from "../Components/Svg/Unmute";
import Backward from "../Components/Svg/Backward";
import Forward from "../Components/Svg/Forward";
import Setting from "../Components/Svg/Setting";
import Pause from "../Components/Svg/Pause";
import Play from "../Components/Svg/Play";
import { BookContext } from "../Context/BookProvider";
import useSetPageTitle from "../Hooks/useSetPageTitle";
import bookBn from '/assets/images/book_bn.png';
import bookEn from '/assets/images/book_en.png';
import { useParams } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeProvider";
import Playback from "../Components/Svg/Playback";
import PlaybackSpeed from "../Components/PlayerBar/PlaybackSpeed";

const FullAudio = () => {
	const { selectedLanguage } = useContext(ThemeContext)
	useSetPageTitle(selectedLanguage === 'en' ? 'Full Audio' : 'ফুল অডিও');
	const {
		audioRef,
		toggleMute,
		isMuted,
		settingOpen,
		allDisable,
		convertEngToBng,
		toggleSettingVisibility,
		showOptions,
		isOptionsVisible,
	} = useContext(BookContext);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [audioDuration, setAudioDuration] = useState(0);
    const { bookId } = useParams();

	const banglaFullAudio =  `https://ufmb.etldev.xyz/public/backend/audio/oshomapto-attojiboni.mp3`
	const englishFullAudio =  `https://ufmb.etldev.xyz/public/backend/audio/oshomapto-attojiboni.mp3`

	const togglePlay = () => {
		const audio = audioRef.current;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}

		setIsPlaying(!isPlaying)
	};


	const formatTime = (time) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = Math.floor(time % 60);
		
		const formattedHours = hours < 10 ? "0" + hours : hours;
		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
		const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
		
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	};

	const handleTimeChange = (e) => {
		const newTime = parseFloat(e.target.value);
		audioRef.current.currentTime = newTime;
	};

	useEffect(() => {
		const audioElement = audioRef.current;

		if (audioElement) {
			audioElement.addEventListener("loadedmetadata", () => {
			setAudioDuration(audioElement.duration);
			});

			audioElement.addEventListener("timeupdate", () => {
			setCurrentTime(audioElement.currentTime);
			});
		}

		return () => {
			if (audioElement) {
				audioElement.removeEventListener("loadedmetadata", () => {});
				audioElement.removeEventListener("timeupdate", () => {});
			}
		};
	}, [audioRef]);

	const forward = () => {
		audioRef.current.currentTime += 10;
	}

	const backward = () => {
		audioRef.current.currentTime -= 10;
	}


	return (
		<>
			<section className="px-[15px] lg:px-0 dark:bg-slate-700">
				<div className="container mx-auto">
					<div className="py-5 flex flex-col gap-5 w-full md:w-9/12 lg:w-6/12 mx-auto justify-end lg:h-[80vh]">
						<div onClick={allDisable}>
							<img className="w-[200px] lg:w-[250px] mx-auto mb-5" src={ bookId === '1' ? bookBn : bookEn } alt="" />
							<h1 className="text-center text-theme-heading-text dark:text-theme-white/90 text-2xl font-bold">
								{
									bookId === '1' ?
									'অসমাপ্ত আত্মজীবনী'
									: "The Unfinished Memoirs"
								}
							</h1>
							<p className="text-center text-theme-text dark:text-theme-white/90 text-xl mb-5">
								{
									bookId === '1' ?
									'শেখ মুজিবুর রহমান'
									: "Sheikh Mujibur Rahman"
								}
							</p>
							<div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
								<div className="flex justify-between items-center gap-5">
									<div className={`text-theme-body-text dark:text-theme-white/90 w-full max-w-[65px] text-sm leading-4 ${ selectedLanguage === 'en' ? 'font-poppins' : 'text-sm font-solaimanLipi leading-4' }`}> 
										{
											selectedLanguage === 'en' ?
											formatTime(currentTime)
											: convertEngToBng(formatTime(currentTime))
										}
									</div>
									<input 
										className="full_audio_length appearance-none w-full h-[6px] bg-[#F1F5F9] rounded-[5px] bg-no-repeat cursor-pointer" 
										style={{
											backgroundSize: `${(currentTime / audioDuration) * 100}% 100%`
										}} 
										type="range" 
										max={audioDuration} 
										value={currentTime} 
										onChange={handleTimeChange}
									/>
									<div className={`text-theme-body-text dark:text-theme-white/90 w-full max-w-[65px] text-sm leading-4 ${ selectedLanguage === 'en' ? 'font-poppins' : 'text-sm font-solaimanLipi leading-4' }`}> {selectedLanguage === 'en' ? formatTime(audioDuration) : convertEngToBng(formatTime(audioDuration))} </div>
								</div>
							</div>
						</div>
						<div>
							<audio 
								ref={audioRef}
								preload="metadata"
								src={bookId === '1' ? banglaFullAudio : englishFullAudio}
							></audio>
							<div className="w-full flex justify-around items-center rounded-full bg-theme-books-bn h-[100px] shadow-theme-chapter-shadow">
								<div className="cursor-pointer text-theme-heading-text" onClick={toggleMute}> 
									{
										isMuted ? (
										<Mute /> ) : (
										<Unmute /> )
									}
								</div>
								<div className="cursor-pointer text-theme-heading-text" onClick={backward}>
									<Backward />
								</div>
								<div className="cursor-pointer text-theme-heading-text" onClick={togglePlay}> 
									{
										isPlaying ? 
										<Pause />  
										: 
										<Play /> 
									}
								</div>
								<div className="cursor-pointer text-theme-heading-text" onClick={forward}>
									<Forward />
								</div>
								<div className="cursor-pointer settings-container text-theme-heading-text relative" onClick={() => toggleSettingVisibility(!settingOpen)}>
									<Setting />
									<div className="absolute bottom-0 right-0">
										<div className="flex flex-col gap-2">
											<div className="flex items-center gap-2">
												<div className="flex items-center gap-2">
													{
														settingOpen && (
															<div className={`flex flex-col absolute bottom-5 -right-[22px] z-10 font-poppins text-sm items-center bg-white dark:bg-slate-800 shadow-theme-chapter-shadow w-[200px]`}>
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
														)
													}
													{
														isOptionsVisible && (
															<PlaybackSpeed />
														)
													}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FullAudio;
