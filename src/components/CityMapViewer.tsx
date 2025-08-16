import React, { useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface CityMapViewerProps {
  className?: string;
}

const Building = ({ position, scale, color, type = 'normal' }: { 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  color: string;
  type?: 'normal' | 'target' | 'mosque' | 'commercial';
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={type === 'target' ? 0.3 : 0.7}
          metalness={type === 'target' ? 0.2 : 0.1}
        />
      </mesh>
      
      {/* Add rooftop details for target building */}
      {type === 'target' && (
        <>
          <mesh position={[0, scale[1] * 0.55, 0]} castShadow>
            <boxGeometry args={[scale[0] * 1.1, 0.1, scale[2] * 1.1]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
          {/* Rooftop equipment */}
          <mesh position={[scale[0] * 0.3, scale[1] * 0.7, scale[2] * 0.3]} castShadow>
            <boxGeometry args={[0.2, 0.3, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        </>
      )}

      {/* Add minaret for mosque */}
      {type === 'mosque' && (
        <mesh position={[scale[0] * 0.4, scale[1] * 1.2, scale[2] * 0.4]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, scale[1] * 0.8, 8]} />
          <meshStandardMaterial color="#f3f4f6" />
        </mesh>
      )}
    </group>
  );
};

const Street = ({ position, scale, type = 'main' }: { 
  position: [number, number, number]; 
  scale: [number, number, number];
  type?: 'main' | 'side';
}) => {
  return (
    <group position={position}>
      <mesh scale={scale} receiveShadow>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color={type === 'main' ? "#1f2937" : "#374151"} />
      </mesh>
      
      {/* Road markings */}
      {type === 'main' && (
        <mesh position={[0, 0.03, 0]} scale={[scale[0] * 0.1, 1, scale[2] * 0.9]}>
          <boxGeometry args={[1, 0.01, 1]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      )}
    </group>
  );
};

const Tree = ({ position, type = 'palm' }: { 
  position: [number, number, number];
  type?: 'palm' | 'regular';
}) => {
  return (
    <group position={position}>
      {type === 'palm' ? (
        <>
          {/* Palm trunk */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Palm fronds */}
          {Array.from({ length: 8 }, (_, i) => (
            <mesh 
              key={i}
              position={[
                Math.cos(i * Math.PI / 4) * 0.3,
                0.8,
                Math.sin(i * Math.PI / 4) * 0.3
              ]}
              rotation={[0, i * Math.PI / 4, Math.PI / 6]}
              castShadow
            >
              <boxGeometry args={[0.8, 0.1, 0.05]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {/* Regular tree trunk */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Tree crown */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
        </>
      )}
    </group>
  );
};

const CityScene = () => {
  // Generate realistic Middle Eastern city layout
  const cityElements = useMemo(() => {
    const buildings = [];
    const streets = [];
    const trees = [];
    
    // Create a more realistic grid with varying densities
    const blocks = [
      // Residential blocks
      { x: -15, z: -15, width: 8, depth: 8, density: 'high', type: 'residential' },
      { x: -15, z: -5, width: 8, depth: 8, density: 'medium', type: 'residential' },
      { x: -15, z: 5, width: 8, depth: 8, density: 'high', type: 'residential' },
      { x: -5, z: -15, width: 8, depth: 8, density: 'medium', type: 'mixed' },
      { x: -5, z: 5, width: 8, depth: 8, density: 'low', type: 'commercial' },
      { x: 5, z: -15, width: 8, depth: 8, density: 'high', type: 'residential' },
      { x: 5, z: -5, width: 8, depth: 8, density: 'medium', type: 'mixed' },
      { x: 5, z: 5, width: 8, depth: 8, density: 'medium', type: 'residential' },
    ];

    blocks.forEach(block => {
      const buildingsPerBlock = block.density === 'high' ? 12 : block.density === 'medium' ? 8 : 4;
      
      for (let i = 0; i < buildingsPerBlock; i++) {
        const x = block.x + (Math.random() - 0.5) * block.width;
        const z = block.z + (Math.random() - 0.5) * block.depth;
        
        // Skip center area for target building
        if (Math.abs(x) < 4 && Math.abs(z) < 4) continue;
        
        let height, width, depth, color, type = 'normal';
        
        if (block.type === 'residential') {
          height = Math.random() * 2 + 1.5;
          width = Math.random() * 0.6 + 0.8;
          depth = Math.random() * 0.6 + 0.8;
          color = i === 0 && Math.random() > 0.8 ? "#f3f4f6" : "#9ca3af"; // Occasional mosque
          if (color === "#f3f4f6") type = 'mosque';
        } else if (block.type === 'commercial') {
          height = Math.random() * 4 + 2;
          width = Math.random() * 1.2 + 1;
          depth = Math.random() * 1.2 + 1;
          color = "#6b7280";
          type = 'commercial';
        } else {
          height = Math.random() * 3 + 1.5;
          width = Math.random() * 0.8 + 0.7;
          depth = Math.random() * 0.8 + 0.7;
          color = "#9ca3af";
        }
        
        buildings.push({
          position: [x, height / 2, z] as [number, number, number],
          scale: [width, height, depth] as [number, number, number],
          color,
          type
        });
      }
    });

    // Create main streets (wider)
    const mainStreets = [
      { pos: [0, 0, -10], scale: [40, 1, 3], type: 'main' },
      { pos: [0, 0, 0], scale: [40, 1, 3], type: 'main' },
      { pos: [0, 0, 10], scale: [40, 1, 3], type: 'main' },
      { pos: [-10, 0, 0], scale: [3, 1, 40], type: 'main' },
      { pos: [10, 0, 0], scale: [3, 1, 40], type: 'main' },
    ];

    // Create side streets
    const sideStreets = [
      { pos: [-15, 0, 0], scale: [2, 1, 30], type: 'side' },
      { pos: [15, 0, 0], scale: [2, 1, 30], type: 'side' },
      { pos: [0, 0, -15], scale: [30, 1, 2], type: 'side' },
      { pos: [0, 0, 15], scale: [30, 1, 2], type: 'side' },
    ];

    streets.push(...mainStreets, ...sideStreets);

    // Add trees along streets and in courtyards
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 35;
      
      // Place trees strategically
      const nearStreet = Math.abs(x % 10) < 2 || Math.abs(z % 10) < 2;
      const notInCenter = !(Math.abs(x) < 5 && Math.abs(z) < 5);
      const notOnBuilding = !buildings.some(b => 
        Math.abs(x - b.position[0]) < b.scale[0] && 
        Math.abs(z - b.position[2]) < b.scale[2]
      );
      
      if (nearStreet && notInCenter && notOnBuilding) {
        trees.push({
          position: [x, 0, z] as [number, number, number],
          type: Math.random() > 0.7 ? 'palm' : 'regular'
        });
      }
    }

    return { buildings, streets, trees };
  }, []);

  return (
    <>
      {/* Ground with Saudi-inspired texture */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
      </mesh>

      {/* Streets */}
      {cityElements.streets.map((street, index) => (
        <Street key={`street-${index}`} position={street.pos as [number, number, number]} scale={street.scale as [number, number, number]} type={street.type as 'main' | 'side'} />
      ))}

      {/* Buildings */}
      {cityElements.buildings.map((building, index) => (
        <Building key={`building-${index}`} {...building} />
      ))}

      {/* Target building complex (highlighted) */}
      <Building 
        position={[0, 1.8, 0]} 
        scale={[2.5, 3.6, 2.5]} 
        color="#059669" 
        type="target"
      />
      
      {/* Adjacent building part */}
      <Building 
        position={[2, 1.2, 0]} 
        scale={[1.5, 2.4, 2.5]} 
        color="#0ea5e9" 
        type="target"
      />

      {/* Courtyard/Plaza */}
      <mesh position={[0, 0.01, -3]} receiveShadow>
        <boxGeometry args={[6, 0.02, 3]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Trees */}
      {cityElements.trees.map((tree, index) => (
        <Tree key={`tree-${index}`} position={tree.position} type={tree.type as 'palm' | 'regular'} />
      ))}

      {/* Enhanced lighting for Middle Eastern ambiance */}
      <ambientLight intensity={0.6} color="#fff5e6" />
      <directionalLight
        position={[20, 20, 10]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      
      {/* Additional warm lighting */}
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#fbbf24" />
      <hemisphereLight args={["#87CEEB", "#d6d3d1", 0.4]} />
    </>
  );
};

export const CityMapViewer: React.FC<CityMapViewerProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [25, 20, 25], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CityScene />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={60}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
};