import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sportsball from "./Sportsball";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/ATL" element={<Sportsball tricode="ATL" />}/>
          <Route path="/BOS" element={<Sportsball tricode="BOS" />}/>
          <Route path="/BKN" element={<Sportsball tricode="BKN" />}/>
          <Route path="/CHA" element={<Sportsball tricode="CHA" />}/>
          <Route path="/CHI" element={<Sportsball tricode="CHI" />}/>
          <Route path="/CLE" element={<Sportsball tricode="CLE" />}/>
          <Route path="/DAL" element={<Sportsball tricode="DAL" />}/>
          <Route path="/DEN" element={<Sportsball tricode="DEN" />}/>
          <Route path="/DET" element={<Sportsball tricode="DET" />}/>
          <Route path="/GSW" element={<Sportsball tricode="GSW" />}/>
          <Route path="/HOU" element={<Sportsball tricode="HOU" />}/>
          <Route path="/IND" element={<Sportsball tricode="IND" />}/>
          <Route path="/LAC" element={<Sportsball tricode="LAC" />}/>
          <Route path="/LAL" element={<Sportsball tricode="LAL" />}/>
          <Route path="/MEM" element={<Sportsball tricode="MEM" />}/>
          <Route path="/MIA" element={<Sportsball tricode="MIA" />}/>
          <Route path="/MIL" element={<Sportsball tricode="MIL" />}/>
          <Route path="/MIN" element={<Sportsball tricode="MIN" />}/>
          <Route path="/NOP" element={<Sportsball tricode="NOP" />}/>
          <Route path="/NYK" element={<Sportsball tricode="NYK" />}/>
          <Route path="/OKC" element={<Sportsball tricode="OKC" />}/>
          <Route path="/ORL" element={<Sportsball tricode="ORL" />}/>
          <Route path="/PHI" element={<Sportsball tricode="PHI" />}/>
          <Route path="/PHX" element={<Sportsball tricode="PHX" />}/>
          <Route path="/POR" element={<Sportsball tricode="POR" />}/>
          <Route path="/SAC" element={<Sportsball tricode="SAC" />}/>
          <Route path="/SAS" element={<Sportsball tricode="SAS" />}/>
          <Route path="/TOR" element={<Sportsball tricode="TOR" />}/>
          <Route path="/UTA" element={<Sportsball tricode="UTA" />}/>
          <Route path="/WAS" element={<Sportsball tricode="WAS" />}/>
          <Route path="/*" element={<Sportsball tricode="PHX" />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
