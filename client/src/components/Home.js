import React, { useState, useEffect } from "react";
import { Section, SectionDouble } from "./Layout";
import { DownloadButton } from "./DownloadB";

const Home = () => {
  return (
    <>
      <AboutMe />
      <ExpEdu />
      <Portfolio />
    </>
  );
};

const Avatar = () => {
  //кеширование изображения
  const [avatarImage, setAvatarImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("avatarImage");
    if (storedImage) {
      setAvatarImage(storedImage);
    } else {
      const fetchAndStoreImage = async () => {
        try {
          const response = await fetch("/avatar.png");
          const blob = await response.blob();

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            localStorage.setItem("avatarImage", base64Image);
            setAvatarImage(base64Image);
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error fetching and storing image:", error);
        }
      };

      fetchAndStoreImage();
    }
  }, []);

  return <img src={avatarImage} id="avatar" alt="" />;
};

const AboutMe = () => {
  let description =
    "Full stack web developer with more than 5 years of experience in the IT field, have deep understating of the IT industry, knowledge of both server and client sides. Developed dozens of systems for GTA 5 RP project, based on web programming. I have work experience both in the team and by myself. I have organized my and the work of the staff for the last four years with great success. Provided solutions to the project issues with the best benefit for each side. Always ask myself, what improvements can I make both for the project and for me personally, what can I do better and how. Out of work, I am curios open-minded person, interested in different aspects of life. Passionate about building high-quality world-class web applications.";

  return (
    <Section
      title={"About me"}
      divClass={"aboutFlex"}
      content={
        <>
          <div className="ava_border">
            {/* <img src="/avatar.png" id="avatar" alt="" /> */}
            <Avatar></Avatar>
            <div>
              <DownloadButton></DownloadButton>
            </div>
          </div>
          <div id="aboutText">
            <h2>Hi, I am Ivan.</h2>
            <p
              onClick={() => {
                navigator.clipboard.writeText(description);
              }}
            >
              {description}
            </p>
            <ul className="age_info">
              <li>
                <strong>Age: </strong>24
              </li>
              <li>
                <strong>Job: </strong>Web developer
              </li>
              <li>
                <strong>Place of birth: </strong>Tashkent, Uzbekistan
              </li>
            </ul>
          </div>
        </>
      }
    ></Section>
  );
};

const ExpEdu = () => {
  return (
    <SectionDouble
      secClass={"grid-double"}
      title1={"Experience"}
      title1_class={"eduexp_head"}
      content2={
        <div className="centerWrap">
          <DateItem
            addClass={"violet_border"}
            date={"2005 - 2014"}
            title={"School 60"}
            info={"Secondary school"}
          />
          <DateItem
            addClass={"violet_border"}
            date={"2014 - 2017"}
            title={"Uzbekistan State World Languages University Lyceum №2"}
            info={"Faculty of of Engineering Sciences"}
          />
          <DateItem
            addClass={"violet_border"}
            date={"2017 - 2021"}
            title={"Riga Technical University"}
            info={"Faculty of Computer Science and Information Technologies"}
          />
          <DateItem
            addClass={"violet_bot"}
            date={"2018 - 2022"}
            title={"Udemy courses"}
            info={"HTML, CSS, Javascript, JQuery, NodeJS, React"}
          />
        </div>
      }
      title2={"Education"}
      content1={
        <div className="centerWrap">
          <DateItem
            addClass={"violet_border"}
            date={"2019 - 2021"}
            title={"Egames software"}
            info={"Administrator and Community manager"}
          />
          <DateItem
            addClass={"violet_bot"}
            date={"2021 - 2023"}
            title={"Egames software"}
            info={"Frontend developer, fullstack developer"}
          />
        </div>
      }
    ></SectionDouble>
  );
};

const Portfolio = () => {
  return (
    <Section
      title={"Portfolio"}
      divClass={"grid-double"}
      content={
        <>
          <Website
            link={"https://www.google.com/"}
            title={"Api search"}
            background={"web1"}
          ></Website>
          <Website
            link={"https://www.google.com/"}
            title={"GTA systems example"}
            background={"web2"}
          ></Website>
          <Website
            link={""}
            title={"Old projects"}
            projects="1"
            background={"web3"}
          ></Website>
          <Website
            link={""}
            title={"To be added..."}
            background={"web4"}
          ></Website>
        </>
      }
    ></Section>
  );
};

const Website = ({ link, title, projects, background }) => {
  const projectsL = [
    {
      title: "Budget counter",
      link: "https://battlecry17.github.io/Budget-counter/",
    },
    { title: "Pig game", link: "https://battlecry17.github.io/PigGame/" },
    {
      title: "Startup HTML",
      link: "https://battlecry17.github.io/StartupHTMLExample/",
    },
    {
      title: "Personal website",
      link: "https://battlecry17.github.io/Personal-website-old/",
    },
    {
      title: "First resume",
      link: "https://battlecry17.github.io/FirstResume/",
    },
    { title: "Review HTML", link: "https://battlecry17.github.io/FirstHTML/" },
  ];

  const Weblinks = ({ link, title }) => {
    return (
      <a href={link} className="webB">
        {title}
      </a>
    );
  };

  return (
    <div className="portfoliosite" id={background}>
      <div className="hoverpanel">
        {projects !== undefined ? (
          <div className="linksB">
            <h2 className="linksH">Old projects</h2>
            {projectsL.map((item) => {
              return <Weblinks link={item.link} title={item.title}></Weblinks>;
            })}
          </div>
        ) : (
          <a href={link}>
            <h2>{title}</h2>
          </a>
        )}
      </div>
    </div>
  );
};

const DateItem = ({ addClass, date, title, info }) => {
  return (
    <div className={"date_item " + addClass}>
      <div className="date_it_info">
        <h5 className="date">{date}</h5>
        <h2>{title}</h2>
        <p>{info}</p>
      </div>
    </div>
  );
};

export { Home };
