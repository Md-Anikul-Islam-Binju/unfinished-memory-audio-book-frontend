import { useContext } from "react";
import { BookContext } from "../Context/BookProvider";
import { useQuery } from "react-query";
import { apiBaseUrl } from "../Constants";

/* eslint-disable react/prop-types */
const ChaptersList = ({ chapter, bookId }) => {
	const { setChapter } = useContext(BookContext)

	const { data: chapters = [], isLoading } = useQuery({
        queryKey: ["chapters"],
        queryFn: async () => {
            const res = await fetch(`${apiBaseUrl}/books/${bookId}/chapters`)
            const data = await res.json()
            return data
        },
    })

	const chapterComplete = JSON.parse(localStorage.getItem("chapterComplete")) || [];

	return (
		<>
			{
				isLoading && (
					<div className="w-full h-full">
						<div className="loading-skeleton">
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
							<div className="skeleton-text h-[49px] w-full mb-2 bg-gray-200 animate-pulse"></div>
						</div>
					</div>
				)
			}
			{
				chapters?.map((chapterItem) => (
					<span
						key={chapterItem.id}
						className={`font-openSans font-medium text-base leading-6 cursor-pointer border-b-theme-border-1 py-3 px-5 text-theme-body-text hover:bg-theme-books-bn transition-all duration-300 ${chapter?.id === chapterItem?.id ? "bg-theme-books-bn transition-all duration-300" : 'transition-all duration-300'}`}
						onClick={() => setChapter(chapterItem)}
					>
						{chapterComplete.some((completedChapter) => completedChapter.id === chapterItem.id) ? (
						<span className="mr-2">✓</span>
					) : null}
						{chapterItem.chapter_name}
					</span>
				))
			}
		</>
	);
};

export default ChaptersList;