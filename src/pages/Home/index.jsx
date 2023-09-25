import React from 'react'
import { Canvas } from "@react-three/fiber"
import Environment from '../../components/Environment'
import "./home.css"
import * as THREE from 'three'
import { OrbitControls} from '@react-three/drei'
import { House } from '../../components/Homepage'

const box = new THREE.BoxGeometry()
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20)
const tri = new THREE.CylinderGeometry(1, 1, 2, 3)

export default function Home() {
  return (
    <div id='home-container'>
      <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <House 
          boxGeometry={box}
          triGeometry={tri}
          clyGeometry={cyl}
        />
        <Environment />
        <OrbitControls makeDefault />
      </Canvas>
      <div id='centre-button'>
        <button>Enter</button>
      </div>
      
    </div>
    
  )
}
