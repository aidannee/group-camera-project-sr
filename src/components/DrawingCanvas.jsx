import React, { useState, useRef, useEffect, useContext } from "react";
import ImageContext from "../contexts/ImageContext";

const DrawingCanvas = ({ image }) => {
  let context = null;

  const { savedGallery, setSavedGallery, imageIndex, setIsCanvasActive } =
    useContext(ImageContext);

  const canvasRef = useRef(null);
  const [canvasLineWidth, setCanvasLineWidth] = useState(1);
  const [canvasLineColor, setCanvasLineColor] = useState("#ffff");
  let isDrawing = false;

  const drawingData = []; // Store drawing data

  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.lineJoin = "round";
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dataUrl = canvas.toDataURL(); // Store the current drawing as an image
      canvas.width = width;
      canvas.height = height;
      const imageObj = new Image();
      imageObj.onload = () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(imageObj, 0, 0, width, height);
      };
      imageObj.src = image;
    };
    const redrawImage = () => {
      drawingData.forEach((point) => {
        const { x, y } = point;
        context.lineTo(x, y);
        context.stroke();
      });
    };
    resizeCanvas();
    redrawImage();
    window.addEventListener("resize", resizeCanvas);
  }, [image]);

  const startDrawing = (e) => {
    context = canvasRef.current.getContext("2d");
    isDrawing = true;
    context.strokeStyle = canvasLineColor;

    console.log(canvasLineColor);
    context.lineWidth = canvasLineWidth;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  const continueDrawing = (e) => {
    context = canvasRef.current.getContext("2d");

    if (!isDrawing) return;

    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };
  const stopDrawing = () => {
    isDrawing = false;
  };
  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    const updateEditingImg = [...savedGallery];
    updateEditingImg[imageIndex] = dataUrl;
    setSavedGallery(updateEditingImg);
    setIsCanvasActive(false);
  };
  return (
    <div className=" flex flex-col justify-center items-center">
      <input
        type="color"
        id="color"
        value={canvasLineColor}
        onChange={(e) => {
          setCanvasLineColor(e.target.value);
          console.log(e.target.value);
        }}
      />

      <input
        type="number"
        min={1}
        value={canvasLineWidth}
        max={20}
        onChange={(e) => {
          setCanvasLineWidth(parseInt(e.target.value));
        }}
        className=" p-2 bg-blue-400 text-white font-bold text-2xl text-center"
      />
      <canvas
        key={image}
        className="aspect-auto w-[500px] h-[500px] "
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <button className="bg-blue-400 px-4 py-2 m-4" onClick={saveCanvasImage}>
        Save Image
      </button>
    </div>
  );
};
export default DrawingCanvas;
