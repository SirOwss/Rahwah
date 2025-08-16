import React, { useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface CityMapViewerProps {
  className?: string;
}

const Building = ({ position, scale, color }: { position: [number, number, number]; scale: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Street = ({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) => {
  return (
    <mesh position={position} scale={scale} receiveShadow>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Tree leaves */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  );
};

const CityScene = () => {
  // Generate surrounding buildings
  const surroundingBuildings = useMemo(() => {
    const buildings = [];
    const gridSize = 20;
    const spacing = 3;
    
    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        // Skip center area for target building
        if (Math.abs(x) < 3 && Math.abs(z) < 3) continue;
        
        const height = Math.random() * 3 + 1;
        const width = Math.random() * 0.8 + 0.5;
        const depth = Math.random() * 0.8 + 0.5;
        
        buildings.push({
          position: [x, height / 2, z] as [number, number, number],
          scale: [width, height, depth] as [number, number, number],
          color: "#808080"
        });
      }
    }
    return buildings;
  }, []);

  // Generate streets
  const streets = useMemo(() => {
    const streetData = [];
    const gridSize = 20;
    
    // Horizontal streets
    for (let z = -gridSize; z <= gridSize; z += 6) {
      streetData.push({
        position: [0, 0, z] as [number, number, number],
        scale: [gridSize * 2, 1, 1] as [number, number, number]
      });
    }
    
    // Vertical streets
    for (let x = -gridSize; x <= gridSize; x += 6) {
      streetData.push({
        position: [x, 0, 0] as [number, number, number],
        scale: [1, 1, gridSize * 2] as [number, number, number]
      });
    }
    
    return streetData;
  }, []);

  // Generate trees
  const trees = useMemo(() => {
    const treePositions = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      
      // Avoid placing trees on streets or near center
      if (Math.abs(x % 6) > 2 && Math.abs(z % 6) > 2 && 
          !(Math.abs(x) < 4 && Math.abs(z) < 4)) {
        treePositions.push([x, 0, z] as [number, number, number]);
      }
    }
    return treePositions;
  }, []);

  return (
    <>
      {/* Ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Streets */}
      {streets.map((street, index) => (
        <Street key={`street-${index}`} {...street} />
      ))}

      {/* Surrounding buildings */}
      {surroundingBuildings.map((building, index) => (
        <Building key={`building-${index}`} {...building} />
      ))}

      {/* Target building (highlighted) */}
      <Building 
        position={[0, 1.5, 0]} 
        scale={[2, 3, 2]} 
        color="#10b981" 
      />
      
      {/* Adjacent building part */}
      <Building 
        position={[1.5, 1, 0]} 
        scale={[1, 2, 2]} 
        color="#3b82f6" 
      />

      {/* Trees */}
      {trees.map((position, index) => (
        <Tree key={`tree-${index}`} position={position} />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  );
};

export const CityMapViewer: React.FC<CityMapViewerProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [15, 15, 15], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CityScene />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};