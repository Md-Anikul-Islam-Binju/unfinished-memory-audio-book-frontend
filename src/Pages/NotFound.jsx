import { Link } from "react-router-dom";
import useSetPageTitle from "../Hooks/useSetPageTitle";

const NotFound = () => {
	useSetPageTitle('404 Not Found')
	return (
		<section className="bg-notFound h-screen bg-cover bg-no-repeat bg-center flex items-center">
			<div className="container mx-auto">
				<div className="font-poppins w-full max-w-[570px] text-center text-theme-white">
					<h2 className="text-[80px] leading-[90px] tracking-[14.5px] font-bold">404-error</h2>
					<h3 className="text-[40px] leading-[90px] font-semibold tracking-[1.5px]">PAGE NOT FOUND</h3>
					<p className=" text-[#a1a1aa] text-lg leading-7 mb-5">Your search has ventured beyond the known universe.</p>
					<Link to={'/'} className="not_found_page_btn py-4 px-6 inline-block">
						Back To Home
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;