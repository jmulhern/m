import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Home from "./Home";
import GameOver from "./GameOver";
import One from "./One";
import Two from "./Two";
import SlayTheSpire from "./SlayTheSpire";
import Ironclad from "./Ironclad";



const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/one" element={<One />}/>
          <Route path="/two" element={<Two />}/>
          <Route path="/slay-the-spire" element={<SlayTheSpire />}/>
          <Route path="/ironclad" element={<Ironclad />}/>
          <Route path="/gameover" element={<GameOver />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
