import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 100 }) => {
    const mesh = useRef();
    
    // Generate random positions and speeds
    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
            speeds[i] = Math.random() * 0.02 + 0.005;
        }
        
        return { positions, speeds };
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;
        
        const positionsArray = mesh.current.geometry.attributes.position.array;
        
        for (let i = 0; i < count; i++) {
            positionsArray[i * 3 + 1] += speeds[i]; // Move up
             
            if (positionsArray[i * 3 + 1] > 8) {
                positionsArray[i * 3 + 1] = -8; // Reset to bottom
            }
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#B76E79"
                transparent
                opacity={0.7}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default Particles;
