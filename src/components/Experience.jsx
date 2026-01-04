import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Cake from './Cake';
import Particles from './Particles';

const Experience = () => {
    return (
        <div id="canvas-container" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
            <Canvas shadows camera={{ position: [0, 3, 10], fov: 45 }}>
                <color attach="background" args={['#FFFDD0']} />
                
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <spotLight 
                    position={[10, 10, 10]} 
                    angle={0.15} 
                    penumbra={1} 
                    castShadow 
                    intensity={1.5} 
                    color="#FFF0F5" 
                />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#B76E79" />

                <Suspense fallback={null}>
                   <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                        <Cake />
                   </Float>
                   <Particles count={200} />
                   <Environment preset="sunset" />
                </Suspense>

                <OrbitControls 
                    enablePan={false} 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 2} 
                    minDistance={5}
                    maxDistance={15}
                />
            </Canvas>
        </div>
    );
};

export default Experience;
