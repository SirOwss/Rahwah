import React, { useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Building3DViewerProps {
  className?: string;
}

const TargetBuilding = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main building */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* Adjacent section */}
      <mesh position={[1.5, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Roof details */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[2.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>

      {/* Windows */}
      {Array.from({ length: 6 }, (_, i) => {
        const floor = Math.floor(i / 2);
        const side = i % 2;
        return (
          <mesh 
            key={i}
            position={[side * 0.8 - 0.4, 0.8 + floor * 0.6, 1.05]} 
            castShadow
          >
            <boxGeometry args={[0.3, 0.4, 0.1]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>
        );
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      {/* Ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Grid floor */}
      <gridHelper args={[20, 20, "#64748b", "#64748b"]} position={[0, 0, 0]} />

      {/* Target building */}
      <TargetBuilding />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
    </>
  );
};

export const Building3DViewer: React.FC<Building3DViewerProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [8, 6, 8], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};