import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import WebcomicMainPage from "./WebcomicMainPage";
import ErrorPage from "./Error";
import ReadComicPage from "./ReadComicPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="webcomic" element={<WebcomicMainPage />} />
        <Route path="/webcomic/:lang/:comic/:chapter/:pageNumber" element={<ReadComicPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
