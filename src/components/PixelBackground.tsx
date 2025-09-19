import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

const PixelCloud = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  
  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshBasicMaterial color="#B8C5D6" />
      </mesh>
    </Float>
  );
};

const PixelTree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshBasicMaterial color="#8B4513" />
      </mesh>
      {/* Tree leaves */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

const StaticSparkles = () => {
  const sparklePositions = [
    [-6, 2, -1],
    [4, 3, -2],
    [-2, 4, -1],
    [7, 1, -3],
    [-8, 3, -2],
    [5, 5, -1]
  ];

  return (
    <>
      {sparklePositions.map((position, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0} floatIntensity={0.2}>
          <mesh position={position as [number, number, number]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const PixelBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-sky" />
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={1} />
        
        <Stars 
          radius={30} 
          depth={20} 
          count={50} 
          factor={2} 
          saturation={0} 
          fade={false}
        />
        
        {/* Clean cloud layout */}
        <PixelCloud position={[-6, 3, -2]} />
        <PixelCloud position={[6, 3.5, -3]} />
        <PixelCloud position={[-2, 4, -1]} />
        <PixelCloud position={[8, 2, -4]} />
        
        {/* Ground level trees */}
        <PixelTree position={[-8, -2, -2]} />
        <PixelTree position={[8, -2, -3]} />
        
        {/* Static sparkles with gentle float */}
        <StaticSparkles />
      </Canvas>
    </div>
  );
};