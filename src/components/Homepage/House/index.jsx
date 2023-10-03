import React, { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import { useFrame } from '@react-three/fiber';
import Window from '../Window';
import Chimney from '../Chimney';
import Door from '../Door';
import * as THREE from 'three'; // Import THREE library
import { useGLTF, MeshWobbleMaterial } from '@react-three/drei';
import gsap from 'gsap';

const House = ({ scrollY, ...props }) => {
  const csg = useRef();
  const tl = useRef();

  // Add rotation
  useFrame(() => {
    csg.current.rotation.y += 0.02  // Adjust rotation as needed
    //tl.current.seek(scrollY * 0.01); // Adjust scroll sensitivity
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // VERTICAL ANIMATION
    

    // Define the initial color as brown
    const initialColor = { r: 1, g: 1, b: 1 };

    // Color changes based on the timeline's progress
    const purpleColor = { r: 0.2, g: 0.4, b: 0.6 };
    const greenColor = { r: 0.2, g: 0.7, b: 0.2 };

    // Determine the color based on the scrollY position
    const sectionHeight = 700; // Height of each text section
    const sectionIndex = Math.floor(scrollY / sectionHeight);
    const targetColor = sectionIndex === 0 ? initialColor : sectionIndex === 1 ? greenColor : purpleColor;

    // Set the initial color before the animation starts

    tl.current.to(
      csg.current.children[0].children[3].material.color,
      {
        duration: 0.2,
        ...targetColor,
        onStart: () => {
          csg.current.children[0].children[3].material.needsUpdate = true;
        },
      }
    );

    tl.current.to(
      csg.current.children[0].children[1].material.color,
      {
        duration: 0.2,
        ...targetColor,
        onStart: () => {
          csg.current.children[0].children[1].material.needsUpdate = true;
        },
      }
    );
  }, [scrollY]);
    
  
  const { nodes, materials } = useGLTF('../../src/assets/models/low_poly_cat/scene.gltf');

  return (
    <>
      <mesh scale={0.3} ref={csg} {...props}>
        <Geometry rotation-y={Math.PI * 0.25} computeVertexNormals useGroups={true}>
          <Base name="base" geometry={props.boxGeometry} scale={[3, 3, 3]} material={new THREE.MeshStandardMaterial({ color: "#8a522d"})} />
          <Subtraction name="cavity" geometry={props.boxGeometry} scale={[2.7, 2.7, 2.7]} material={new THREE.MeshStandardMaterial({ color: "#e6f9ff"})}/>
          <mesh>
            <Addition name="roof" geometry={props.triGeometry} scale={[2.5, 1.5, 1.425]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]} material={new THREE.MeshStandardMaterial({ color: '#f5ddba' })} />
          </mesh>

          <Chimney scale={0.5} position={[-0.75, 3, 0.8]} material={new THREE.MeshStandardMaterial({ color: { r: 1, g: 0.5, b: 0.2 } })}/>
          <Window position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} material={new THREE.MeshStandardMaterial({ color: 'black' })}/>
          <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} material={new THREE.MeshStandardMaterial({ color: 'black', transparent: "true" })}/>
          <Window position={[0, 0.25, 1.5]} scale={1.25} material={new THREE.MeshStandardMaterial({ color: 'white' })} />
          <Window rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, 0]} scale={1.25} material={new THREE.MeshStandardMaterial({ color: 'white' })} />
          <Door rotation={[0, Math.PI / 2, 0]} position={[-1.425, -0.45, 0]} scale={[1, 0.9, 1]} material={new THREE.MeshStandardMaterial({ color: 'black' })} />

          <primitive
          object={nodes.CatMesh2_lambert1_0} // Use the mesh name
          material={
            new THREE.MeshStandardMaterial({
              color: "#cc9149", 
            })
          }   
          position={[-2, -1.5, 2]}
          scale={0.12}  
          rotation={[0,4.2,0]}
          />

        </Geometry>
        <meshStandardMaterial envMapIntensity={0.25} />
      </mesh>
    </>
  );
};

export default House;
