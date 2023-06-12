import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Contacts } from "./components/Contacts";
import { Skills } from "./components/Skills";
import { Hobby } from "./components/Hobby";

//При переходе, каждая страница открывается сверху
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

function App() {
  return (
    <>
      <Main></Main>
    </>
  );
}

const Main = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="skills" element={<Skills />}></Route>
            <Route path="hobby" element={<Hobby />}></Route>
            <Route path="contact" element={<Contacts />}></Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
