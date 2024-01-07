import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BookProvider from './Context/BookProvider.jsx'
import 'react-photo-view/dist/react-photo-view.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeProvider from './Context/ThemeProvider.jsx'
//! Create Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider>
			<BookProvider>
				<QueryClientProvider client={ queryClient }>
					<App />
				</QueryClientProvider>
			</BookProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
