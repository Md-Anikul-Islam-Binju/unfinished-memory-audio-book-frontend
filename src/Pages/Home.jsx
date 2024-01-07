import useSetPageTitle from "../Hooks/useSetPageTitle";
import Author from "../Components/HomePage/Author";
import DownloadApp from "../Components/HomePage/DownloadApp";
import HeroUpdate from "../Components/HomePage/HeroUpdate";
import ArchiveComponent from "../Components/HomePage/ArchiveComponent";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";
import BookIndex from "../Components/HomePage/BookIndex";

const Home = () => {
	const { selectedLanguage } = useContext(ThemeContext)
	useSetPageTitle(`${ selectedLanguage === 'en' ? 'Home' : 'হোম' }`);
	return (
		<>
			<HeroUpdate />
			<Author />
			<BookIndex />
			<ArchiveComponent />
			<DownloadApp />
		</>
	);
};

export default Home;