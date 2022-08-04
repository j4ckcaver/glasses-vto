import { Asset, ThreekitSource } from '@threekit/lignin';
import { Suspense } from 'react'

export default function Hat({ position, rotation, scale, faceModel, hatChoice, nose }) {

    return (
        <group>
            <ThreekitSource env="preview" org="bhouston" token="088f77bd-a2f3-4294-b781-a943151a2a2d">
                <group position={position} scale={scale} rotation={rotation}>

                    <Suspense fallback={null}>

                        {hatChoice === 1 &&
                            <group>
                                <group scale={0.06} position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
                                    <Asset id={'507aaee7-6c79-4467-8650-6122c70672e2'} />
                                </group>

                                <mesh position={[0, -0.5, -0.65]} scale={[1.05, 1.6, 1.5]} >
                                    <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                                    <meshStandardMaterial attach="material" color="black" opacity={0} depthWrite="true" />
                                </mesh>
                            </group>}

                        {hatChoice === 2 &&
                            <group>
                                <group scale={0.051} position={[0, -0.12, 0.09]} rotation={[0, 0, 0]}>
                                    <Asset id={'8ddc932d-1335-4a45-84d5-13984d64c8da'} />
                                </group>

                                <mesh position={[0, -0.5, -0.65]} scale={[0.85, 1.45, 1.5]} >
                                    <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                                    <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
                                </mesh>
                            </group>}

                        {hatChoice === 3 &&
                            <group>
                                <group scale={0.056} position={[0, -0.16, -0.11]} rotation={[0, 0, 0]}>
                                    <Asset id={'59d2c2f6-0afe-4793-8cb2-9ee6f98cb1de'} />
                                </group>

                                <mesh position={[0, -0.5, -0.65]} scale={[1.05, 1.6, 1.4]} >
                                    <sphereGeometry attach="geometry" args={[0.5, 32, 16]} />
                                    <meshBasicMaterial attach="material" color="black" opacity="0" depthWrite="true" />
                                </mesh>
                            </group>}


                    </Suspense>
                </group>
            </ThreekitSource>

        </group>
    )
}