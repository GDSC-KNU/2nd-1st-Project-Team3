import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";

function Ghost() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 1.5, 10], zoom: 1.3 }}
        style={{ width: "800px", height: "600px", marginTop: "100px" }}
      >
        <ambientLight />
        <directionalLight />
        <OrbitControls />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Ghost;
