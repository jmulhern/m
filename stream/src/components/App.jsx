import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Stream from "./Stream";


const queryClient = new QueryClient()

export default function App() {
  const channelID = 'UCGqaY3UNt7wNRuKFe1drzCw'
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/*" element={<Stream channelID={channelID}/>}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
