import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Home from "./Home";
import GameOver from "./GameOver";
import One from "./One";
import Two from "./Two";
import SlayTheSpire from "./SlayTheSpire";
import Ironclad from "./TierList";
import TierList from "./TierList";
import Questions from "./Questions";



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
          <Route path="/relic" element={<TierList id="relic" name="Relics" />}/>
          <Route path="/ironclad" element={<TierList id="ironclad" name="Ironclad" />}/>
          <Route path="/the-watcher" element={<TierList id="the-watcher" name="The Watcher" />}/>
          <Route path="/questions" element={<Questions />}/>
          <Route path="/gameover" element={<GameOver />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
