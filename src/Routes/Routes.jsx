import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import BookPage from "../Pages/BookPage";
import NotFound from "../Pages/NotFound";
import FullAudio from "../Pages/FullAudio";
import Bookmark from "../Pages/Bookmark";
import ChapterPage from "../Pages/ChapterPage";
import Archive from "../Pages/Archive";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/books/:bookId',
				element: <BookPage />
			},
			{
				path: '/book/:bookId/full-audio',
				element: <FullAudio />
			},
			{
				path: '/bookmarks',
				element: <Bookmark />
			},
			{
				path: '/book/:bookId/chapter/:chapterId',
				element: <ChapterPage />
			},
			{
				path: '/archive',
				element: <Archive />
			}
		]
	}
])