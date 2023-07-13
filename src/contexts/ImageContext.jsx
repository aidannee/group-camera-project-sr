import React, { useState, createContext } from "react";
const ImageContext = createContext();

export default ImageContext;

export const ImageContextProvider = (props) => {
  let [savedGallery, setSavedGallery] = useState([]);
  let [imageIndex, setImageIndex] = useState(-1);
  let [isCanvasActive, setIsCanvasActive] = useState(false);

  return (
    <ImageContext.Provider
      value={{
        savedGallery,
        setSavedGallery,
        imageIndex,
        setImageIndex,
        isCanvasActive,
        setIsCanvasActive,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};
