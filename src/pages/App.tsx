import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Webcomic from "./Webcomic";
import ErrorPage from "./Error";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="webcomic" element={<Webcomic />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
