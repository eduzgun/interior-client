import React, { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import { useFrame } from '@react-three/fiber';
import Window from '../Window';
import Chimney from '../Chimney';
import Door from '../Door';
import * as THREE from 'three'; // Import THREE library

import gsap from 'gsap';

const House = ({ scrollY, ...props }) => {
  const csg = useRef();
  const tl = useRef();

  // Add rotation
  useFrame(() => {
    csg.current.rotation.y += 0.02; // Adjust rotation as needed
    tl.current.seek(scrollY * 0.1); // Adjust scroll sensitivity
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

   

    // Color changes based on the timeline's progress
    const brownColor = { r: 1, g: 0.5, b: 0.2 };
    const purpleColor = { r: 0.7, g: 0.2, b: 0.9 };
    
    // Define the positions where text sections start
    const textSections = [
      { name: 'Get Started', position: 0 },
      { name: 'About Us', position: 500 },
      { name: 'Another Section', position: 1000 },
    ];

    // Determine the color based on the timeline's progress and text sections
    for (let i = 0; i < textSections.length; i++) {
      const textSection = textSections[i];
      const nextTextSection = textSections[i + 1];
      const startPosition = textSection.position;
      const endPosition = nextTextSection ? nextTextSection.position : Infinity;

      if (scrollY >= startPosition && scrollY < endPosition) {
        // Change color based on the current text section
        const targetColor = i % 2 === 0 ? brownColor : purpleColor;
        tl.current.to(
          csg.current.children[0].children[3].material.color,
          {
            duration: 1,
            ...targetColor,
            onStart: () => {
              csg.current.children[0].children[3].material.needsUpdate = true;
            },
          }
        );
        break; // Exit the loop once color change is determined
      }
    }
  }, [scrollY]);
    
  return (
    <>
      <mesh scale={0.3} ref={csg} {...props}>
        <Geometry rotation-y={Math.PI * 0.25} computeVertexNormals useGroups={true}>
          <Base name="base" geometry={props.boxGeometry} scale={[3, 3, 3]} material={new THREE.MeshStandardMaterial({ color: "#8a522d"})} />
          <Subtraction name="cavity" geometry={props.boxGeometry} scale={[2.7, 2.7, 2.7]} material={new THREE.MeshStandardMaterial({ color: "#e6f9ff"})}/>
          <mesh>
            <Addition name="roof" geometry={props.triGeometry} scale={[2.5, 1.5, 1.425]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]} material={new THREE.MeshStandardMaterial({ color: '#f5ddba' })} />
          </mesh>

          <Chimney scale={0.5} position={[-0.75, 3, 0.8]} material={new THREE.MeshStandardMaterial({ color: '#bf6f39' })}/>
          <Window position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} material={new THREE.MeshStandardMaterial({ color: 'black' })}/>
          <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} material={new THREE.MeshStandardMaterial({ color: 'black', transparent: "true" })}/>
          <Window position={[0, 0.25, 1.5]} scale={1.25} material={new THREE.MeshStandardMaterial({ color: 'white' })} />
          <Window rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, 0]} scale={1.25} material={new THREE.MeshStandardMaterial({ color: 'white' })} />
          <Door rotation={[0, Math.PI / 2, 0]} position={[-1.425, -0.45, 0]} scale={[1, 0.9, 1]} material={new THREE.MeshStandardMaterial({ color: 'black' })} />
        </Geometry>
        <meshStandardMaterial envMapIntensity={0.25} />
      </mesh>
    </>
  );
};

export default House;
