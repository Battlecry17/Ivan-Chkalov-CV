import React from "react";
import { useState, useEffect, useRef } from "react";
import { Section } from "./Layout";
import {
  IconStress,
  IconFlexibility,
  IconResponsibility,
  IconSelfOrganization,
  IconWillingnessToLearn,
  IconAttentionToDetail,
  IconMultitask,
  IconFriendliness,
  IconIntroversion,
} from "./SVG";

const Skills = () => {
  return (
    <>
      <Section
        title={"Coding Knowledge"}
        divClass={"grid-triple"}
        content={
          <>
            <Coding
              title={"Worked with"}
              img={"/skill/job.png"}
              text={[
                "HTML & CSS",
                "Bootstrap",
                "Javascript",
                "React",
                "Jquery",
                "Node JS",
                "Rest API",
                "MYSQL",
                "Photoshop",
                "Figma",
              ]}
            ></Coding>
            <Coding
              title={"Studied"}
              img={"/skill/study.png"}
              text={["Typescript", "MongoDB", "Java", "C#"]}
            ></Coding>
            <Coding
              title={"Hobby"}
              img={"/skill/hobby.png"}
              text={["Unreal Engine", "C++", "Unity"]}
            ></Coding>
          </>
        }
      ></Section>
      <Section
        title={"Languages knowledge"}
        divClass={"grid-double gap_50"}
        content={
          <>
            <Language name={"English"} level={"c1"}></Language>
            <Language name={"Russian"} level={"c2"}></Language>
            <Language name={"Uzbek"} level={"b1"}></Language>
            <Language name={"German"} level={"b1"}></Language>
            <Language name={"Japanese"} level={"a1"}></Language>
            <Language name={"Latvian"} level={"a1"}></Language>
          </>
        }
      ></Section>
      <Section
        title={"Additional skills"}
        divClass={"grid-triple add_grid"}
        content={
          <>
            <Additional></Additional>
          </>
        }
      ></Section>
    </>
  );
};

const Language = ({ name, level }) => {
  const [visible, setVisible] = useState("visible");

  const LanguageFields = ({ className }) => {
    return (
      <fieldset
        className={className + (className === level ? " " + visible : "")}
        onMouseEnter={(e) => {
          !e.currentTarget.className.includes("visible") && setVisible("");
        }}
      ></fieldset>
    );
  };

  return (
    <div onMouseLeave={() => setVisible("visible")}>
      <h1 className="lang_t">{"|" + name + "|"}</h1>
      <div>
        <LanguageFields className={"a1"}></LanguageFields>
        <LanguageFields className={"a2"}></LanguageFields>
        <LanguageFields className={"b1"}></LanguageFields>
        <LanguageFields className={"b2"}></LanguageFields>
        <LanguageFields className={"c1"}></LanguageFields>
        <LanguageFields className={"c2"}></LanguageFields>
      </div>
    </div>
  );
};

const Coding = ({ title, text }) => {
  //кеширование изображения
  const [dotImage, setDotImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("dotImage");
    if (storedImage) {
      setDotImage(storedImage);
    } else {
      const fetchAndStoreImage = async () => {
        try {
          const response = await fetch("/dot.png");
          const blob = await response.blob();

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            localStorage.setItem("dotImage", base64Image);
            setDotImage(base64Image);
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error fetching and storing image:", error);
        }
      };

      fetchAndStoreImage();
    }
  }, []);

  const List = ({ item, index }) => {
    return (
      <>
        <div className="item_study" style={{ gridRowStart: index }}>
          <img className="coding_icons" src={dotImage}></img>
          <p className="coding_h3">{item}</p>
        </div>
      </>
    );
  };

  return (
    <div className="div_coding">
      <h1 className="coding_h">{title}</h1>
      <hr></hr>
      <div className="grid-study">
        {text.map((element, index) => {
          return <List item={element} index={index + 1}></List>;
        })}
      </div>
    </div>
  );
};

const Additional = () => {
  let add_skills = [
    {
      img: <IconAttentionToDetail classN={"add_svg"}></IconAttentionToDetail>,
      title: "Attention to details",
      text: "Notice every element out of place, and make things perfect, providing enough time",
    },
    {
      img: <IconFlexibility classN={"add_svg"}></IconFlexibility>,
      title: "Flexibility",
      text: "Used to hearing other people and working in changing environment",
    },
    {
      img: <IconWillingnessToLearn classN={"add_svg"}></IconWillingnessToLearn>,
      title: "Willingness to learn",
      text: "Have passion for IT, and for the past 5 years became familiar with aspects of it, starting from Java and ending up with Unreal Engine",
    },
    {
      img: <IconMultitask classN={"add_svg"}></IconMultitask>,
      title: "Multitasking",
      text: "Been managing work on several tasks at the same time for several years",
    },
    {
      img: <IconResponsibility classN={"add_svg"}></IconResponsibility>,
      title: "Responsibility",
      text: "Treat all of the given task with the maximum output and making them in time",
    },
    {
      img: <IconSelfOrganization classN={"add_svg"}></IconSelfOrganization>,
      title: "Self-organization",
      text: "Had experience with remote work for quite some time and never had any issues with deadlines and self-control",
    },
    {
      img: <IconIntroversion classN={"add_svg"}></IconIntroversion>,
      title: "Critical thinking",
      text: "Solve emerging problems using logic and by analizing positive and negative side of the each approach",
    },
    {
      img: <IconStress classN={"add_svg"}></IconStress>,
      title: "Stress resistance",
      text: "Worked as a community manager, communicating with different player's, sorting in-game issues and working with complaints",
    },
    {
      img: <IconFriendliness classN={"add_svg"}></IconFriendliness>,
      title: "Friendliness",
      text: "Keep good relationships with people around me based on respect and understanding",
    },
  ];

  const Skills_Item = ({ img, title, text }) => {
    const inputRef = useRef();

    const [Rotate, setRotate] = useState({
      x: "0deg",
      y: "0deg",
    });

    function handleMouseMove(e) {
      const middleX =
        inputRef.current.getBoundingClientRect().left +
        inputRef.current.getBoundingClientRect().width / 2;
      const middleY =
        inputRef.current.getBoundingClientRect().top +
        inputRef.current.getBoundingClientRect().height / 2;

      const pWidth = (middleX / document.documentElement.clientWidth) * 100;
      const xDegree = pWidth > 70 ? 90 : pWidth > 50 ? 60 : 30;

      const offsetX = ((e.clientX - middleX) / middleX) * xDegree + "deg";
      const offsetY = -1 * ((e.clientY - middleY) / middleY) * 30 + "deg";

      setRotate({ x: offsetX, y: offsetY });
    }

    return (
      <>
        <div
          className="rotate"
          ref={inputRef}
          style={{ "--rotateX": Rotate.x, "--rotateY": Rotate.y }}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div>{img}</div>
          <h1 className="add_h2">{title}</h1>
          <p>{text}</p>
        </div>
      </>
    );
  };

  return (
    <>
      {add_skills.map(({ img, title, text }) => {
        return <Skills_Item img={img} title={title} text={text}></Skills_Item>;
      })}
    </>
  );
};

export { Skills };
