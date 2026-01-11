import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { roomAPI } from '../../services/api';
import { Room } from '../../types';

// Wireframe Room Component
const WireframeRoom: React.FC<{ 
  position: [number, number, number]; 
  status: string;
}> = ({ position, status }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate based on status
  useFrame((state) => {
    if (meshRef.current) {
      // Pulse effect for occupied rooms
      if (status === 'occupied') {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      }
    }
  });

  const color = status === 'occupied' ? '#FF0000' : 
                status === 'vacant' ? '#660000' : 
                status === 'cleaning' ? '#CC0000' : '#AA0000';

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.6, 0.8]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={status === 'occupied' ? 1 : 0.5} 
      />
    </mesh>
  );
};

// Hotel Building Component
const HotelBuilding: React.FC<{ rooms: Room[] }> = ({ rooms }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the entire hotel slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Group rooms by floor
  const roomsByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, Room[]>);

  const floors = Object.keys(roomsByFloor).map(Number).sort();

  return (
    <group ref={groupRef}>
      {floors.map((floorNum) => {
        const floorRooms = roomsByFloor[floorNum];
        const roomsPerFloor = floorRooms.length;
        
        return floorRooms.map((room, index) => {
          // Arrange rooms in a circle on each floor
          const angle = (index / roomsPerFloor) * Math.PI * 2;
          const radius = 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (floorNum - 1) * 1.5;

          return (
            <WireframeRoom
              key={room.id}
              position={[x, y, z]}
              status={room.status}
            />
          );
        });
      })}

      {/* Central pillar */}
      <mesh position={[0, floors.length * 0.75, 0]}>
        <cylinderGeometry args={[0.3, 0.3, floors.length * 1.5, 8]} />
        <meshBasicMaterial color="#FF0000" wireframe />
      </mesh>

      {/* Floor plates */}
      {floors.map((floorNum) => (
        <mesh key={`floor-${floorNum}`} position={[0, (floorNum - 1) * 1.5 - 0.3, 0]}>
          <cylinderGeometry args={[4, 4, 0.1, 16]} />
          <meshBasicMaterial color="#FF0000" wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Main Visualization Component
const HotelVisualization: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const roomsData = await roomAPI.getAll();
      setRooms(roomsData);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#FF0000',
        fontSize: '14px',
        letterSpacing: '2px',
      }}>
        LOADING 3D MODEL...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [8, 6, 8], fov: 50 }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <HotelBuilding rooms={rooms} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #FF0000',
          padding: '10px',
          fontSize: '11px',
          letterSpacing: '1px',
        }}
      >
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>LEGEND:</div>
        <div style={{ color: '#FF0000' }}>■ OCCUPIED</div>
        <div style={{ color: '#660000' }}>■ VACANT</div>
        <div style={{ color: '#CC0000' }}>■ CLEANING</div>
        <div style={{ color: '#AA0000' }}>■ MAINTENANCE</div>
      </div>
    </div>
  );
};

export default HotelVisualization;