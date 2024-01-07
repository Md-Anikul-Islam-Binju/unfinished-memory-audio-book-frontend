/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { apiBaseUrl } from "../../Constants";
import { BookContext } from "../../Context/BookProvider";
import { ThemeContext } from "../../Context/ThemeProvider";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ScrollCarousel from "scroll-carousel-react";

const ArchiveComponent = () => {
	const { archiveData, setArchiveData, setLoading, loading } = useContext(BookContext)
	const { selectedLanguage } = useContext(ThemeContext)

	useEffect(() => {
		if(archiveData) {
			setLoading(true,)
			fetch(`${apiBaseUrl}/archive`)
				.then(res => res.json())
				.then(data => {
					setArchiveData(data)
					setLoading(false)
				})
				.catch(err => console.error(err))
		}
	}, [setArchiveData, setLoading])
	return (
		<section className="px-[15px] lg:px-0 py-14 md:py-16 lg:py-20 dark:bg-theme-dark dark:border-b dark:border-slate-50/[0.1]">
			<div className="container mx-auto">
				<div className="flex items-center justify-between mb-8 gap-5">
					<h2 className="text-xl md:text-[26px] font-bold leading-[34px] text-theme-heading-text mb-2 dark:text-slate-200">
						{
							selectedLanguage === 'en' ? 'Archive' : 'আর্কাইভ'
						}
					</h2>
					<Link to={'/archive'} className="flex gap-2 text-lg font-semibold items-center hover:text-theme-lang-switcher dark:hover:text-theme-lang-switcher transition-all duration-300 dark:text-slate-200">
						{
							selectedLanguage === 'en' ? 'View All' : 'সব দেখুন'
						}
						<GoArrowRight className="text-2xl" />
					</Link>
				</div>
				<>
					{
						loading ?
						<div className="flex justify-center">
							<div role="status" className="flex items-center gap-3">
								<svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-theme-lang-switcher" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
									<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
								</svg>
								<span className="text-xl font-poppins dark:text-slate-300">
									{
										selectedLanguage === 'en' ? 'Archive Data Loading...' : 'আর্কাইভ ডাটা লোড হচ্ছে...'
									}
								</span>
							</div>

						</div>
						:
						<ScrollCarousel
							autoplay={true}
							speed={2}
							smartSpeed={true}
							margin={20}
						>
							{
								archiveData?.allPhoto?.map(data => (
									<div key={ data.id } className="border p-2 text-center dark:border-slate-50/[0.09] shadow-theme-search-shadow dark:shadow-theme-book-shadow w-[310px] h-[390px]">
										<PhotoProvider>
											<PhotoView src={`https://ufmb.etldev.xyz/storage/${ data.photo }`}>
												<img draggable='false' className="cursor-pointer h-[290px] mx-auto mb-5 w-full" src={`https://ufmb.etldev.xyz/storage/${ data.photo }`} alt={ selectedLanguage === 'en' ? data.title_en : data.title_bn } />
											</PhotoView>
										</PhotoProvider>
										<h2
											className={`${ selectedLanguage === 'en' ? 'text-base leading-6 font-poppins' : 'text-lg leading-7 font-hindSiliguri' } text-theme-heading-text dark:text-slate-300`}
										>
											{selectedLanguage === 'en'
												? data.title_en.length > 60
													? `${data.title_en.slice(0, 60)}...`
													: data.title_en
												: data.title_bn.length > 60
												? `${data.title_bn.slice(0, 60)}...`
												: data.title_bn}
										</h2>
									</div>
								))
							}
						</ScrollCarousel>
					}
				</>	
			</div>
		</section>
	);
};

export default ArchiveComponent;