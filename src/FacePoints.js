import Glasses from "./Glasses.js";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";

import Point from "./Point.js";
import { Suspense } from "react";
import { Text } from "@react-three/drei";
import { Euler, Vector3, Matrix3, Matrix4 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Hat from "./Hat.js"

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {

      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const LEFT_EAR_INDEX = 162;
const RIGHT_EAR_INDEX = 389;
const NOSE_INDEX = 8;
const FOREHEAD_INDEX = 10;

const ResizeHandler = ({ aspect }) => {
  const { camera } = useThree();
  camera.left = -0.5 * aspect;
  camera.right = 0.5 * aspect;
  camera.top = 0.5;
  camera.bottom = -0.5;
  camera.updateProjectionMatrix();

  return null;
}

const ResetCamera = () => {
  const { camera } = useThree();

  useEffect(
    () => {
      camera.position.set(0, 0, -0.5);
      camera.rotation.set(Math.PI, 0, Math.PI);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
    },
    [camera]
  );
  return null;
}

export default function HandPoints({ faceData, aspect, glassesColor, message }) {
  function convertPoseToWorld(pose) {
    return new Vector3(-1 * pose.x + 0.5, -1 * pose.y + 0.5, pose.z)
  }

  function keyPointsFromVerticies(verticies) {
    const leftEar = convertPoseToWorld(verticies[LEFT_EAR_INDEX]);
    const nose = convertPoseToWorld(verticies[NOSE_INDEX]);
    const rightEar = convertPoseToWorld(verticies[RIGHT_EAR_INDEX]);
    return [leftEar, nose, rightEar]
  }

  const prevPoints = useRef([new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 0)]);


  if (faceData) {
    const faceVerticies = faceData[0];


    if (faceVerticies) {

      const [currentLeftEar, currentNose, currentRightEar] = keyPointsFromVerticies(faceVerticies);
      let [leftEar, nose, rightEar] = [currentLeftEar, currentNose, currentRightEar];
      const [prevLeftEar, prevNose, PrevRightEar] = prevPoints.current;
      const foreHead = convertPoseToWorld(faceVerticies[FOREHEAD_INDEX]);

      // if (currentNose.distanceTo(prevNose) < 0.0035){
      //   [leftEar, nose, rightEar] = [
      //     new Vector3().addVectors(currentLeftEar.multiplyScalar(0.01), prevLeftEar.multiplyScalar(0.99)), 
      //     new Vector3().addVectors(currentNose.multiplyScalar(0.01), prevNose.multiplyScalar(0.99)), 
      //     new Vector3().addVectors(currentRightEar.multiplyScalar(0.01), PrevRightEar.multiplyScalar(0.99))]
      // }
      prevPoints.current = [leftEar, nose, rightEar];

      const leftEarToRightEar = new Vector3().subVectors(rightEar, leftEar);
      const noseToLeftEar = new Vector3().subVectors(leftEar, nose).normalize();
      const noseToRightEar = new Vector3().subVectors(rightEar, nose).normalize();
      const yAxis = noseToRightEar.clone().cross(noseToLeftEar);

      const xAxis = leftEarToRightEar.clone().normalize();

      const zAxis = xAxis.clone().cross(yAxis);

      const rotationMatrix = new Matrix4().makeBasis(xAxis, yAxis, zAxis);
      const rotationEuler = new Euler().setFromRotationMatrix(rotationMatrix);
      const distance = leftEarToRightEar.length();

      // const zOnXZ = zAxis.clone().projectOnPlane(new Vector3(0, 1, 0))
      const worldZAxis = new Vector3(0, 0, -1)
      // const turnAngle = (zOnXZ.angleTo(worldZAxis) * 180 / Math.PI)
      // const zOnXY= zAxis.clone().projectOnPlane(new Vector3(1, 0, 0))
      // const tiltAngle = (zOnXY.angleTo(worldZAxis) * 180 / Math.PI)
      const angle = zAxis.angleTo(worldZAxis) * 180 / Math.PI


      let showGlasses = true;
      message.current = ""
      if (angle > 30) {
        showGlasses = false;
        message.current = "Look At Camera"
      }

      return (
        <group>
          {/* {faceData[0].map((landmark, index) => (
            <group>
              <Point
                position={
                  convertPoseToWorld( new Vector3(landmark.x, landmark.y, landmark.z))
                }
                key={index}
              />          
              <Text
              scale={[0.13, 0.13, 0.13  ]}
              position={[
                (-1 * landmark.x + 0.5),
                -1 * landmark.y + 0.5,
                landmark.z
              ]}
              color="black" // default
              anchorX="middle" // default
              anchorY="middle" // default
              >
                {index}
              </Text>
            </group>
          ))} */}

          {/* <arrowHelper args={[yAxis, nose, 0.3, "red"]}/>
          <arrowHelper args={[xAxis, nose, 0.3, "blue"]}/>
          <arrowHelper args={[zAxis, nose, 0.3, "blue"]}/>
          <Point position={nose} />
          <Point position={rightEar} />
          <Point position ={leftEar} /> */}

          <ResetCamera />
          {showGlasses && <Suspense fallback={null}>
            <Glasses position={nose} rotation={rotationEuler} scale={distance} faceModel={true} glassesColor={glassesColor} />
            {/* <Hat position={foreHead} rotation={rotationEuler} scale={distance} faceModel={true} hatChoice={glassesColor} nose={nose} /> */}
          </Suspense>}

          {!showGlasses && <Suspense fallback={null}>
            {/* <Glasses position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={0.3} faceModel={false} glassesColor={glassesColor}/> */}
          </Suspense>}
          <ResizeHandler aspect={aspect} />
        </group>
      );
    } else {
      message.current = "Look At Camera"
      return (
        <group>
          <CameraController />
          <Suspense fallback={null}>
            {/* <Glasses position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={0.3} faceModel={false} glassesColor={glassesColor}/> */}
          </Suspense>
          <ResizeHandler aspect={aspect} />
        </group>
      );
    }
  } else {
    return null;
  }
}
