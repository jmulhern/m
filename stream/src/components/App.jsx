import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Stream from "./Stream";


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/ghostlybones" element={<Stream username="ghostlybones"/>}/>
          <Route path="/*" element={<Stream username="pandapandabear"/>}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
