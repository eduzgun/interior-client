import React from 'react';
import { useRef } from 'react';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import { useFrame } from '@react-three/fiber';
import Window from '../Window';
import Chimney from '../Chimney';
import Door from '../Door';
import * as THREE from 'three'; // Import THREE library

const House = ({ scrollY, ...props }) => {
  const csg = useRef();
  
  // Add rotation
  useFrame(() => {

    csg.current.rotation.y += 0.02;
    const newYPosition = -scrollY  * 0.1; // Adjust as needed
  csg.current.rotation.y = newYPosition;
  });

  
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
