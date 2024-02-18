import { Suspense } from "react";

export default function Hat({ position, rotation, scale, faceModel, hatChoice, nose }) {
  return (
    <group>
      <group position={position} scale={scale} rotation={rotation}>
        <Suspense fallback={null}>
          {hatChoice === 1 && (
            <group>
              <group scale={0.06} position={[0, 0, -0.15]} rotation={[0, 0, 0]}></group>

              <mesh position={[0, -0.5, -0.65]} scale={[1.05, 1.6, 1.5]}>
                <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                <meshStandardMaterial attach="material" color="black" opacity={0} depthWrite="true" />
              </mesh>
            </group>
          )}

          {hatChoice === 2 && (
            <group>
              <group scale={0.051} position={[0, -0.12, 0.09]} rotation={[0, 0, 0]}></group>

              <mesh position={[0, -0.5, -0.65]} scale={[0.85, 1.45, 1.5]}>
                <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
              </mesh>
            </group>
          )}

          {hatChoice === 3 && (
            <group>
              <group scale={0.056} position={[0, -0.16, -0.11]} rotation={[0, 0, 0]}></group>

              <mesh position={[0, -0.5, -0.65]} scale={[1.05, 1.6, 1.4]}>
                <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
              </mesh>
            </group>
          )}
        </Suspense>
      </group>
    </group>
  );
}
