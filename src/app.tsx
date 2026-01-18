import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./pages/Game";
import { Print } from "./pages/Print";

export const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </BrowserRouter>
    <footer className="app-footer">
      <small>
        Luís Silva, Feb. 2021 | &nbsp;
        <a
          href="https://github.com/luism-s/jogo-do-24"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </small>
    </footer>
  </div>
);
