import React, { useState } from "react";
import { IconDownload } from "./SVG";

const DownloadButton = () => {
  const [downloadC, setDownloadC] = useState("Download CV");

  const downloadFile = () => {
    const fileName = "Ivan_Chkalov_CV.pdf";
    fetch(`https://polished-water-5219.fly.dev/api/download/${fileName}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Ошибка загрузки файла");
        }
      })
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={downloadFile}
      onMouseEnter={() =>
        setDownloadC(<IconDownload classN={"download_svg"}></IconDownload>)
      }
      onMouseLeave={() => setDownloadC("Download CV")}
      className="download_b"
    >
      {downloadC}
    </button>
  );
};

export { DownloadButton };
