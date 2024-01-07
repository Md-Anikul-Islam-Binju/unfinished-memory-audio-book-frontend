import { Link } from "react-router-dom";
import useSetPageTitle from "../Hooks/useSetPageTitle";
import { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookProvider";
import { ThemeContext } from "../Context/ThemeProvider";

const Bookmark = () => {
	const { selectedLanguage } = useContext(ThemeContext)
	useSetPageTitle(`${ selectedLanguage === 'en' ? 'Bookmark' : 'বুকমার্ক' }`);
	const {
		bookmarks,
		setBookmarks,
		convertEngToBng,
		setChapter
	} = useContext(BookContext)

	useEffect(() => {
		const bookmarksDataList = JSON.parse(localStorage.getItem('bookmarksData'))
		if (bookmarksDataList) {
			bookmarksDataList.sort((a, b) => a.id - b.id);
			setBookmarks(bookmarksDataList);
		}
	}, [setBookmarks])

	const bnBookmarksData = bookmarks.filter(item => item.bookId === '1')
	const enBookmarksData = bookmarks.filter(item => item.bookId === '2')

	return (
		<>
			{
				bookmarks?.length ?
					<section className="h-full min-h-[86vh] py-20 px-[15px] md:px-0 dark:bg-theme-dark">
						<div className="container mx-auto">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-center">
								{
									selectedLanguage === 'bn' ?
									bnBookmarksData.map((item, i) => (
										<Link
											key={i}
											to={`/book/${item.bookId}/chapter/${item.id}`}
											className="shadow-theme-search-shadow dark:bg-slate-700 p-5 rounded-md font-solaimanLipi space-y-1 relative"
											onClick={() => setChapter(item)}
										>
											<h3 className="text-lg font-bold text-theme-body-text dark:text-theme-white/90">{`${selectedLanguage === 'en' ? 'Chapter' : 'খন্ড'} ${selectedLanguage === 'en' ? item.id : convertEngToBng(item.id)}`}</h3>
											<h2 className="text-lg font-bold text-theme-heading-text dark:text-theme-white/90">{item.chapter_name}</h2>
										</Link>
									))
									:
									enBookmarksData.map((item, i) => (
										<Link
											key={i}
											to={`/book/${item.bookId}/chapter/${item.id}`}
											className="shadow-theme-search-shadow dark:bg-slate-700 p-5 rounded-md font-solaimanLipi space-y-1 relative"
											onClick={() => setChapter(item)}
										>
											<h3 className="text-lg font-bold text-theme-body-text dark:text-theme-white/90">{`${selectedLanguage === 'en' ? 'Chapter' : 'খন্ড'} ${selectedLanguage === 'en' ? item.id : convertEngToBng(item.id)}`}</h3>
											<h2 className="text-lg font-bold text-theme-heading-text dark:text-theme-white/90">{item.chapter_name}</h2>
										</Link>
									))
								}
							</div>
						</div>
					</section>
				:
					<section className="h-[86vh] grid place-items-center dark:bg-theme-dark">
						<div className='text-center text-[#d9d9d9] dark:text-slate-400 flex flex-col gap-5 items-center'>
							<svg width="82" height="90" viewBox="0 0 82 90" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M29.1186 60.3066C29.0404 60.8599 29 61.4252 29 62C29 68.6274 34.3726 74 41 74C47.6274 74 53 68.6274 53 62C53 61.4252 52.9596 60.8599 52.8815 60.3066H82V87C82 88.6569 80.6569 90 79 90H3C1.34315 90 0 88.6569 0 87V60.3066H29.1186Z" fill="transparent"/>
								<path fillRule="evenodd" clipRule="evenodd" d="M54 60C54 67.1797 48.1797 73 41 73C33.8203 73 28 67.1797 28 60C28 59.7674 28.0061 59.5362 28.0182 59.3066H0L9.56044 31.0389C9.9726 29.8202 11.1159 29 12.4023 29H69.5977C70.8842 29 72.0274 29.8202 72.4396 31.0389L82 59.3066H53.9818C53.9939 59.5362 54 59.7674 54 60Z" fill="transparent"/>
								<path fillRule="evenodd" clipRule="evenodd" d="M52.0976 60.9545C52.0976 66.5025 47.129 72 41 72C34.871 72 29.9024 66.5025 29.9024 60.9545C29.9024 60.7748 29.9077 59.5962 29.918 59.4188H9L17.1614 39.5755C17.5132 38.6338 18.4891 38 19.5873 38H62.4127C63.5109 38 64.4868 38.6338 64.8387 39.5755L73 59.4188H52.082C52.0923 59.5962 52.0976 60.7748 52.0976 60.9545Z" fill="transparent"/>
								<path fillRule="evenodd" clipRule="evenodd" d="M1.25 59.5123V86C1.25 86.9665 2.0335 87.75 3 87.75H79C79.9665 87.75 80.75 86.9665 80.75 86V59.5123L71.2554 31.4393C71.015 30.7285 70.3481 30.25 69.5977 30.25H12.4023C11.6519 30.25 10.985 30.7285 10.7446 31.4393L1.25 59.5123Z" stroke="currentColor" strokeWidth="2.5"/>
								<path d="M14 59C17.9366 59 22.1849 59 26.7449 59C28.6212 59 28.6212 60.3186 28.6212 61C28.6212 67.6274 34.1174 73 40.8973 73C47.6772 73 53.1734 67.6274 53.1734 61C53.1734 60.3186 53.1734 59 55.0496 59H80M6.57373 59H9H6.57373Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M66.0996 6.30273L55 18.7559M40.0996 2V18.7559V2ZM14 6.30273L25.0996 18.7559L14 6.30273Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>

							<h2 className={`text-2xl text-theme-body-text text-center ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-solaimanLipi' } dark:text-slate-300`}>
								{
									selectedLanguage === 'en' ? 'You have not bookmarked any sections yet.' : 'আপনি এখনও কোন খন্ড বুকমার্ক করেননি।'
								}
							</h2>
						</div>
					</section>
			}
			
			
		</>
	);
};

export default Bookmark;