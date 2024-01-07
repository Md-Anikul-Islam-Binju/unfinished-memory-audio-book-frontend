/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { banglaDigits, defaultChapterId, defaultFontFamily, defaultFontsize } from "../Constants";
import Swal from "sweetalert2";
import { ThemeContext } from "./ThemeProvider";

export const BookContext = createContext()

const BookProvider = ({ children }) => {
	const { selectedLanguage } = useContext(ThemeContext)
    const [loading, setLoading] = useState(true)
    const [chapter, setChapter] = useState(defaultChapterId);
    const [chapterPage, setChapterPage] = useState(null)
	const [chapterData, setChapterData] = useState([])
    const audioRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [selectedSpeed, setSelectedSpeed] = useState(1)
	const [fontSizeUpdate, setFontSizeUpdate] = useState(defaultFontsize)
	const [fontFamilyUpdate, setFontFamilyUpdate] = useState(defaultFontFamily)
	const [settingOpen, setSettingOpen] = useState(false)
	const [isOptionsVisible, setOptionsVisible] = useState(false)
	const [isFontSizeVisible, setFontSizeVisible] = useState(false);
	const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
	const [isFontChangeVisible, setFontSizeChangeVisible] = useState(false);
	const [isThemeColorVisible, setThemeColorVisible] = useState(false);
	const [audioTime, setAudioTime] = useState(0)
	const [globalSearch, setGlobalSearch] = useState(false)
	const [bookmarks, setBookmarks] = useState([])
	const [archiveData, setArchiveData] = useState([])
	const [perPagData, setPerPageData] = useState([])
	const [audioFile, setAudioFile] = useState(null);
	function closeModal() {
		setGlobalSearch(false)
	}

	const convertEngToBng = (engNumber) => {
		return engNumber.toString().replace(/[0-9]/g, (digit) => banglaDigits[digit]);
	}

	function openModal() {
		setGlobalSearch(true)
	}

	//! Audio Player
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('ended', () => {
				setIsPlaying(false);
			});
	
			return () => {
				if (audioRef.current) {
					audioRef.current.removeEventListener('ended', () => {
						setIsPlaying(false);
					});
				}
			};
		}
	}, [audioRef, setIsPlaying, isPlaying]);

	const togglePlay = () => {
		if(audioFile) {
			audioRef.current.currentTime = audioTime / 1000;
			if (audioRef.current.paused) {
				audioRef.current.play();
				setIsPlaying(true);
			} else {
				audioRef.current.pause();
				setIsPlaying(false);
			}
		} else {
			selectedLanguage === 'en' ?
			userAlertCustomMessage('Sorry!', 'Audio for this chapter is not yet available to us. We will try to add it soon.', 'error', '#E6332E')
			:
			userAlertCustomMessage('দুঃখিত!', 'এই অধ্যায়ের অডিও এখনো আমাদের কাছে পাওয়া যায়নি। আমরা চেষ্টা করবো খুব শীঘ্রই এটি যোগ করার।', 'error', '#E6332E')
		}
	};

	const toggleMute = () => {
		if (audioRef.current) {
			audioRef.current.muted = !audioRef.current.muted;
			setIsMuted(!isMuted);
		}
	};

	const forward = () => {
		const currentTime = audioRef.current.currentTime;
		const convertTime = Math.round(currentTime * 1000);
		const nextTime = perPagData?.start_time?.find(item => item > convertTime);
		if (nextTime) {
			audioRef.current.currentTime = nextTime / 1000;
		} else {
			audioRef.current.currentTime = currentTime;
		}
	};
	
	const backward = () => {
		audioRef.current.pause();
		setIsPlaying(false);
		const currentTime = audioRef.current.currentTime;
		const convertTime = Math.round(currentTime * 1000);
		const currentIndex = perPagData?.start_time?.findIndex(item => item >= convertTime);
		if (currentIndex) {
			const prevTime = perPagData?.start_time[currentIndex - 1];
			audioRef.current.currentTime = prevTime / 1000;
		} else {
			audioRef.current.currentTime = 0;
		}
	};
	
	const handleSpeedChange = (speed) => {
		setSelectedSpeed(speed);
		audioRef.current.playbackRate = speed;
	};

	const handleFontSizeUpdate = (fSize,) => {
		setFontSizeUpdate(fSize)
	}

	const handleFontFamilyUpdate = (fontFamily) => {
		setFontFamilyUpdate(fontFamily)
	}

	const handleLanguageChange = (language) => {
		setIsLanguagesVisible(language)
	};

	//! Setting Options
	const toggleSettingVisibility = () => {
		setSettingOpen(!settingOpen);
	};

	const showThemeColor = () => {
		setThemeColorVisible(true);
		setSettingOpen(false);
		setOptionsVisible(false);
		setFontSizeVisible(false);
		setIsLanguagesVisible(false);
		setFontSizeChangeVisible(false);
	}

	const showOptions = () => {
		setThemeColorVisible(false);
		setSettingOpen(false);
		setOptionsVisible(true);
		setFontSizeVisible(false);
		setIsLanguagesVisible(false);
		setFontSizeChangeVisible(false);
	};

	const showSetting = () => {
		setThemeColorVisible(false);
		setSettingOpen(true);
		setOptionsVisible(false);
		setFontSizeVisible(false);
		setIsLanguagesVisible(false);
		setFontSizeChangeVisible(false);
	};

	const showFontSize = () => {
		setThemeColorVisible(false);
		setFontSizeVisible(true);
		setSettingOpen(false);
		setOptionsVisible(false);
		setIsLanguagesVisible(false);
		setFontSizeChangeVisible(false);
	}
	const showLanguages = () => {
		setIsLanguagesVisible(true);
		setFontSizeVisible(false);
		setSettingOpen(false);
		setOptionsVisible(false);
		setFontSizeChangeVisible(false);
	}
	const showFonts = () => {
		setThemeColorVisible(false);
		setFontSizeChangeVisible(true);
		setIsLanguagesVisible(false);
		setFontSizeVisible(false);
		setSettingOpen(false);
		setOptionsVisible(false);
	}

	const allDisable = () => {
		setThemeColorVisible(false);
		setFontSizeChangeVisible(false);
		setSettingOpen(false);
		setOptionsVisible(false);
		setFontSizeVisible(false);
		setIsLanguagesVisible(false);
	}

	//! Alert Message for user
	const userAlertCustomMessage = (title, text, icon, cButtonColor) => {
		Swal.fire({
			title: `${ title }`,
			text: `${ text }`,
			icon: `${ icon }`,
			confirmButtonColor: `${ cButtonColor }`,
			confirmButtonText: `${ selectedLanguage === 'en' ?  'Ok' : 'ওকে'}`,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
		})
	}

	const booksInfo = {
		loading,
		chapter,
		chapterPage,
		isPlaying,
		isMuted,
		selectedSpeed,
		fontSizeUpdate,
		settingOpen,
		isOptionsVisible,
		isFontSizeVisible,
		isLanguagesVisible,
		isFontChangeVisible,
		isThemeColorVisible,
		audioRef,
		audioTime,
		globalSearch,
		fontFamilyUpdate,
		bookmarks,
		chapterData,
		archiveData,
		perPagData,
		audioFile,
		setAudioFile,
		setPerPageData,
		setArchiveData,
		setChapterData,
		setBookmarks,
		convertEngToBng,
		setFontFamilyUpdate,
		handleFontFamilyUpdate,
		setGlobalSearch,
		closeModal,
		openModal,
		setAudioTime,
		setLoading,
		setChapter,
		setChapterPage,
		setIsPlaying,
		setIsMuted,
		setSelectedSpeed,
		setFontSizeUpdate,
		setSettingOpen,
		setOptionsVisible,
		setFontSizeVisible,
		allDisable,
		toggleSettingVisibility,
		showOptions,
		showSetting,
		showFontSize,
		togglePlay,
		toggleMute,
		forward,
		backward,
		handleSpeedChange,
		handleFontSizeUpdate,
		showLanguages,
		handleLanguageChange,
		showFonts,
		showThemeColor,
		userAlertCustomMessage
	}
	return (
		<BookContext.Provider value={ booksInfo }>
			{ children }
		</BookContext.Provider>
	);
};

export default BookProvider;