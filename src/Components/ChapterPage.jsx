/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookProvider";
import { apiBaseUrl } from "../Constants";
import Line from "./Line";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ChapterPage = ({ bookId }) => {
	const { 
		allDisable, 
		loading, 
		fontSizeUpdate, 
		fontFamilyUpdate,
		chapter, 
		chapterPage, 
		setChapterPage, 
		setLoading
	} = useContext(BookContext);
	const chapterPageData = chapterPage?.contents;

	useEffect(() => {
		if (bookId && chapter ) {
			setLoading(true);
			fetch(`${apiBaseUrl}/books/${bookId}/chapters/${chapter.id}/all-content`)
				.then((res) => res.json())
				.then((data) => {
					setChapterPage(data);
					setLoading(false);
				})
				.catch((err) => console.error(err));
		
		}
	}, [bookId, chapter]);


	return (
		<div className={`w-full h-[80%] overflow-y-auto ${ loading ? '' : 'pb-6 pe-3' } scrollbar`} id="scrollBarStyle" onClick={allDisable}>
			{
				loading && (
					<div className="w-full h-[80%]">
						<div className="loading-skeleton">
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
							<div className="skeleton-text h-5 w-full mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
						</div>
					</div>
				)
			}
			<div
				className={`text-justify space-x-1 font-normal text-theme-body-text ${loading === true ? 'hidden' : 'block'}`}
				style={{
					fontSize: `${fontSizeUpdate.size}`,
					lineHeight: `${fontSizeUpdate.lineHeight}`,
					fontFamily: `${fontFamilyUpdate.name}`,
				}}
			>
				{
					chapterPageData?.map((page) => (
						<span key={page.id} className="text-center">
							<Line page={page} />
							{
								page?.image_file === null ? null : 
								<PhotoProvider>
									<PhotoView src={`https://ufmb.etldev.xyz/storage/${ page.image_file }`}>
										<img className="w-9/12 mx-auto border-theme-border-1 border-theme-border my-5" draggable='false' src={`https://ufmb.etldev.xyz/storage/${ page.image_file }`} alt="" />
									</PhotoView>
								</PhotoProvider>
							}
						</span>
					))
				}
			</div>
		</div>
	);
};

export default ChapterPage;
