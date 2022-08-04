export default function Point({ position, scale }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.003, 30, 30]} />
      <meshPhongMaterial color="cyan" />
    </mesh>
  );
}
