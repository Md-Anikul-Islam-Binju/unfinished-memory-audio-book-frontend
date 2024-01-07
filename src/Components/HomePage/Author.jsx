import { useContext } from 'react';
import author from '/assets/images/author.png'
import { ThemeContext } from '../../Context/ThemeProvider';
const Author = () => {
	const { selectedLanguage } = useContext(ThemeContext)
	return (
		<section className={`py-16 md:py-20 lg:py-[100px] px-[15px] lg:px-0 bg-theme-white dark:bg-theme-dark ${ selectedLanguage === 'en' ? 'font-poppins' : 'font-hindSiliguri' } relative dark:border-b dark:border-slate-50/[0.1]`}>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-[50px] z-20">
					<div className='col-span-1 md:col-span-4 lg:col-span-4 z-20'>
						<img className='w-full' draggable='false' src={ author } alt="" />
					</div>
					<div className='col-span-1 md:col-span-8'>
						<h3 className='text-[#7F7056] text-lg font-normal leading-[26px] mb-2 dark:text-slate-300'>
							{
								selectedLanguage === 'en' ? 'The Author' : 'লেখক'
							}
						</h3>
						<h2 className='text-[22px] font-semibold leading-[30px] mb-3 text-theme-heading-text dark:text-slate-200'>
							{
								selectedLanguage === 'en' ? 'Sheikh Mujibur Rahman' : 'শেখ মুজিবুর রহমান'
							}
						</h2>
						<div className='space-y-8 pe-0 lg:pe-[165px]'>
							<p className={`${ selectedLanguage === 'en' ? 'text-base leading-6' : 'text-lg leading-7' } font-normal text-theme-body-text dark:text-slate-400`}>
								{
									selectedLanguage === 'en' ? 'Father of the Nation Bangabandhu Sheikh Mujibur Rahman (1920-1975) is the architect of independent Bangladesh. Born on 17 March 1920 in the village Tungipara under the Gopalganj Sub-division (currently district) in the district of Faridpur, Sheikh Mujibur Rahman’s father, Sheikh Lutfar Rahman, was a serestadar in the civil court of Gopalganj.' : 'জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান (1920-1975) স্বাধীন বাংলাদেশের স্থপতি। ১৯২০ সালের ১৭ মার্চ ফরিদপুর জেলার গোপালগঞ্জ মহকুমার (বর্তমানে জেলা) টুঙ্গিপাড়া গ্রামে জন্মগ্রহণ করেন, শেখ মুজিবুর রহমানের পিতা শেখ লুৎফর রহমান ছিলেন গোপালগঞ্জের দেওয়ানি আদালতের সেরেস্তাদার।'
								}
							</p>
							<p className={`${ selectedLanguage === 'en' ? 'text-base leading-6' : 'text-lg leading-7' } font-normal text-theme-body-text dark:text-slate-400`}>
								{
									selectedLanguage === 'en' ? 'Sheikh Mujibur Rahman passed his matriculation from Gopalganj Missionary School in 1942, IA (Twelfth Grade) from Islamia College, Calcutta in 1944 and BA from the same College in 1947.' : 'শেখ মুজিবুর রহমান 1942 সালে গোপালগঞ্জ মিশনারি স্কুল থেকে ম্যাট্রিকুলেশন, 1944 সালে কলকাতার ইসলামিয়া কলেজ থেকে আইএ (দ্বাদশ শ্রেণী) এবং 1947 সালে একই কলেজ থেকে বিএ পাস করেন।'
								}
							</p>
						</div>
					</div>
				</div>
			</div>
			<h2 className='author_text_style z-10'>
				{
					selectedLanguage === 'en' ? 'Author' : 'লেখক'
				}
			</h2>
		</section>
	);
};

export default Author;