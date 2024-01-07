/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSetPageTitle from "../Hooks/useSetPageTitle";
import { BookContext } from "../Context/BookProvider";
import ChaptersList from "../Components/ChaptersList";
import ChapterPage from "../Components/ChapterPage";
import MainPlayerBar from "../Components/PlayerBar/MainPlayerBar";
import { HiMiniBookmark, HiOutlineBookmark } from "react-icons/hi2";

const BookPage = () => {
	const { 
		chapter,
		chapterPage,
		allDisable,
		bookmarks,
		setBookmarks
	} = useContext(BookContext);
    const { bookId } = useParams();
	useSetPageTitle(`${chapter?.chapter_name || 'বন্ধুবান্ধবরা বলে, তোমার জীবনী লেখ'}`);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarksData')) || [];
        setBookmarks(storedBookmarks);
    }, [setBookmarks]);

	const toggleBookmark = () => {
        const isBookmarked = bookmarks.some(bookmark => bookmark.id === chapter.id);

        if (isBookmarked) {
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== chapter.id);
            setBookmarks(updatedBookmarks);
            // Store bookmarks in local storage
            localStorage.setItem('bookmarksData', JSON.stringify(updatedBookmarks));
        } else {
            const updatedBookmarks = [...bookmarks, { id: chapter.id, bookId: bookId, chapter_name: chapter.chapter_name ? chapter.chapter_name : 'বন্ধুবান্ধবরা বলে, তোমার জীবনী লেখ' }];
            setBookmarks(updatedBookmarks);
            // Store bookmarks in local storage
            localStorage.setItem('bookmarksData', JSON.stringify(updatedBookmarks));
        }
    };


    return (
        <>
			<div className="container mx-auto">
				<div className="flex gap-5 my-10">
					<div className="flex flex-col h-[80vh] overflow-y-auto w-[30%] border-theme-border-1 border-theme-border" id="scrollBarStyle" onClick={allDisable}>
						<ChaptersList bookId={bookId} chapter={chapter} />
					</div>
					<div className="w-[70%] h-[80vh] flex flex-col justify-between bg-theme-books-bn/30 p-6 pb-0">
						<ChapterPage chapterPage={chapterPage} chapter={chapter} bookId={bookId} />
						{chapterPage && 
							<div className="flex justify-between gap-5 items-center mt-2">
								<div onClick={toggleBookmark}>
									{
										bookmarks.some(bookmark => bookmark.id === chapter.id) ? 
											<HiMiniBookmark 
												className="text-2xl text-theme-bookmark-icon cursor-pointer"
											/>
										: 
											<HiOutlineBookmark
												className="text-2xl text-theme-heading-text hover:text-theme-bookmark-icon duration-300 cursor-pointer"
											/>
									}
								</div>
							</div>
						}
						<MainPlayerBar />
					</div>
				</div>
			</div>
		</>
    );
};

export default BookPage;
