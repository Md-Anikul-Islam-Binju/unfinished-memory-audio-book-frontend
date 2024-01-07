import { useContext, useEffect } from "react"
import { ThemeContext } from "../Context/ThemeProvider"

const useSetPageTitle = title => {
	const { selectedLanguage } = useContext(ThemeContext)
    useEffect(() => {
        document.title = `${title} - ${ selectedLanguage === 'en' ? 'Unfinished Memoirs' : 'অসমাপ্ত আত্মজীবনী' }`
    }, [title, selectedLanguage])
}

export default useSetPageTitle