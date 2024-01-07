import { Link } from 'react-router-dom';
import enbook from '/assets/images/enbook.png'
import bnbook from '/assets/images/nbbook.png'
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';
import { GoArrowRight } from "react-icons/go";

const BookIndex = () => {
	const { selectedLanguage, theme } = useContext(ThemeContext)

	return (
		<section className="px-[15px] lg:px-0 py-14 md:py-16 lg:py-20 dark:bg-theme-dark bg-[#FAFAFA] dark:border-b dark:border-slate-50/[0.1]">
			<div className="container mx-auto">
				<div className="text-center">
					<h2 className="text-xl md:text-[26px] font-bold leading-[34px] text-theme-heading-text mb-2 dark:text-slate-200">
						{
							selectedLanguage === 'en' ? 'Index' : 'সূচীপত্র'
						}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<div>
						<img className='w-full max-w-[80%] mx-auto' draggable='false' src={ bnbook } alt="" />
						<div className='w-full max-w-[425px] mx-auto relative'>
							<h2 className='text-[26px] text-theme-heading-text leading-9 font-hindSiliguri font-bold mb-3 dark:text-stone-200'>অসমাপ্ত আত্মজীবনী</h2>
							<ul className='border-t border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>বন্ধুবান্ধবরা বলে, তোমার জীবনী লেখ।</li>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>আমার জন্ম হয় ফরিদপুর জেলার গোপালগঞ্জ।</li>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>আমার জন্ম হয় ১৯২০ সালের ১৭ই মার্চ।</li>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>১৯৩৯ সালে কলকাতা যাই বেড়াত।</li>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>একটা ঘটনার দিন-তারিখ।</li>
								<li className='text-lg font-semibold font-hindSiliguri leading-7 text-theme-heading-text dark:text-slate-400 py-2'>এই সময় রিলিফের কাজ করার জন্য গোপালগঞ্জ ফিরে আসি।</li>
							</ul>
							<div className={`absolute w-full h-[333px] left-0 bottom-0 ${ theme === 'light' ? 'overly_box' : 'dark_overly' }`}></div>
						</div>
						<div className='w-full max-w-[425px] mx-auto flex gap-3 justify-between'>
							<Link
								to={`/book/1/chapter/1`}
								className={`bg-[#7F7056] ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-hindSiliguri' } text-sm font-medium text-theme-white flex py-[15px] px-7 rounded-lg gap-2`}
							>
								{
									selectedLanguage === 'en' ? 'See More' : 'আরও দেখুন'
								}
								<GoArrowRight className="text-2xl" />
							</Link>
							<Link
								to={`/book/1/full-audio`}
								className={`bg-[#7F7056] ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-hindSiliguri' } text-sm font-medium text-theme-white flex py-[15px] px-7 rounded-lg gap-2`}
							>
								{
									selectedLanguage === 'en' ? 'Only Listen' : 'শুধুমাত্র শুনুন'
								}
								<GoArrowRight className="text-2xl" />
							</Link>
						</div>
					</div>
					<div>
						<img className='w-full max-w-[80%] mx-auto' draggable='false' src={ enbook } alt="" />
						<div className='w-full max-w-[425px] mx-auto relative'>
							<h2 className='text-[26px] text-theme-heading-text leading-9 font-poppins font-bold mb-3 dark:text-stone-200'>The Unfinished Memoirs</h2>
							<ul className='border-t border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>My friends say, write your biography.</li>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>I was born in Tungipara village of Gopalganj.</li>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>I was born on 17 March 1920</li>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>In 1939 I went to Calcutta</li>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2 border-b border-[#2F2F3C]/20 dark:border-slate-50/[0.3]'>In school I was crazy about sports</li>
								<li className='text-lg font-semibold font-poppins leading-7 text-theme-heading-text dark:text-slate-400 py-2'>In 1941 I was scheduled to sit</li>
							</ul>
							<div className={`absolute w-full h-[333px] left-0 bottom-0 ${ theme === 'light' ? 'overly_box' : 'dark_overly' }`}></div>
						</div>
						<div className='w-full max-w-[425px] mx-auto flex gap-3 justify-between'>
							<Link
								to={`/book/2/chapter/1`}
								className={`bg-[#7F7056] ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-hindSiliguri' } text-sm font-medium text-theme-white flex py-[15px] px-7 rounded-lg gap-2`}
							>
								{
									selectedLanguage === 'en' ? 'See More' : 'আরও দেখুন'
								}
								<GoArrowRight className="text-2xl" />
							</Link>
							<Link
								to={`/book/2/full-audio`}
								className={`bg-[#7F7056] ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-hindSiliguri' } text-sm font-medium text-theme-white flex py-[15px] px-7 rounded-lg gap-2`}
							>
								{
									selectedLanguage === 'en' ? 'Only Listen' : 'শুধুমাত্র শুনুন'
								}
								<GoArrowRight className="text-2xl" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookIndex; 