import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { IconsHome, IconsSkills, IconsHobby } from "./SVG";
import { DownloadButton } from "./DownloadB";

const Layout = () => {
  const [location, setLocation] = useState(
    window.location.pathname.slice(1) || "home"
  );

  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.getElementById(location).classList.add("hovered");
    return () => {
      document.getElementById(location).classList.remove("hovered");
    };
  });

  const Navbar = () => {
    const UpLink = ({ to, id, title }) => {
      return (
        <li>
          <Link to={to} id={id} onClick={() => setLocation(id)}>
            {title}
          </Link>
        </li>
      );
    };

    return (
      <nav>
        {/* <button onClick={() => setIsDarkTheme(!isDarkTheme)}>Click</button> */}
        <ul>
          <UpLink to="/" id="home" title="Home" />
          <UpLink to="/skills" id="skills" title="Skills" />
          <UpLink to="/hobby" id="hobby" title="Hobby" />
          <UpLink to="/contact" id="contact" title="Contact" />
        </ul>
      </nav>
    );
  };

  const Footer = () => {
    return (
      <footer>
        <div className="footerP">
          <p id="copyright">© 2023 Ivan Chkalov. All rights reserved.</p>
        </div>
        <div className="footerIcons">
          {location === "home" ? (
            <IconsHome></IconsHome>
          ) : location === "skills" ? (
            <IconsSkills></IconsSkills>
          ) : location === "hobby" ? (
            <IconsHobby></IconsHobby>
          ) : location === "contact" ? (
            <DownloadButton></DownloadButton>
          ) : (
            ""
          )}
        </div>
      </footer>
    );
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={"main"}>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

const Section = ({ secClass, title, divClass, content }) => {
  return (
    <section className={secClass}>
      <div className="category_title_wrap">
        <h1 className="category_title">{title}</h1>
      </div>
      <div className={divClass}>{content}</div>
    </section>
  );
};

const SectionDouble = ({
  secClass,
  divClass1,
  title1,
  content1,
  divClass2,
  title2,
  content2,
  title1_class,
}) => {
  return (
    <section className={secClass}>
      <div className={divClass1}>
        <div className="category_title_wrap">
          <h1 className={"category_title " + title1_class}>{title1}</h1>
        </div>
        {content1}
      </div>
      <div className={divClass2}>
        <div className="category_title_wrap">
          <h1 className={"category_title " + title1_class}>{title2}</h1>
        </div>
        {content2}
      </div>
    </section>
  );
};

export { Layout, Section, SectionDouble };
