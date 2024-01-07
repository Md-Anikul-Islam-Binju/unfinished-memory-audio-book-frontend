/* eslint-disable no-unused-vars */
import { Link, NavLink, useLocation } from "react-router-dom";
import mainLogo from '/assets/images/logo.png'
import { languageSwitcherData, navbarMenu } from '../Constants/index'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiXMark } from 'react-icons/hi2'
import { useContext, useState } from "react";
import { BookContext } from "../Context/BookProvider";
import GlobalSearch from "../Components/Modal/GlobalSearch";
import { ThemeContext } from "../Context/ThemeProvider";
import DarkMoodIcon from "../Components/Svg/DarkMoodIcon";
import LightMoodIcon from "../Components/Svg/LightMoodIcon";

const Header = () => {
	const location = useLocation()
	const currentUrl = location.pathname
	const { openModal } = useContext(BookContext);
	const { handleThemeSwitch, theme, selectedLanguage, handleLanguageChange } = useContext(ThemeContext)
	const [nav, setNav] = useState(false);
	const handleNavbar = () => {
		setNav(!nav);
	};

	return (
		<>
			<header className="px-[15px] header_style flex items-center border-b-transparent dark:border-b dark:border-slate-50/[0.09] shadow-theme-chapter-shadow">
				<div className="container mx-auto flex items-center justify-between">
					<div>
						<Link to={'/'}>
							<img draggable='false' className="w-[80px] md:w-[100px] lg:w-[100px]" src={mainLogo} alt="" />
						</Link>
					</div>
					<nav>
						<div className="hidden lg:block">
							<ul className="flex items-center space-x-7">
								{
									navbarMenu.map(item => (
										<li key={item.id}>
											<NavLink
												to={ selectedLanguage === 'en' ? item.en_path : item.bn_path }
												className={({ isActive }) =>
													isActive ? "header_menu_item text-theme-black dark:text-theme-lang-switcher" : "header_menu_item text-theme-menu-link dark:text-theme-white/90 hover:text-theme-black dark:hover:text-theme-lang-switcher"
												}
											>{ selectedLanguage === 'en' ? item.en_name : item.bn_name }</NavLink>
										</li>
									))
								}
								<li>
									<div
										className="cursor-pointer text-theme-menu-link hover:text-theme-black dark:text-theme-white/90 dark:hover:text-theme-lang-switcher transition-all duration-300 ease-in-out"
										onClick={ handleThemeSwitch }
									>
										{
											theme === "light" ? 
											<LightMoodIcon /> :
											<DarkMoodIcon />
										}
									</div>
								</li>
								{
									currentUrl === '/' ?
										<select
											onChange={(e) => handleLanguageChange(e.target.value)}
											value={selectedLanguage}
											className="bg-transparent text-theme-menu-link hover:text-theme-black cursor-pointer dark:text-slate-200 dark:hover:text-theme-lang-switcher header_menu_item focus:outline-none"
										>
											{
												Object.values(languageSwitcherData).map((lang) => (
													<option key={lang.id} value={lang.code}>
														{lang.name}
													</option>
												))
											}
										</select>
									:
									''
								}
								
							</ul>
						</div>
						<div className="flex items-center gap-5 lg:hidden">
							<div className="cursor-pointer group" onClick={handleNavbar}>
								<GiHamburgerMenu
									className="text-xl group-hover:text-theme-lang-switcher transition-all duration-300 ease-in-out text-theme-heading-text dark:text-theme-white/90"
								/>
							</div>
							<div
								className="cursor-pointer text-theme-menu-link hover:text-theme-black dark:text-theme-white/90 dark:hover:text-theme-lang-switcher transition-all duration-300 ease-in-out"
								onClick={ handleThemeSwitch }
							>
								{
									theme === "light" ? 
									<LightMoodIcon />
									: 
									<DarkMoodIcon />
								}
							</div>
						</div>
						{nav ? (
							<div onClick={handleNavbar} className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 ease-in duration-500"></div>
						) : (
							""
						)}
						{/* Off-Canvas Mobile Navbar */}
						<div
							className={`fixed top-0 w-[280px] p-10 z-30 ${nav ? 'right-0' : 'right-[-100%]'} bottom-0 bg-black h-full ease-in duration-500`}
						>
							<HiXMark
								onClick={handleNavbar}
								className='text-3xl text-theme-lang-switcher border-theme-border-1 border-theme-lang-switcher rounded-full cursor-pointer mb-10 rotate-0 hover:rotate-90 hover:text-theme-white hover:bg-theme-lang-switcher transition-all duration-300 ease-in-out'
							/>
							<ul className="flex flex-col gap-3">
								{
									navbarMenu.map(item => (
										<li key={item.id}>
											<NavLink
												to={ selectedLanguage === 'en' ? item.en_path : item.bn_path }
												onClick={handleNavbar}
												className={({ isActive }) =>
													isActive ? "font-hindSiliguri text-xl font-normal text-theme-lang-switcher leading-8 hover:text-theme-lang-switcher transition-all duration-300 ease-in-out" : "font-hindSiliguri text-xl font-normal leading-8 hover:text-theme-lang-switcher transition-all duration-300 ease-in-out text-white"
												}
											>{ selectedLanguage === 'en' ? item.en_name : item.bn_name }</NavLink>
										</li>
									))
								}
								{
									currentUrl === '/' ?
										<select
											onChange={(e) => handleLanguageChange(e.target.value)}
											value={selectedLanguage}
											className="bg-transparent text-white leading-8 hover:text-theme-lang-switcher cursor-pointer dark:text-slate-200 dark:hover:text-theme-lang-switcher header_menu_item focus:outline-none"
										>
											{
												Object.values(languageSwitcherData).map((lang) => (
													<option key={lang.id} value={lang.code}>
														{lang.name}
													</option>
												))
											}
										</select>
									:
									''
								}
								
							</ul>
						</div>
					</nav>
				</div>
			</header>
			<GlobalSearch />
		</>
	);
};

export default Header;
