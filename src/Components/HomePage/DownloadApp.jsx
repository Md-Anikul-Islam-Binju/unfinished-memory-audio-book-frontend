import playstore from '/assets/images/playstore.png'
import appstore from '/assets/images/appstore.png'
import downloadapp from '/assets/images/downloadapp.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';

const DownloadApp = () => {
	const { selectedLanguage } = useContext(ThemeContext)
	return (
		<section className="bg-[#FAFAFA] pt-[72px] px-[15px] lg:px-0 pb-16 font-poppins dark:bg-theme-dark">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
					<div>
						<h2 className='text-xl md:text-[26px] font-bold leading-[34px] text-theme-heading-text mb-2 dark:text-slate-200'>
							{
								selectedLanguage === 'en' ? 'Download App & Read the Book' : 'অ্যাপ ডাউনলোড করুন এবং বই পড়ুন'
							}	 
						</h2>
						<p className={`mb-9 text-theme-body-text ${ selectedLanguage === 'en' ? 'text-base leading-6' : 'text-lg leading-7' } w-full max-w-[519px] dark:text-slate-400`}>
							{
								selectedLanguage === 'en' ? 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' : 'এটি একটি দীর্ঘ প্রতিষ্ঠিত সত্য যে একটি পাঠক একটি পৃষ্ঠার পাঠযোগ্য বিষয়বস্তু দ্বারা বিভ্রান্ত হবে যখন এটির বিন্যাসটি দেখবে।'
							}
						</p>
						<div className='flex items-center gap-4'>
							<Link to={'/'}>
								<img src={ playstore } draggable='false' alt="Play Store" />
							</Link>
							<Link to={'/'}>
								<img src={ appstore } draggable='false' alt="App Store" />
							</Link>
						</div>
					</div>
					<div>
						<img src={ downloadapp } draggable='false' alt="Download Books Image" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default DownloadApp;