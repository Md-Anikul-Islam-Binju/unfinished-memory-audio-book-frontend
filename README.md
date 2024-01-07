# Unfinished Memory Book API

Welcome to the documentation for the Unfinished Memory Book API. This API provides access to information about books and their chapters. It is hosted at [Live API Here](https://ufmb.etldev.xyz/api).

# [Bangla Book All Audio File Download Link](https://drive.google.com/drive/folders/1Qwo9BxHW-qiHawj4MRRnKiby4L8fnTs2)
# [English Book All Audio File Download Link](https://drive.google.com/drive/folders/1KK9sWTpgpWfFcltKbFt2uX85ORS_dyPn)

## [Live Demo](https://ufmapp.etldev.xyz/) and [Netlify Live Demo ](https://unfinished-memoirs-nwebpro.netlify.app/)


# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/nwebpro/unfinished-memory.git
```

## 2. Install dependencies
```bash
yarn
```
or

```bash
npm install
```

## 3. Start the development server
```bash
yarn dev
```
or

```bash
npm run dev
```

## 4. Build for production

```bash
yarn build
```
or

```bash
npm run build
```

# Setup Environment Variable

Create a root directory for the application directory and create a .env file in the root directory. Then copy the following code and paste it into the .env file and save it.

```bash
VITE_API_BASE_URL = https://ufmb.etldev.xyz/api
```

# Project Structure

```bash
.
├── unfinished_memory/
│   ├── .vscode
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Constants/
│       ├── Context/
│       ├── Hooks/
│       ├── Layout/
│       ├── Pages/
│       ├── Routes/
│       ├── Shared/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── _redirects [For Netlify Host 404 Not Found Error Sloved]
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.css
└── vite.config.js
```

# Technology Used

```bash
"dependencies": {
	"@headlessui/react": "^1.7.17",
	"react": "^18.2.0",
	"react-dom": "^18.2.0",
	"react-icons": "^4.11.0",
	"react-photo-view": "^1.2.3",
	"react-query": "^3.39.3",
	"react-router-dom": "^6.17.0",
	"react-tooltip": "^5.21.5",
	"scroll-carousel-react": "^1.0.0",
	"sweetalert2": "^11.7.32",
	"swiper": "^11.0.3"
},
"devDependencies": {
	"@types/react": "^18.2.15",
	"@types/react-dom": "^18.2.7",
	"@vitejs/plugin-react": "^4.0.3",
	"autoprefixer": "^10.4.16",
	"eslint": "^8.45.0",
	"eslint-plugin-react": "^7.32.2",
	"eslint-plugin-react-hooks": "^4.6.0",
	"eslint-plugin-react-refresh": "^0.4.3",
	"postcss": "^8.4.31",
	"tailwindcss": "^3.3.3",
	"vite": "^4.4.5"
}
```

# Thank You 