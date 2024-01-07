/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../Context/BookProvider';

const AudioFile = () => {
	const {
			audioRef, 
			chapter, 
			setIsPlaying, 
			userAlertCustomMessage,
			setAudioTime
		} = useContext(BookContext)
	const [audioFile, setAudioFile] = useState(null);

	useEffect(() => {
		if (chapter && audioRef.current) {
			// const audioFileName = `/src/assets/audio/chapter_${chapter.id.toString().padStart(2, '0')}.mp3`;
			const audioFileName = `/assets/all_chapter_audio/chapter_${chapter.id.toString().padStart(2, '0')}.mp3`;
			fetch(audioFileName)
			.then(response => {
				if (response.status === 200) {
					setAudioFile(audioFileName)
				} else {
					userAlertCustomMessage('দুঃখিত!', 'এই অধ্যায়ের অডিও এখনো আমাদের কাছে পাওয়া যায়নি। আমরা চেষ্টা করবো খুব শীঘ্রই এটি যোগ করার।', 'error', '#E6332E')
				}
			})

			audioRef.current.load();
			audioRef.current.pause();
			setIsPlaying(false);

			audioRef.current.addEventListener('timeupdate', () => {
				const currentTimeMillis = Math.round(audioRef.current.currentTime * 1000);
				setAudioTime(currentTimeMillis);
			});

		}
	}, [chapter, audioRef]);
	
	return (
		<>
			{
				chapter && (
					<audio ref={audioRef} src={ audioFile }></audio>
				)
			}
		</>
	);
};

export default AudioFile;