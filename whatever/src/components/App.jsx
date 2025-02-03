import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Home from "./Home";
import GameOver from "./GameOver";
import Next from "./Next";
import One from "./One";
import Two from "./Two";



const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/one" element={<One />}/>
          <Route path="/two" element={<Two />}/>
          <Route path="/next/:path" element={<Next />}/>
          <Route path="/gameover" element={<GameOver />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
