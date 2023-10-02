import React, { Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NotFound.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <div id="section">
        <div id="container">
          <div id="left">
            <h1 id="h1">Opps! Page not found! </h1>

            <p id="p">Description</p>
            <Link to={"/"}>
              <button id="button_notfound">Go back to Home Page</button>
            </Link>
          </div>
          <div id="right">
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <Sphere args={[1, 100, 100]} scale={2.4}>
                  <MeshDistortMaterial
                    color="#20fae6"
                    attach="material"
                    distort={0.5}
                    speed={2}
                  />
                </Sphere>
              </Suspense>
            </Canvas>
            <div id="img2">
              {/* <img src="../../../src/assets/images/preview.png" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

{
  /*     
    <h1 id="h1" >Page <span id="location">{location.pathname}</span> not found
      </h1>
      <Link to="/" id="location"> Home Page &rarr;</Link> */
}
