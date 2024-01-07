import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { BookContext } from "../../Context/BookProvider";
import { IoClose } from "react-icons/io5";
import { apiBaseUrl } from "../../Constants";
import { Link } from "react-router-dom";

const GlobalSearch = () => {
const { closeModal, globalSearch, setChapter } = useContext(BookContext);
const [globalSearchData, setGlobalSearchData] = useState([]);
const [searchValue, setSearchValue] = useState("");

const handleGlobalSearch = async (searchValue) => {
	setSearchValue(searchValue);
	if (searchValue.trim() === "") {
		setGlobalSearchData([]);
	} else {
		const res = await fetch(`${apiBaseUrl}/search?line=${searchValue}`);
		const data = await res.json();
		setGlobalSearchData(data);
	}
};



const highlightText = (text, searchValue) => {
	if (!searchValue) return text;

	const lowerText = text.toLowerCase();
	const lowerSearchValue = searchValue.toLowerCase();

	if (lowerText.includes(lowerSearchValue)) {
		const parts = lowerText.split(lowerSearchValue);
		const matches = text.match(new RegExp(searchValue, "gi"));

		return parts.map((part, index) => (
			<Fragment key={index}>
				{index > 0 && (
					<span className="bg-theme-line-highlight dark:text-theme-heading-text">
						{matches[index - 1]}
					</span>
				)}
				{part}
			</Fragment>
		));
	} else {
		return text;
	}
};


return (
	<Transition appear show={globalSearch} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={closeModal}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black/25" />
			</Transition.Child>

			<div className="fixed inset-0 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-0 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-2 text-left align-middle shadow-xl transition-all">
							<div className="flex justify-between">
								<div className=" dark:text-theme-white/90">
									{
										globalSearchData?.data?.length &&
										<h3 className="ps-3 text-base text-theme-body-text dark:text-theme-white/90">Total Line: {globalSearchData?.data?.length && globalSearchData?.data?.length}</h3>
									}
								</div>
								<div
									className="cursor-pointer border-2 border-theme-border dark:border-theme-lang-switcher w-9 h-9 p-1 rounded-full  text-theme-menu-link dark:text-theme-lang-switcher dark:hover:text-theme-white hover:bg-theme-lang-switcher transition-all hover:text-theme-white duration-300 ease-in-out hover:border-theme-lang-switcher rotate-0 hover:rotate-90"
									onClick={closeModal}
								>
									<IoClose className="text-xl w-full h-full" />
								</div>
							</div>
							<div className="mt-5 px-5">
								<input
									type="text"
									className="border-theme-border-1 font-openSans px-3 py-2 border-theme-border dark:border-theme-lang-switcher dark:bg-transparent dark:text-white w-full focus:outline-none focus:ring-1"
									onChange={(event) => handleGlobalSearch(event.target.value)}
									placeholder="লাইন অনুসন্ধান করুন।"
								/>
								<div className="overflow-y-auto max-h-[300px] mt-5" id="scrollBarStyle">
									{globalSearchData?.data?.map((line) => (
									<div
										key={line.id}
										className="shadow-theme-search-shadow bg-[#FCFCFC] dark:bg-slate-600 my-4 mx-2 p-3 rounded-lg"
										onClick={() => setChapter(line?.chapter)}
									>
										<Link to={`/book/${ line.book_id }/chapter/${ line.chapter_id }`} onClick={ closeModal }>
											<h3 className="font-bold text-theme-heading-text dark:text-theme-white text-sm mb-1">{`${line?.chapter?.chapter_name}।`}</h3>
											<span
												className={`font-openSans font-normal text-theme-body-text dark:text-theme-white text-base`}
											>
												{highlightText(line.line, searchValue)}
											</span>
										</Link>
									</div>
									))}
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
);
};

export default GlobalSearch;
