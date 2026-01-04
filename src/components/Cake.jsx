import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Cake = () => {
    const group = useRef();
    
    // Gentle rotation animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.y = Math.sin(t / 4) / 8;
        }
    });

    // Materials
    const frostingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FFFDD0',
        roughness: 0.3,
        metalness: 0.1,
    }), []);
    
    const pinkFrostingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FFC0CB',
        roughness: 0.4,
        metalness: 0.05,
    }), []);

    const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#B76E79',
        metalness: 0.8,
        roughness: 0.2,
    }), []);
    
    const candleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.5,
    }), []);

    return (
        <group ref={group} position={[0, -1, 0]}>
            {/* Bottom Tier */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2, 2, 1.5, 64]} />
                <primitive object={frostingMaterial} attach="material" />
            </mesh>
            {/* Bottom Tier Gold Trim */}
            <mesh position={[0, 0.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.06, 16, 100]} />
                <primitive object={goldMaterial} attach="material" />
            </mesh>

            {/* Middle Tier */}
            <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.5, 1, 64]} />
                <primitive object={pinkFrostingMaterial} attach="material" />
            </mesh>
            {/* Middle Tier Gold Trim */}
            <mesh position={[0, 1.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.06, 16, 100]} />
                <primitive object={goldMaterial} attach="material" />
            </mesh>
            
            {/* Top Tier */}
            <mesh position={[0, 2.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1, 1, 1, 64]} />
                <primitive object={frostingMaterial} attach="material" />
            </mesh>
            {/* Top Tier Gold Trim */}
            <mesh position={[0, 2.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.06, 16, 100]} />
                <primitive object={goldMaterial} attach="material" />
            </mesh>

            {/* Candle */}
            <group position={[0, 2.75, 0]}>
                {/* Candle Body */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                    <primitive object={candleMaterial} attach="material" />
                </mesh>
                {/* Flame */}
                <mesh position={[0, 0.7, 0]}>
                    <coneGeometry args={[0.08, 0.2, 16]} />
                    <meshBasicMaterial color="#FFA500" />
                </mesh>
                {/* Flame Glow */}
                <pointLight position={[0, 0.7, 0]} intensity={2} distance={4} color="#FFA500" />
            </group>

            {/* Name "Itun" using Text from drei (no font loading needed) */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    position={[0, 1.3, 1.6]}
                    fontSize={0.5}
                    color="#B76E79"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.woff2"
                >
                    Itun
                </Text>
            </Float>
        </group>
    );
};

export default Cake;
