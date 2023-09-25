import React from 'react'
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'
import Window from '../Window'
import Chimney from '../Chimney'
import Door from '../Door'

const House = (props) => {
    const csg = useRef()
    useFrame(() => {
        csg.current.rotation.y += 0.015
    })
    return (
        <mesh ref={csg} {...props}>
        <Geometry  computeVertexNormals>
            <Base name="base" geometry={props.boxGeometry} scale={[3, 3, 3]} />
            <Subtraction name="cavity" geometry={props.boxGeometry} scale={[2.7, 2.7, 2.7]} />
            <Addition name="roof" geometry={props.triGeometry} scale={[2.5, 1.5, 1.425]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]} />
            <Chimney scale={0.5} position={[-0.75, 3, 0.8]} />
            <Window position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} />
            <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} />
            <Window position={[0, 0.25, 1.5]} scale={1.25} />
            <Window rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, 0]} scale={1.25} />
            <Door rotation={[0, Math.PI / 2, 0]} position={[-1.425, -0.45, 0]} scale={[1, 0.9, 1]} />
        </Geometry>
        <meshStandardMaterial />
        </mesh>
    )
}

export default House