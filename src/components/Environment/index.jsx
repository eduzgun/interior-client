import React, { useRef } from 'react'
import { Environment as EnvironmentImpl } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"

const Environment = () => {
  const cubeRef = useRef()
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += 0.1
    // console.log(cubeRef.current.rotation.y)
  })
  return (
    <mesh ref={cubeRef}>
      <EnvironmentImpl preset="city" />
    </mesh>
    
  )
}

export default Environment