import React from 'react'
import * as THREE from 'three'
import { Geometry, Base, Subtraction } from '@react-three/csg'

const Window = (props) => {
    const box = new THREE.BoxGeometry()
    return(
        <Subtraction {...props}>
            <Geometry>
            <Base geometry={box} />
            <Subtraction geometry={box} scale={[0.05, 1, 1]} />
            <Subtraction geometry={box} scale={[1, 0.05, 1]} />
            </Geometry>
            
        </Subtraction>
    )
    
}

export default Window
