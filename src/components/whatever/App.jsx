import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Whatever from "./Whatever";


const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/*" element={<Whatever />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
