"use client";
import React, { useEffect, Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";

interface ModelProps {
  filePath: string; // Explicitly define the type for filePath
}
import * as THREE from "three"; // Import THREE namespace

function Model({ filePath }: ModelProps) {
  const { scene } = useGLTF(filePath) as unknown as { scene: THREE.Scene }; // Change type assertion to unknown first
  const { camera } = useThree();

  const handlePointerMove = () => {
    console.log("Camera position:", camera.position);
  };

  // Determine if the device is mobile
  const isMobile = window.innerWidth <= 768; // Adjust the width as needed
  const modelScale = isMobile ? 35 : 50; // Scale for mobile vs desktop

  return (
    <primitive
      object={scene}
      scale={modelScale}
      onPointerMove={handlePointerMove}
    />
  );
}

const CameraLogger = () => {
  const { camera } = useThree();

  useEffect(() => {
    console.log("Camera position:", camera.position);
  }, [camera]);

  return null;
};

const Scene = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas camera={{ position: [-16, 57, 7] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={loading ? <LoadingIndicator /> : null}>
        <Model filePath="/assets/classroom-course/arduino.glb" />
      </Suspense>
      <OrbitControls />
      <CameraLogger />
    </Canvas>
  );
};

// Simple loading indicator component
function LoadingIndicator() {
  return (
    <mesh>
      <Html center>
        <div className="  text-black w-screen  ">3D model is loading...</div>
      </Html>
    </mesh>
  );
}

export default Scene;
