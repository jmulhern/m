import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from "./Home";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/ATL" element={<Home tricode="ATL" />}/>
          <Route path="/BOS" element={<Home tricode="BOS" />}/>
          <Route path="/BKN" element={<Home tricode="BKN" />}/>
          <Route path="/CHA" element={<Home tricode="CHA" />}/>
          <Route path="/CHI" element={<Home tricode="CHI" />}/>
          <Route path="/CLE" element={<Home tricode="CLE" />}/>
          <Route path="/DAL" element={<Home tricode="DAL" />}/>
          <Route path="/DEN" element={<Home tricode="DEN" />}/>
          <Route path="/DET" element={<Home tricode="DET" />}/>
          <Route path="/GSW" element={<Home tricode="GSW" />}/>
          <Route path="/HOU" element={<Home tricode="HOU" />}/>
          <Route path="/IND" element={<Home tricode="IND" />}/>
          <Route path="/LAC" element={<Home tricode="LAC" />}/>
          <Route path="/LAL" element={<Home tricode="LAL" />}/>
          <Route path="/MEM" element={<Home tricode="MEM" />}/>
          <Route path="/MIA" element={<Home tricode="MIA" />}/>
          <Route path="/MIL" element={<Home tricode="MIL" />}/>
          <Route path="/MIN" element={<Home tricode="MIN" />}/>
          <Route path="/NOP" element={<Home tricode="NOP" />}/>
          <Route path="/NYK" element={<Home tricode="NYK" />}/>
          <Route path="/OKC" element={<Home tricode="OKC" />}/>
          <Route path="/ORL" element={<Home tricode="ORL" />}/>
          <Route path="/PHI" element={<Home tricode="PHI" />}/>
          <Route path="/PHX" element={<Home tricode="PHX" />}/>
          <Route path="/POR" element={<Home tricode="POR" />}/>
          <Route path="/SAC" element={<Home tricode="SAC" />}/>
          <Route path="/SAS" element={<Home tricode="SAS" />}/>
          <Route path="/TOR" element={<Home tricode="TOR" />}/>
          <Route path="/UTA" element={<Home tricode="UTA" />}/>
          <Route path="/WAS" element={<Home tricode="WAS" />}/>
          <Route path="/*" element={<Home tricode="PHX" />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
