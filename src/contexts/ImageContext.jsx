import React, { useState, createContext } from "react";
const ImageContext = createContext();

export default ImageContext;

export const ImageContextProvider = (props) => {
  //   const [] = useState();
  let [savedGallery, setSavedGallery] = useState([]);
  let [imageIndex, setImageIndex] = useState(-1);
  let [isCanvasActive, setIsCanvasActive] = useState(false);
  const [picture, setPicture] = useState("");
  function deleteImage(index) {
    setSavedGallery((preImg) => preImg.filter((img, idx) => idx !== index));
  }
  const handleRetake = () => {
    setPicture(""); // Reset the picture state to an empty string
    setIsCanvasActive(false);
  };
  function drawImage(img, idx) {
    setIsCanvasActive(true);
    setImageIndex(idx);
    console.log(savedGallery[idx]);
  }

  return (
    <ImageContext.Provider
      value={{
        savedGallery,
        setSavedGallery,
        imageIndex,
        setImageIndex,
        isCanvasActive,
        setIsCanvasActive,
        picture,
        setPicture,
        deleteImage,
        handleRetake,
        drawImage,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};
