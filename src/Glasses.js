import { Suspense } from "react";
import { Asset, ThreekitSource } from '@threekit/lignin';

export default function Glasses({ position, rotation, scale, faceModel, glassesColor, hatChoice }) {
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", glassesColor)
  return (
    <group position={position} scale={scale} rotation={rotation} >
      <ThreekitSource env="preview" token="088f77bd-a2f3-4294-b781-a943151a2a2d">
        <group position={[0, 0, 0.5 * scale * !faceModel]}>
          <Suspense fallback={null} >
            {glassesColor === 1 &&

              <Asset id={'846daa4b-e26e-4c93-bd39-f44df57c3427'} configuration={{
                "Glass Lens Color": {
                  "assetId": "a8d84e77-c69d-465f-a6ca-f4221bd0f927",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Side Mat": {
                  "assetId": "f97759dd-f144-4782-b69f-b55e9664cd27",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Front MAT": {
                  "assetId": "dad61afa-c9f1-44b1-881c-482938649d29",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Metal": {
                  "assetId": "0490c1eb-c173-450f-bddb-286e48353f74",
                  "configuration": "",
                  "type": "item"
                }
              }} />}
            {glassesColor === 2 &&

              <Asset id={'846daa4b-e26e-4c93-bd39-f44df57c3427'} configuration={{
                "Glass Lens Color": {
                  "assetId": "7ee42a9f-d8d7-466f-8132-c9b51487e503",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Side Mat": {
                  "assetId": "f97759dd-f144-4782-b69f-b55e9664cd27",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Front MAT": {
                  "assetId": "ded4ddd3-9b5c-456b-8588-ea0bc997b60f",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Metal": {
                  "assetId": "0490c1eb-c173-450f-bddb-286e48353f74",
                  "configuration": "",
                  "type": "item"
                }
              }} />}
            {glassesColor === 3 &&

              <Asset id={'846daa4b-e26e-4c93-bd39-f44df57c3427'} configuration={{
                "Glass Lens Color": {
                  "assetId": "549357d6-544b-4d96-a044-d881003e3f5f",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Side Mat": {
                  "assetId": "f97759dd-f144-4782-b69f-b55e9664cd27",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Front MAT": {
                  "assetId": "86b72933-92e9-4502-b447-83224255aad8",
                  "configuration": "",
                  "type": "item"
                },
                "Glasses Metal": {
                  "assetId": "0490c1eb-c173-450f-bddb-286e48353f74",
                  "configuration": "",
                  "type": "item"
                }
              }} />}
          </Suspense>
        </group>
      </ThreekitSource>

      {faceModel && <mesh position={[0, 0, -0.75]} scale={[1.1, 1.5, 1.4]}>
        <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
        <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
      </mesh>}
    </group>
  );
}
