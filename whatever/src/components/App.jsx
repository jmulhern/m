import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Whatever from "./Whatever";
import Home from "./Home";


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/ghostlybones" element={<Whatever username="ghostlybones"/>}/>
          <Route path="/pandapandabear" element={<Whatever username="pandapandabear"/>}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
