"use client";
import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ filePath }: { filePath: string }) {
  const { scene } = useGLTF(filePath);
  const { camera } = useThree();

  const handlePointerMove = () => {
    console.log("Camera position:", camera.position);
  };

  return (
    <primitive object={scene} scale={50} onPointerMove={handlePointerMove} />
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
  return (
    <Canvas camera={{ position: [-33, 48, 16] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <Model filePath="/assets/classroom-course/arduino.glb" />
      {/* Load the GLB model */}
      <OrbitControls />
      <CameraLogger />
    </Canvas>
  );
};

export default Scene;
