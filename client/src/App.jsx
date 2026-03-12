import { BrowserRouter,Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/public/HomePage";
import { Gallery } from "./pages/public/Gallery";

export function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};