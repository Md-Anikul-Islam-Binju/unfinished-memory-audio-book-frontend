/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookProvider";
import { ThemeContext } from "../Context/ThemeProvider";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { apiBaseUrl } from "../Constants";
import useSetPageTitle from "../Hooks/useSetPageTitle";

const Archive = () => {
	const { archiveData, setArchiveData, setLoading, loading } = useContext(BookContext)
	const { selectedLanguage } = useContext(ThemeContext)
	useSetPageTitle(`${ selectedLanguage === 'en' ? 'Archive' : 'আর্কাইভ' }`);

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
		<section className="py-14 md:py-16 lg:py-[100px] dark:bg-theme-dark px-[15px] lg:px-0">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{
						loading ? archiveData?.allPhoto?.map((_, i) => (
							<div className="relative isolate space-y-5 overflow-hidden rounded-2xl bg-[#0000008a] dark:bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent" key={ i }>
								<div className="h-[200px] rounded-lg bg-rose-100/10"></div>
								<div className="space-y-3">
									<div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
									<div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
									<div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
								</div>
							</div>
						))
						:
						archiveData?.allPhoto?.map(data => (
							<div key={ data.id } className="border p-2 text-center dark:border-slate-50/[0.09] shadow-theme-search-shadow dark:shadow-theme-book-shadow">
								<PhotoProvider>
									<PhotoView src={`https://ufmb.etldev.xyz/storage/${ data.photo }`}>
										<img draggable='false' className="cursor-pointer h-[290px] mx-auto mb-5" src={`https://ufmb.etldev.xyz/storage/${ data.photo }`} alt={ selectedLanguage === 'en' ? data.title_en : data.title_bn } />
									</PhotoView>
								</PhotoProvider>
								<h2
									className="text-base leading-6 text-theme-heading-text dark:text-slate-300"
									style={{
										fontFamily: selectedLanguage === 'en' ? 'Poppins' : 'Hind Siliguri',
									}}
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
				</div>	
			</div>
		</section>
	);
};

export default Archive;