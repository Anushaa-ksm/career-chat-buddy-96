import { Canvas } from '@react-three/fiber';
import { Float, Stars, Cloud } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

const PixelCloud = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>
    </Float>
  );
};

const PixelTree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshBasicMaterial color="#8B4513" />
      </mesh>
      {/* Tree leaves */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

const Sparkles = () => {
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={3 + Math.random() * 2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
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
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={100} 
          factor={4} 
          saturation={0} 
          fade={true}
        />
        
        <PixelCloud position={[-8, 3, -2]} />
        <PixelCloud position={[6, 4, -3]} />
        <PixelCloud position={[-3, 5, -1]} />
        <PixelCloud position={[8, 2, -4]} />
        
        <PixelTree position={[-10, -3, -2]} />
        <PixelTree position={[10, -3, -3]} />
        
        <Sparkles />
      </Canvas>
    </div>
  );
};