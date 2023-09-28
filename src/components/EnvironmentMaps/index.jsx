import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  Marker  from '../Marker';
import Heart from "react-animated-heart";
import axios from 'axios'

import { AiOutlineComment } from 'react-icons/ai'

const EnvironmentMap = ({ mapUrls }) => {
  const containerRef = useRef(null);
  const [isClick, setClick] = useState(false);

  const handleLike = async () => {
    setClick(prev => !prev);

    //I will change this to the actual user logged in just wanted to check that it works first
    const likeData = {
        user_id: 2,
        room_id: 2
    };

    try {
        const response = await axios.post('http://localhost:5000/likes', likeData);
        console.log('Like created', response.data);
    } catch (error) {
        console.error('Error creating like:', error);

       
        setClick(prev => !prev);  
    }
}

  

  useEffect(() => {
    const container = containerRef.current;
    

    const gltfLoader = new GLTFLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const textureLoader = new THREE.TextureLoader();

  
    // const gui = new dat.GUI();
    const global = {};

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);


    const scene = new THREE.Scene();
    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(4, 5, 4);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3.5;
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}



 scene.backgroundBlurriness = 0 
scene.backgroundIntensity = 1 

// gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
// gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)

// global.envMapIntensity = 1
// gui
//     .add(global, 'envMapIntensity')
//     .min(0)
//     .max(10)
//     .step(0.001)
//     .onChange(updateAllMaterials)


    const environmentMap = new THREE.CubeTextureLoader().load(mapUrls);
    scene.environment = environmentMap;
    scene.background = environmentMap;

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    
    const onResize = () => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', onResize);

    return () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  cancelAnimationFrame(tick);
  window.removeEventListener('resize', onResize);
  controls.dispose();
  renderer.dispose();
};
  }, [mapUrls]);

  

  return (
    <>
  <div ref={containerRef} className="environment-map" />
  {/* <Marker label="1" text="Information text and liking will go here !!!!! Have to make other components" /> */}
  <div className='like-bar'>
        <p className='favourites'>Add to favourites</p>
         <Heart isClick={isClick} onClick={handleLike} />

         
         <button className='comments-button'>Comments <AiOutlineComment /></button>
      </div>
  </>
  
  );
};

export default EnvironmentMap;
