const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-slate-800 px-[15px] border-t-transparent dark:border-t dark:border-slate-50/[0.09]">
			<div className="container mx-auto">
				<p className="text-center text-theme-white font-poppins py-5">
					© { currentYear } ICT DIVISION All right reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;