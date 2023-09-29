import React from 'react'
import * as THREE from 'three'
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'

const Chimney = (props) => {
    const box = new THREE.BoxGeometry()
    return (
        <Addition name="chimney" {...props}>
            <Geometry>
            <Base name="base" geometry={box} scale={[1, 2, 1]} />
            <Subtraction name="hole" geometry={box} scale={[0.7, 2, 0.7]} position={[0, 0.5, 0]} />
            </Geometry>
        </Addition>
    )
    
}

export default Chimney
