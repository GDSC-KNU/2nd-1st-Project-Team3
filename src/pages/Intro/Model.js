import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.07;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group scale={0.015}>
        <mesh
          geometry={nodes.Ground_M_Ground_0.geometry}
          material={materials.M_Ground}
          position={[0, -1.79, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Ghost_M_Ghost_0.geometry}
          material={materials.M_Ghost}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Ghost001_M_Ghost_0.geometry}
          material={materials.M_Ghost}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Ghost002_Outline_0.geometry}
          material={materials.Outline}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
