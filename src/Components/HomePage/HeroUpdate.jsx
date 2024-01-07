/* eslint-disable no-unused-vars */
import { Fragment, useContext, useState } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';
import bnslide from '/assets/images/bnslide.png'
import enslide from '/assets/images/enslide.png'
import enElips from '/assets/images/enElips.png'
import bnElips from '/assets/images/bnElips.png'
import { apiBaseUrl } from '../../Constants';
import { BookContext } from '../../Context/BookProvider';
import { Link } from 'react-router-dom';

const HeroUpdate = () => {
	const { selectedLanguage, theme } = useContext(ThemeContext)
	const { setChapter } = useContext(BookContext);
	const [globalSearchData, setGlobalSearchData] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const handleGlobalSearch = async (searchValue) => {
		setSearchValue(searchValue);
		if (searchValue.trim() === "") {
			setGlobalSearchData([]);
		} else {
			if(selectedLanguage === 'en') {
				const res = await fetch(`${apiBaseUrl}/english-search?line=${searchValue}`);
				const data = await res.json();
				setGlobalSearchData(data);
			} else {
				const res = await fetch(`${apiBaseUrl}/search?line=${searchValue}`);
				const data = await res.json();
				setGlobalSearchData(data);
			}
		}
	};

	const highlightText = (text, searchValue) => {
		if (!searchValue) return text;

		const lowerText = text.toLowerCase();
		const lowerSearchValue = searchValue.toLowerCase();

		if (lowerText.includes(lowerSearchValue)) {
			const parts = lowerText.split(lowerSearchValue);
			const matches = text.match(new RegExp(searchValue, "gi"));

			return parts.map((part, index) => (
				<Fragment key={index}>
					{index > 0 && (
						<span className="bg-theme-line-highlight dark:text-theme-heading-text">
							{matches[index - 1]}
						</span>
					)}
					{part}
				</Fragment>
			));
		} else {
			return text;
		}
	};

	console.log(globalSearchData)

	return (
		<section className={`${ selectedLanguage === 'en' ? 'bg-[#EFE7D6]/40' : 'bg-[#CFE2B9]/40' } py-10 md:py-14 px-[15px] lg:px-0 font-poppins dark:bg-theme-dark relative dark:border-b dark:border-slate-50/[0.1]`}>
			<div className="container mx-auto">
				<div className="grid grid-cols-12 items-center">
					<div className='col-span-12 lg:col-span-7'>
						<h1 className='text-[41px] text-theme-heading-text font-bold leading-[50px] mb-3 w-full max-w-[351px] dark:text-slate-200'>
							{
								selectedLanguage === 'en' ? 'The Unfinished Memoirs' : 'অসমাপ্ত আত্মজীবনী'
							}
						</h1>
						<h2 className='text-[22px] font-medium text-theme-heading-text leading-[33px] mb-[14px] dark:text-slate-300'>
							{
								selectedLanguage === 'en' ? '- Sheikh Mujibur  Rahman' : '- শেখ মুজিবুর রহমান'
							}
						</h2>
						<p className={`w-full max-w-[589px] text-theme-body-text ${ selectedLanguage === 'en' ? 'text-base leading-6' : 'text-lg leading-7' } font-normal mb-6 dark:text-slate-400`}>
							{
								selectedLanguage === 'en' ? 'The first president of Bangladesh, Sheikh Mujibur Rahman, and most of his family were killed during the early hours of 15 August 1975 by a group of young Bangladesh Army personnel who invaded.' : 'আমার পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানকে জীবনের সব থেকে মূল্যবান সময়গুলো কারাবন্দি হিসেবেই কাটাতে হয়েছে। জনগণের অধিকার আদায়ের আন্দোলন করতে গিয়েই তাঁর জীবনে।'
							}
						</p>
						<div className='w-full max-w-[523px] relative'>
							<div className='relative w-full max-w-[523px]'>
								<input
									type="text"
									className="w-full bg-white dark:bg-slate-700 h-[54px] rounded-lg px-4 py-[14px] text-base font-normal font-hindSiliguri text-theme-heading-text dark:text-slate-200 focus:outline-none shadow-theme-search-shadow"
									onChange={(event) => handleGlobalSearch(event.target.value)}
									placeholder={`${ selectedLanguage === 'en' ? 'Searching...' : 'অনুসন্ধান কুরুন' }`}
								/>
								<div className='absolute right-4 top-2/4 -translate-y-2/4 cursor-pointer dark:text-slate-200'>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g opacity="0.6">
										<path d="M21.0008 20.9998L15.8038 15.8028M15.8038 15.8028C17.2104 14.3962 18.0006 12.4885 18.0006 10.4993C18.0006 8.51011 17.2104 6.60238 15.8038 5.19581C14.3972 3.78923 12.4895 2.99902 10.5003 2.99902C8.51108 2.99902 6.60336 3.78923 5.19678 5.19581C3.79021 6.60238 3 8.51011 3 10.4993C3 12.4885 3.79021 14.3962 5.19678 15.8028C6.60336 17.2094 8.51108 17.9996 10.5003 17.9996C12.4895 17.9996 14.3972 17.2094 15.8038 15.8028Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</g>
									</svg>
								</div>
							</div>
							{
								globalSearchData.length > 0 ?
								''
								:
								<div className="overflow-y-auto max-h-[400px] absolute bg-white z-50 mt-1 shadow-theme-search-shadow rounded" id="searchScrollBarStyle">
									{
										globalSearchData?.data?.map((line) => (
											<div
												key={line.id}
												className="shadow-theme-search-shadow bg-[#FCFCFC] dark:bg-slate-600 my-4 mx-2 p-3 rounded-lg"
												onClick={() => setChapter(line?.chapter)}
											>
												<Link to={`/book/${ line.book_id }/chapter/${ line.chapter_id }`}>
													<h3 className="font-bold text-theme-heading-text dark:text-theme-white text-sm mb-1">{`${ selectedLanguage === 'en' ? line?.english_chapters?.chapter_name : line?.chapter?.chapter_name }`}</h3>
													<span
														className={`font-openSans font-normal text-theme-body-text dark:text-theme-white text-base`}
													>
														{highlightText(line.line, searchValue)}
													</span>
												</Link>
											</div>
										))
									}
								</div>
							}
						</div>
					</div>
					<div className='col-span-12 lg:col-span-5 z-20'>
						<img src={ selectedLanguage === 'en' ? enslide : bnslide } draggable='false' alt="" />
					</div>
				</div>
			</div>
			<img src={ selectedLanguage === 'en' ? enElips : bnElips } draggable='false' className={`absolute bottom-0 right-0 opacity-40 z-10 ${ theme === 'light' ? '' : 'hidden' }`} alt="" />
		</section>
	);
};

export default HeroUpdate;