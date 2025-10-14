import React, { useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("/models/model.gltf");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Replace existing materials with a plain neutral one
        child.material = new THREE.MeshStandardMaterial({
          color: "#0F2E37", // pure white
          metalness: 0,
          roughness: 1,
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

const Scene = () => {
  return (
    <Canvas
      style={{ height: "100vh", background: "#fff" }}
      camera={{ position: [0, 2, 5], fov: 50 }}
    >
      {/* Lighting */}
      <ambientLight intensity={10} />
      <directionalLight position={[2, 5, 3]} intensity={1} />

      {/* Model (no color) */}
      <Model />

      {/* Controls — rotate horizontally only */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default Scene;
