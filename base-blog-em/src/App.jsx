import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {Route, Routes} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<h1>Blog &apos;em Ipsum</h1>
				
				<Routes>
					<Route path="/" element={<Posts />} />
				</Routes>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
  );
}

export default App;
