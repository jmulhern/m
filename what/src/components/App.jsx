import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Assessments from "./Assessments";
import Home from "./Home";
import Scoreboard from "./Scoreboard";


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/w/:id" element={<Assessments />} />
            <Route path="/w/:id/scoreboard" element={<Scoreboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
