import React from 'react'
import { Canvas } from "@react-three/fiber"
import Environment from '../../components/Homepage/Environment'
import "./home.css"
import * as THREE from 'three'
import { OrbitControls} from '@react-three/drei'
import { House } from '../../components/Homepage'
import { Link } from "react-router-dom";

const box = new THREE.BoxGeometry()
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20)
const tri = new THREE.CylinderGeometry(1, 1, 2, 3)

export default function Home() {


    return (
      <div id='home-container'>
        <div id='centre-button'>
          <h3 role='heading'>Welcome</h3>
          <p role='paragraph'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia aspernatur eaque accusamus dicta accusantium 
            ab soluta ullam optio eius.</p>
        <Link to={`/explore`}>
          <button>Enter</button>
        </Link>
        
      </div>
        <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
            <House
              scale={1}
              boxGeometry={box}
              triGeometry={tri}
              clyGeometry={cyl}
            />
        <Environment />
        <OrbitControls makeDefault />
      </Canvas>
      
      
      
    </div>
    
  )
}
