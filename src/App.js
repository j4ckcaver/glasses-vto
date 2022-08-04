import React, { useState, useEffect, useRef, Suspense, useMemo, message } from "react";
import "./styles.css";
import Webcam from "react-webcam";

import "@mediapipe/hands";
import logo from "./resources/logo.png";


import * as MediaPipeFace from "@mediapipe/face_mesh";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FacePoints from "./FacePoints";
import Scroller from "./Scoller.js"
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

let videoWidth = 480,
  videoHeight = 360;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

let isMirrored = true;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("mirror") === "false") { isMirrored = false }

export default function App() {
  const [splashScreen, setSplashScreen] = useState(true);
  const [prediction, setPrediction] = useState({});
  const [glassesColor, setGlassesColor] = useState("00ff00")

  const message = useRef();
  const webcamRef = useRef();
  const offScreenCanvasRef = useRef();
  const displayCanvasRef = useRef();
  const croppedCanvasRef = useRef();

  const videoAspect = videoWidth / videoHeight;

  let face = useMemo(() => {
    const face = new MediaPipeFace.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`,
    });
    console.log(face)
    face.setOptions({
      minDetectionConfidence: 0.9,
      minTrackingConfidence: 0.9,
      maxNumFaces: 2,
      refineLandmarks: true
    });
    face.onResults(setPrediction);

    return face;
  }, ["face"]);


  let sendToFace = () => {
    let video = webcamRef.current.video;

    videoHeight = video.videoHeight;
    videoWidth = video.videoWidth;

    const offscreenCanvas = offScreenCanvasRef.current;
    const offScreenCtx = offscreenCanvas.getContext("2d");

    const croppedCanvas = croppedCanvasRef.current;
    const croppedCanvasCtx = croppedCanvas.getContext("2d");

    const width = croppedCanvas.height * videoAspect;
    const left = (croppedCanvas.width - width) * 0.5
    const top = 0;
    const height = croppedCanvas.height;
    croppedCanvasCtx.drawImage(video, left, top, width, height)

    offScreenCtx.drawImage(video, 0, 0);
    face.send({ image: croppedCanvas });
    if (splashScreen && prediction.image) {
      setSplashScreen(false);
    }

  };

  useEffect(() => {
    if (prediction.image !== undefined) {
      const offscreenCanvas = offScreenCanvasRef.current;
      const displayCtx = displayCanvasRef.current.getContext("2d");
      if (offscreenCanvas.height !== 0) {
        displayCtx.drawImage(offscreenCanvas, 0, 0, videoWidth, videoHeight);
      }
      setTimeout(() => {
        sendToFace();
      }, 10);
    }
  }, [prediction]);


  return (
    <div className="App">
      {splashScreen && (
        <div className="Outer">
          <img className="Preview_image" src={logo} alt="" />
        </div>
      )}

      <Webcam
        style={{ position: "absolute", height: "1px", width: "1px", top: "0px" }}
        height={720}
        width={1280}
        ref={webcamRef}
        onUserMedia={() => {
          sendToFace();
        }}
        videoConstraints={videoConstraints}
      />



      {/* <div className="OuterDiv">
        <canvas className="Canvas" ref={displayCanvasRef} width={videoWidth} height={videoHeight} />
      </div> */}

      <div className="OuterDiv" style={{ transform: `scaleX(${-1 * isMirrored + 1 * !isMirrored})`, zIndex: "-101" }}>
        <canvas className="Canvas" ref={displayCanvasRef} width={videoWidth} height={videoHeight} />
      </div>
      <div style={{ display: "none" }} >
        <canvas ref={offScreenCanvasRef} width={videoWidth} height={videoHeight} />
      </div>
      <div style={{ display: "none" }} >
        <canvas ref={croppedCanvasRef} width={videoHeight} height={videoHeight} />
      </div>

      {!splashScreen && <Scroller setGlassesColor={setGlassesColor} />}

      <div style={{ position: "absolute", height: "100%", width: "100%", top: "0px", transform: `scaleX(${-1 * isMirrored + 1 * !isMirrored})` }}>
        <div style={{ marginLeft: "50%", width: `${window.innerHeight * videoWidth / videoHeight}px`, height: `${window.innerHeight}px`, transform: "translateX(-50%)" }}>

          <Canvas

            onCreated={({ camera }) => {
              camera.left = -0.5 * videoAspect;
              camera.right = 0.5 * videoAspect;
              camera.top = 0.5;
              camera.bottom = -0.5;
              camera.lookAt(0, 0, 1);
              camera.updateProjectionMatrix();
            }}

            orthographic
            camera={{
              near: -300,
              far: 300,
              position: [0, 0, -0.5],
            }}>

            <Suspense fallback={null}>
              <Environment
                background={false}
                files={"warehouse.hdr"}
                path="./resources/"
              />
            </Suspense>
            <ambientLight intensity={0.3} />
            <FacePoints faceData={prediction.multiFaceLandmarks} aspect={videoAspect} glassesColor={glassesColor} message={message} />
          </Canvas>

        </div>
      </div>
      <div style={{ position: "absolute", marginLeft: "50%", transform: "translateX(-50%)", top: "10vh" }}>
        <h1 style={{ color: "white" }}>{message.current}</h1>
      </div>

    </div>
  );
}
