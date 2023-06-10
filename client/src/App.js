import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Contacts } from "./components/Contacts";
import { Skills } from "./components/Skills";
import { Hobby } from "./components/Hobby";

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="skills" element={<Skills />}></Route>
          <Route path="hobby" element={<Hobby />}></Route>
          <Route path="contact" element={<Contacts />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
