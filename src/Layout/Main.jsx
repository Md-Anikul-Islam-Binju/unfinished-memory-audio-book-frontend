import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const Main = () => {
	return (
		<>
			<Header />
			<ScrollRestoration />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Main;