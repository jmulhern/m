import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Assessments from "./Assessments";
import Home from "./Home";


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
           <Route path="/w/:id" element={<Assessments />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
