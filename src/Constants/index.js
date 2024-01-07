/* eslint-disable no-unused-vars */
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
import bnBook from '/assets/images/book_bn.png'
import enBook from '/assets/images/book_en.png'
export const defaultFontsize = {
	size: '20px',
	lineHeight: '35px'
}
export const defaultFontFamily = {
	name: 'SolaimanLipi',
}

export const fontSizeCollection = [
	{id: 4, size: '16px', lineHeight: '35px'},
	{id: 5, size: '18px', lineHeight: '35px'},
	{id: 6, size: '20px', lineHeight: '35px'},
	{id: 7, size: '22px', lineHeight: '35px'},
	{id: 8, size: '24px', lineHeight: '40px'}
]

export const fontFamilyCollection = [
	{id: 1, name: 'SolaimanLipi'},
	{id: 2, name: 'Hind Siliguri'},
	{id: 3, name: 'Open Sans'},
	{id: 4, name: 'Poppins'}
]

export const defaultChapterId = {id: 1}

export const navbarMenu = [
	{
		id: 1,
		en_name: 'Home',
		bn_name: 'হোম',
		en_path: '/',
		bn_path: '/',
	},
	{
		id: 2,
		en_name: 'The Unfinished Memoirs',
		bn_name: 'অসমাপ্ত আত্মজীবনী',
		bn_path: 'book/1/chapter/1',
		en_path: 'book/2/chapter/1',
	},
	{
		id: 3,
		en_name: 'Archive',
		bn_name: 'আর্কাইভ',
		en_path: '/archive',
		bn_path: '/archive',
	},
	{
		id: 4,
		en_name: 'Bookmark',
		bn_name: 'বুকমার্ক',
		en_path: '/bookmarks',
		bn_path: '/bookmarks',
	}
]
export const exactPaths = {
	enPath: '/book/2/chapter/1',
	bnPath: '/book/1/chapter/1',
}

export const languageSwitcherData = {
	'bn': {
		id: 1,
		name: 'বাংলা',
		code: 'bn',
	},
	'en': {
		id: 2,
		name: 'English',
		code: 'en',
	}
}

export const banglaDigits = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
};

