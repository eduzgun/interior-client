import React from 'react'
import * as THREE from 'three'
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'

const Door = (props) => {
    const box = new THREE.BoxGeometry()
    const cyl = new THREE.CylinderGeometry(1, 1, 2, 20)
    return (
        <Subtraction {...props}>
            <Geometry>
            <Base geometry={box} scale={[1, 2, 1]} />
            <Addition geometry={cyl} scale={0.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} />
            </Geometry>
        </Subtraction>
    )
    
}

export default Door