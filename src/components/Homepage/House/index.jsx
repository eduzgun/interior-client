import React, { useLayoutEffect, useState } from 'react';
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
  //const [catMoving, setCatMoving] = useState(false);
  
  // Add rotation
  useFrame(() => {
    csg.current.rotation.y -= 0.02; // Adjust rotation as needed

    // Get the current position of the object
    //const currentY = csg.current.children[0].children[9].position.y;

    // Check scroll position and update position accordingly
    /*
    if (scrollY > 700 && scrollY < 1400) {
      if (currentY <= -5 && !catMoving) {
        csg.current.children[0].children[9].position.y = -1.5;
        setCatMoving(true);
      }
    } else {
      if (currentY >= -5 && catMoving) {
        csg.current.children[0].children[9].position.y = -50;
        setCatMoving(false);
      }
    }
    */
  });
  

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
  
    // Determine the target colors based on the scroll position
    const sectionHeight = 700; // Height of each text section
    const sectionIndex = Math.floor(scrollY / sectionHeight);
    console.log(scrollY, sectionIndex)
    let targetColors;
  
    if (sectionIndex === 1) {
      // Green house (first house)
      targetColors = {
        base: { r: 0.36470588, g: 0.36470, b: 0.43921 }, 
        roof: { r: 0.788235, g: 0.78820, b: 0.639215 }, 
        wall1: { r: 0.2, g: 0.7, b: 0.2 }, 
        chimney: { r: 0.34117647, g: 0.2, b: 0.1058823 }, 
      };
    } else if (sectionIndex >= 2 ) {
      // Purple house (second house)
      targetColors = {
        base: { r: 0.8, g: 0.76470, b: 0.6627450 }, 
        roof: { r: 0.0666666, g: 0.0666666, b: 0.1607843 }, 
        wall1: { r: 0.2, g: 0.4, b: 0.6 }, 
        chimney: { r: 0.34117647, g: 0.2, b: 0.1058823 }, 
      };
    } else {
      // Colors remain unchanged in section 0
      targetColors = null;
    }
  
    // Animate the colors to the target colors if defined
    if (targetColors) {
      tl.current.to(
        csg.current.children[0].children[3].material.color,
        {
          
          ...targetColors.base,
          onStart: () => {
            csg.current.children[0].children[3].material.needsUpdate = true;
          },
          duration: 2,
        },
        0
      );
  
      tl.current.to(
        csg.current.children[0].children[2].children[0].material.color,
        {
          
          ...targetColors.roof,
          onStart: () => {
            csg.current.children[0].children[2].children[0].material.needsUpdate = true;
          },
          duration: 2,
        },
        0 // Delay for simultaneous animation
      );
  
      tl.current.to(
        csg.current.children[0].children[1].material.color,
        {
          
          ...targetColors.wall1,
          onStart: () => {
            csg.current.children[0].children[1].material.needsUpdate = true;
          },
          duration: 2,
        },
        0 // Delay for simultaneous animation
      );
  
      tl.current.to(
        csg.current.children[0].children[0].material.color,
        {
          duration: 2,
          ...targetColors.base,
          onStart: () => {
            csg.current.children[0].children[2].material.needsUpdate = true;
          },
        },
        0 // Delay for simultaneous animation
      );
  
      tl.current.to(
        csg.current.children[0].children[3].material.color,
        {
          duration: 4,
          ...targetColors.chimney,
          onStart: () => {
            csg.current.children[0].children[3].material.needsUpdate = true;
          },
        },
        0 // Delay for simultaneous animation
      );
    }
  
    // Reset the timeline when the scrollY changes
    const progress = (scrollY - sectionIndex * sectionHeight) / sectionHeight;
    tl.current.progress(progress);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);
  
  
  //const { nodes, materials } = useGLTF('../../src/assets/models/low_poly_cat/scene.gltf');

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

          {/*
          <primitive
          object={nodes.CatMesh2_lambert1_0} // Use the mesh name
          material={
            new THREE.MeshStandardMaterial({
              color: "#cc9149", 
            })
          }   
          position={[-2, -50, 2]}
          scale={0.12}  
          rotation={[0,4.2,0]}
        /> */}

        </Geometry>
        <meshStandardMaterial envMapIntensity={0.25} />
      </mesh>
    </>
  );
};

export default House;
