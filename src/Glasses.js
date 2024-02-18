import { Suspense } from "react";

export default function Glasses({ position, rotation, scale, faceModel, glassesColor, hatChoice }) {
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", glassesColor);
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <group position={[0, 0, 0.5 * scale * !faceModel]}>
        <Suspense fallback={null}>
          {glassesColor === 1 && <></>}
          {glassesColor === 2 && <></>}
          {glassesColor === 3 && <></>}
        </Suspense>
      </group>

      {faceModel && (
        <mesh position={[0, 0, -0.75]} scale={[1.1, 1.5, 1.4]}>
          <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
          <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
        </mesh>
      )}
    </group>
  );
}
