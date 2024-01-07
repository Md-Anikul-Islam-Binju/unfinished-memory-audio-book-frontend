/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { apiBaseUrl } from "../Constants";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "../Context/BookProvider";
import ChapterData from "../Components/ChapterComponent/ChapterData";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Mute from "../Components/Svg/Mute";
import Unmute from "../Components/Svg/Unmute";
import Backward from "../Components/Svg/Backward";
import Pause from "../Components/Svg/Pause";
import Play from "../Components/Svg/Play";
import Setting from "../Components/Svg/Setting";
import Forward from "../Components/Svg/Forward";
import SettingOptions from "../Components/PlayerBar/SettingOptions";
import ChapterNameLoading from "../Components/SkeletonLoading/ChapterNameLoading";
import ChapterDataLoading from "../Components/SkeletonLoading/ChapterDataLoading";
import useSetPageTitle from "../Hooks/useSetPageTitle";
import { HiMiniBookmark, HiOutlineBookmark } from "react-icons/hi2";
import { ThemeContext } from "../Context/ThemeProvider";

const ChapterPage = () => {
	const { bookId, chapterId } = useParams();
	const {
		setLoading, 
		loading, 
		chapterData, 
		setChapterData, 
		convertEngToBng, 
		audioRef,
		setIsPlaying, 
		setAudioTime,
		toggleMute,
		isMuted,
		backward,
		setChapter,
		forward,
		togglePlay,
		isPlaying,
		settingOpen,
		toggleSettingVisibility,
		allDisable,
		fontSizeUpdate,
		fontFamilyUpdate,
		chapter,
		bookmarks,
		setBookmarks,
		setPerPageData,
		audioFile,
		setAudioFile
	} = useContext(BookContext)
	const { selectedLanguage } = useContext(ThemeContext)
	useSetPageTitle(`${ selectedLanguage === 'en' ? 'Chapter' : 'খন্ড' } ${ selectedLanguage === 'en' ? chapterId : convertEngToBng(chapterId) } - ${ chapterData?.chapter_name || 'বন্ধুবান্ধবরা বলে, তোমার জীবনী লেখ' }`)
	
	const [currentPage, setCurrentPage] = useState(1);

	const { data: chapters = [], isLoading } = useQuery({
        queryKey: ["chapters"],
        queryFn: async () => {
            if(selectedLanguage === 'en') {
				const res = await fetch(`${apiBaseUrl}/english-books/${bookId}/chapter-list-show`)
				const data = await res.json()
				return data
			} else {
				const res = await fetch(`${apiBaseUrl}/books/${bookId}/chapter-list-show`)
				const data = await res.json()
				return data
			}
        },
    })


	useEffect(() => {
		if (bookId && chapterId ) {
			setLoading(true);
			fetch(`${ selectedLanguage === 'en' ? `${apiBaseUrl}/english-books/${ bookId }/chapters/${ chapterId }/all-pages` : `${apiBaseUrl}/books/${ bookId }/chapters/${ chapterId }/all-pages` }`)
				.then((res) => res.json())
				.then((data) => {
					setChapterData(data);
					setAudioFile(data.chapter_audio)
					setLoading(false);
					setCurrentPage(1);
				})
			.catch((err) => console.error(err));	
		}
	}, [chapterId, bookId, setChapterData, setLoading]);
	const chapterDataArray = chapterData?.contents

	useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarksData')) || [];
        setBookmarks(storedBookmarks);
    }, [setBookmarks]);


	const bnBookmarksData = bookmarks.filter(item => item.bookId === '1')
	const enBookmarksData = bookmarks.filter(item => item.bookId === '2')

	const toggleBookmark = () => {
		const currentBookmarksData = selectedLanguage === 'en' ? enBookmarksData : bnBookmarksData;
		const isBookmarked = currentBookmarksData.some(bookmark => bookmark.id === chapter.id);
		let updatedBookmarks;
		if (isBookmarked) {
			if (selectedLanguage === 'en') {
				updatedBookmarks = enBookmarksData.filter(bookmark => bookmark.id !== chapter.id);
			} else {
				updatedBookmarks = bnBookmarksData.filter(bookmark => bookmark.id !== chapter.id);
			}
		} else {
			updatedBookmarks = [
				...currentBookmarksData,
				{
					id: chapter.id,
					bookId: bookId,
					chapter_name: selectedLanguage === 'en' ?
					(chapter.chapter_name ? chapter.chapter_name : 'My friends say, write your biography') :
					(chapter.chapter_name ? chapter.chapter_name : 'বন্ধুবান্ধবরা বলে, তোমার জীবনী লেখ')
				}
			];
		}
	
		// Update language-specific bookmarks
		if (selectedLanguage === 'en') {
			setBookmarks([...bnBookmarksData, ...updatedBookmarks]);
			localStorage.setItem('bookmarksData', JSON.stringify([...bnBookmarksData, ...updatedBookmarks]));
		} else {
			setBookmarks([...enBookmarksData, ...updatedBookmarks]);
			localStorage.setItem('bookmarksData', JSON.stringify([...enBookmarksData, ...updatedBookmarks]));
		}
	};

	useEffect(() => {
		if (chapterId && audioRef.current) {
			audioRef.current.load();
			audioRef.current.pause();
			setIsPlaying(false);

			audioRef.current.addEventListener('timeupdate', () => {
				const currentTimeMillis = Math.round(audioRef.current.currentTime * 1000);
				setAudioTime(currentTimeMillis);
			});
		}
	}, [chapterId, audioRef]);

	const itemsPerPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = chapterDataArray?.length;

	const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
		audioRef.current.pause();
		setIsPlaying(false);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
		audioRef.current.pause();
		setIsPlaying(false);
    };

	return (
		<>
			<section className="dark:bg-theme-dark">
				<div className="container mx-auto">
					<div className="flex gap-5 py-10 flex-col md:flex-row">
						<div className="flex flex-col h-[80vh] overflow-y-auto w-full md:w-[30%] border-theme-border-1 border-theme-border order-2 md:order-1" id="scrollBarStyle" onClick={allDisable}>
							<>
								{
									isLoading && (
										<ChapterNameLoading />
									)
								}
								{
									chapters?.map((chapterItem) => (
										<Link
											key={ chapterItem.id }
											className={`group font-solaimanLipi font-medium text-lg leading-7 cursor-pointer border-b-theme-border-1 py-3 px-5 text-theme-body-text hover:bg-theme-books-bn transition-all duration-300 ${ chapterId == chapterItem?.id ? "bg-theme-books-bn dark:text-theme-body-text dark:hover:text-theme-body-text transition-all duration-300" : 'transition-all duration-300 dark:text-theme-white/90 dark:hover:text-theme-body-text'}`}
											to={`/book/${ bookId }/chapter/${ chapterItem.id }`}
											onClick={() => setChapter(chapterItem)}
										>
											<div className="flex items-center gap-5 justify-between mb-1">
												<p className={`khondo_pristha ${chapterId == chapterItem?.id ? 'text-theme-body-text' : 'dark:text-theme-white/90 dark:group-hover:text-theme-body-text duration-300'}`}>
													{ selectedLanguage === 'en' ? 'Chapter' : 'খন্ড' } - { selectedLanguage === 'en' ? chapterItem.id : convertEngToBng(chapterItem.id) }
												</p>
												<p className={`khondo_pristha ${chapterId == chapterItem?.id ? 'text-theme-body-text' : 'dark:text-theme-white/90 dark:group-hover:text-theme-body-text duration-300'}`}>{ selectedLanguage === 'en' ? 'Page' : 'পৃষ্ঠা' } - { selectedLanguage === 'en' ? chapterItem.page_range : convertEngToBng(chapterItem.page_range) }</p>
											</div>
											{ chapterItem.chapter_name }
										</Link>
									))
								}
							</>
						</div>
						<div className="w-full md:w-[70%] h-[80vh] flex flex-col justify-between bg-theme-books-bn/30 dark:bg-slate-700 p-6 pb-2 order-1 md:order-2">
							<div className={`w-full h-[80%] overflow-y-auto ${ loading ? '' : 'pb-6 pe-3' } scrollbar`} id="scrollBarStyle" onClick={allDisable}>
								{
									loading && (
										<ChapterDataLoading />
									)
								}
								<div
									className={`text-justify space-x-1 font-normal text-theme-body-text dark:text-theme-white/90 ${loading === true ? 'hidden' : 'block'}`}
									style={{
										fontSize: `${fontSizeUpdate.size}`,
										lineHeight: `${fontSizeUpdate.lineHeight}`,
										fontFamily: `${fontFamilyUpdate.name}`,
									}}
								>
									{
										chapterDataArray?.slice(startIndex, endIndex).map((page, i) => (
											<ChapterData key={i} chapterPageData={page} onClick={() => setPerPageData(page)} />
										))
									}
								</div>
							</div>
							<div className="flex justify-between items-center px-0 md:px-10">
								{
									chapterData && loading === false &&
									<div className="flex justify-between gap-5 items-center mt-2">
										<div onClick={toggleBookmark}>
											{
												selectedLanguage === 'en' ?
													enBookmarksData.some(bookmark => bookmark.id === chapter.id) ? (
														<HiMiniBookmark className="text-2xl text-theme-bookmark-icon cursor-pointer" />
													) : (
														<HiOutlineBookmark className="text-2xl text-theme-heading-text dark:text-theme-white/80 cursor-pointer" />
													)
												:
													bnBookmarksData.some(bookmark => bookmark.id === chapter.id) ? (
														<HiMiniBookmark className="text-2xl text-theme-bookmark-icon cursor-pointer" />
													) : (
														<HiOutlineBookmark className="text-2xl text-theme-heading-text dark:text-theme-white/80 cursor-pointer" />
													)
											}
										</div>
									</div>
								}
								{
									loading === false && (
										<div className="flex justify-center mt-4 gap-3 items-center">
											{
												currentPage === 1 ? 
													<div
													className={` text-2xl
														${ currentPage === 1 ? 'text-[#455565]/40 dark:text-theme-white/80' : 'cursor-pointer hover:text-theme-lang-switcher transition-all duration-300' }
													`}
													>
														<BsChevronLeft />
													</div>
												:
													<div
														onClick={handlePrevPage}
														className={` text-2xl
															${ currentPage === 1 ? 'text-[#455565]/40 dark:text-theme-white/80' : 'cursor-pointer hover:text-theme-lang-switcher dark:text-theme-white/70 dark:hover:text-theme-lang-switcher transition-all duration-300' }
														`}
													>
														<BsChevronLeft />
													</div>
											}
											<div className="flex gap-1 items-center text-[#455565]/40 dark:text-theme-white/70 text-lg font-medium font-solaimanLipi">
												<p className={`${currentPage && 'text-[#455565] dark:text-theme-white'}`}>
													{
														selectedLanguage === 'en' ? currentPage : convertEngToBng(currentPage)
													}
												</p>
												<p>/</p>
												<p>{ selectedLanguage === 'en' ? Math.ceil(totalItems / itemsPerPage) : convertEngToBng(Math.ceil(totalItems / itemsPerPage)) }</p>
											</div>
											{
												currentPage === Math.ceil(totalItems / itemsPerPage) ?
												<div
													className={` text-2xl
														${ currentPage === Math.ceil(totalItems / itemsPerPage) ? 'text-[#455565]/40 dark:text-theme-white/80' : 'cursor-pointer hover:text-theme-lang-switcher transition-all duration-300' }
													`}
												>
													<BsChevronRight />
												</div>
												:
												<div
													onClick={handleNextPage}
													className={` text-2xl
														${ currentPage === Math.ceil(totalItems / itemsPerPage) ? 'text-[#455565]/40 dark:text-theme-white/80' : 'cursor-pointer hover:text-theme-lang-switcher dark:text-theme-white/70 dark:hover:text-theme-lang-switcher transition-all duration-300' }
													`}
												>
													<BsChevronRight />
												</div>
											}
										</div>
									)
								}
								{
									loading === false && 
									<div>
										{
											chapterDataArray?.slice(startIndex, endIndex).map((page, i) => (
												<p key={ i } className="text-lg font-openSans font-medium text-[#455565]/80 dark:text-theme-white/80">{ selectedLanguage === 'en' ? 'Page No' : 'বইয়ের পৃষ্ঠা' } - { selectedLanguage === 'en' ? page?.reference_page_number === null ? '23' : page?.reference_page_number : convertEngToBng(page?.reference_page_number === null ? '23' : page?.reference_page_number) }</p>
											))
										}
									</div>
								}
							</div>
							<div>
								{
									
									chapterData && (
										<audio ref={ audioRef } src={ 
											selectedLanguage === 'en' ?
											`https://ufmb.etldev.xyz/storage/audio/audioEnglishFile/${audioFile}`
											:
											`https://ufmb.etldev.xyz/storage/audio/audioBanglaFile/${audioFile}`
										} preload="metadata"></audio>
									)
								}
								{
									chapterData && (
										<div className="w-full flex justify-around items-center rounded-full bg-theme-books-bn dark:bg-slate-800 h-[60px] shadow-theme-chapter-shadow">
											<div className="cursor-pointer text-theme-heading-text dark:text-theme-white/90" onClick={toggleMute}>
												{
													isMuted ? (
														<Mute />
													) : (
														<Unmute /> 
													)
												}
											</div>
											<div className="cursor-pointer text-theme-heading-text dark:text-theme-white/90" onClick={backward}>
												<Backward />
											</div>
											<div className="cursor-pointer text-theme-heading-text dark:text-theme-white/90" onClick={togglePlay}>
												{
													isPlaying ? (
														<Pause />
													) : (
														<Play />
													)
												} 
											</div>
											<div className="cursor-pointer text-theme-heading-text dark:text-theme-white/90" onClick={forward}>
												<Forward />
											</div>
											<div 
												className="cursor-pointer settings-container text-theme-heading-text relative dark:text-theme-white/90" 
												onClick={() => toggleSettingVisibility(!settingOpen)}
											>
												<Setting />
												<SettingOptions />
											</div>
										</div>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ChapterPage;