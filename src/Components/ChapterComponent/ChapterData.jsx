import { PhotoProvider, PhotoView } from "react-photo-view";
import LineHighlight from "./LineHighlight";
import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookProvider";

/* eslint-disable react/prop-types */
const ChapterData = ({ chapterPageData }) => {
	const {setAudioTime, setPerPageData} = useContext(BookContext)
	
	useEffect(() => {
		const startTimeCurrentIndex = chapterPageData?.start_time[0]
		setPerPageData(chapterPageData)
		setAudioTime(startTimeCurrentIndex);
	}, [chapterPageData?.start_time, setAudioTime, setPerPageData, chapterPageData]);

	return (
		<>
			{
				chapterPageData.data.map((line, i) => (
					<span key={i}>
						<LineHighlight lineData={line} />
							{
								line?.image_file === null ? null : 
								<PhotoProvider>
									<PhotoView src={`https://ufmb.etldev.xyz/storage/${ line.image_file }`}>
										<img className="w-9/12 mx-auto border-theme-border-1 border-theme-border my-5" draggable='false' src={`https://ufmb.etldev.xyz/storage/${ line.image_file }`} alt="" />
									</PhotoView>
								</PhotoProvider>
							}
					</span>
				))
			}
		</>
	);
};

export default ChapterData;