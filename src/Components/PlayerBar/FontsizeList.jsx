import { useContext } from 'react';
import LeftArrow from '../Svg/LeftArrow';
import { BookContext } from '../../Context/BookProvider';
import { fontSizeCollection } from '../../Constants';

const FontsizeList = () => {
	const {showSetting, handleFontSizeUpdate, fontSizeUpdate} = useContext(BookContext)
	return (
		<div className="choose_option_wrap">
			<div 
				className="choose_wrap"
				onClick={ showSetting }
			>
				<div className="w-5">
					<LeftArrow />
				</div>
				<span>Choose Size</span> 
			</div>
			<div className="flex flex-col h-[287px] overflow-x-auto" id="scrollBarStyle">
				{
					fontSizeCollection?.map((fontSize) => (
						<span 
							key={fontSize.id} 
							className={`playback_speed_list border-b-theme-border-1 border-theme-border ${fontSizeUpdate.size === fontSize.size ? 'bg-theme-books-bn dark:bg-slate-600' : ''}`}
							onClick={() => handleFontSizeUpdate(fontSize)}
						>{fontSize.size}</span>
					))
				}
			</div>
		</div>
	);
};

export default FontsizeList;