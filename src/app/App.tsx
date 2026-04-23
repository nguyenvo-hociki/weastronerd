import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import News from "../pages/News";
import EddieP from "../pages/EddieP";
import Julun from "../pages/Julun";
import Kin6 from "../pages/Kin6";
import Leo from "../pages/Leo";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/eddie-p" element={<EddieP />} />
        <Route path="/artists/julun" element={<Julun />} />
        <Route path="/artists/kin6" element={<Kin6 />} />
        <Route path="/artists/leo" element={<Leo />} />
        <Route path="/albums" element={<Albums />} />s
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}