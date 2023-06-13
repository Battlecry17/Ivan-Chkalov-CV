import React from "react";
import { useState, useEffect } from "react";
import { SectionDouble } from "./Layout";
import { IconPhone, IconTelegram, IconEmail, IconSend } from "./SVG";

const Contacts = () => {
  return (
    <>
      <SectionDouble
        secClass={"grid-double"}
        title1={"Find me"}
        content1={
          <div className="centerWrap">
            <Info
              icon={<IconPhone></IconPhone>}
              title={"Call"}
              text={"+998908052695"}
            ></Info>
            <Info
              icon={<IconTelegram></IconTelegram>}
              title={"Write"}
              text={"@IvanyanTelegram"}
            ></Info>
            <Info
              icon={<IconEmail></IconEmail>}
              title={"Email"}
              text={"chkalovivan998@gmail.com"}
            ></Info>
          </div>
        } //section 1, section 2
        title2={"Message me"}
        content2={
          <>
            <Form></Form>
          </>
        }
      ></SectionDouble>
    </>
  );
};

const Info = ({ icon, title, text }) => {
  const [arrowImage, setArrowImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("arrowImage");
    if (storedImage) {
      setArrowImage(storedImage);
    } else {
      const fetchAndStoreImage = async () => {
        try {
          const response = await fetch("/arrow-left.png");
          const blob = await response.blob();

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            localStorage.setItem("arrowImage", base64Image);
            setArrowImage(base64Image);
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error fetching and storing image:", error);
        }
      };

      fetchAndStoreImage();
    }
  }, []);

  return (
    <div className="infoCBlock">
      {icon}
      <img src={arrowImage} className="arrow_img"></img>
      <div className="imagesContent">
        <h2>{title}</h2>
        <div>
          <p
            onClick={() => {
              navigator.clipboard.writeText(text);
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompanyName = ({ formData, handleInputChange }) => {
  return (
    <div className="item1">
      <label htmlFor="companyName">Company name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        minLength={3}
        required
      />
    </div>
  );
};

const ContactEmail = ({ formData, handleInputChange }) => {
  return (
    <div className="item3">
      <label htmlFor="companyEmail">Contact email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
        required
      ></input>
    </div>
  );
};

const ContactNumber = ({ formData, setFormData, handleInputChange }) => {
  const handleInputNum = (e) => {
    if (/^[0-9\b\+]+$/.test(e.target.value)) {
      // проверяем, что введенное значение является числом
      handleInputChange(e);
    }
  };

  return (
    <div className="item2">
      <label htmlFor="companyNumber">Contact number</label>
      <input
        type="text"
        id="number"
        name="number"
        value={formData.number}
        onFocus={() => {
          (formData.number === null || formData.number === "") &&
            setFormData({
              ...formData,
              number: "+",
            });
        }}
        // если в поле только плюсик, стирать его
        onBlur={() => {
          formData.number === "+" &&
            setFormData({
              ...formData,
              number: "",
            });
        }}
        onChange={(e) => handleInputNum(e)}
      ></input>
    </div>
  );
};

const TextArea = ({ formData, handleInputChange }) => {
  return (
    <div className="item4">
      <label htmlFor="message">Message</label>
      <textarea
        type="text"
        id="text"
        name="text"
        value={formData.text}
        onChange={handleInputChange}
        minLength={50} // требование на минимум 50 символов
        required
      ></textarea>
    </div>
  );
};

const SubmitB = ({ statusText }) => {
  return (
    <div className="item5">
      <ButtonSend></ButtonSend>
      <p id="response">{statusText}</p>
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    text: "",
  });

  const showDelivered = (status) => {
    status === 200
      ? setStatusT("Message has been delivered")
      : status === 500
      ? setStatusT("Server is currently unavailable...")
      : setStatusT("Unknown error occured");
    setTimeout(() => {
      setStatusT("");
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://ivan-cv.fly.dev/api/formdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        showDelivered(response.status);
        resetInputs();
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    // uppercase для textfield
    e.target.name === "text" &&
      (e.target.value =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    localStorage.setItem(e.target.name, e.target.value);
  };

  const resetInputs = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      text: "",
    });
  };

  useEffect(() => {
    //вытянуть сохраненные в браузере данные
    setFormData({
      name: localStorage.getItem("name"),
      number:
        localStorage.getItem("number") === "+"
          ? ""
          : localStorage.getItem("number"),
      email: localStorage.getItem("email"),
      text: localStorage.getItem("text"),
    });
  }, []);

  const [statusText, setStatusT] = useState();

  return (
    <form className="grid-container1" onSubmit={handleSubmit}>
      <CompanyName formData={formData} handleInputChange={handleInputChange} />
      <ContactNumber
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
      />
      <ContactEmail formData={formData} handleInputChange={handleInputChange} />
      <TextArea formData={formData} handleInputChange={handleInputChange} />
      <SubmitB statusText={statusText} />
    </form>
  );
};

const ButtonSend = () => {
  const [sendC, setSendC] = useState("Send an offer");
  return (
    <button
      // onClick={sendOffer}
      onMouseEnter={() => setSendC(<IconSend classN={"send_svg"}></IconSend>)}
      onMouseLeave={() => setSendC("Send an offer")}
      type="submit"
    >
      {sendC}
    </button>
  );
};

export { Contacts };
