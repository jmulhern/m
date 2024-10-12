import { createRoot } from 'react-dom/client';
import App from "./components/sportsball/App";
import './index_sportsball.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
