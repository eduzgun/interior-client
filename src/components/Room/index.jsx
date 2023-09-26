import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  Marker  from '../Marker';

import EnvironmentMap from '../EnvironmentMaps';


const Room = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Here is to load any models and textures that we use in our project
    const gltfLoader = new GLTFLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const textureLoader = new THREE.TextureLoader();

   // Here is the controls panel that comes up in the corner which will be able to change different things in the room (hopefully)
    const gui = new dat.GUI();
    const global = {};

    // Creating the canvas that appears on the document (where the three.js sketch will live)
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    // Making the scene (so camera, render and materials make up the screen then the screen sits in the canvas)
    const scene = new THREE.Scene();


// Function which is not in use right now really - but this is changing the lighting of the room etc with the controls
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

// This is the environement map which makes up the room

 scene.backgroundBlurriness = 0 //makes backgorund blurry
scene.backgroundIntensity = 1 //brightness of background

gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)

global.envMapIntensity = 1
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)

//This is the enviornement map texture which makes up the room 

// const environmentMap = cubeTextureLoader.load([
//     '../../src/assets/environmentMaps/0/px.png',
//     '../../src/assets/environmentMaps/0/nx.png',
//     '../../src/assets/environmentMaps/0/py.png',
//     '../../src/assets/environmentMaps/0/ny.png',
//     '../../src/assets/environmentMaps/0/pz.png',
//     '../../src/assets/environmentMaps/0/nz.png'
// ])

//testing AI generated environment maps 

// const environmentMap = textureLoader.load('../../src/assets/environmentMaps/ai/kitchenAI.png')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.environment = environmentMap
// scene.background = environmentMap



const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



// orthoCamera testing - is as if its looking birdseye view of a room

// const zoomFactor = 800;  
// const camera = new THREE.OrthographicCamera(
//   -sizes.width/2 / zoomFactor,
//    sizes.width/2 / zoomFactor,
//    sizes.height/2 / zoomFactor,
//   -sizes.height/2 / zoomFactor,
//   0.1,
//   100
// );
// camera.position.set(4, 5, 4);
// scene.add(camera);


// Here setting up the camera so looks like POV looking in a room yourself

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls of being able to look aroud the room
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true


    // This is the renderer which renders the whole page
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //This is if we want anything animated on the screen, eg a spinning model 
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    // This stops the tick is being used (not using it right now)
    return () => {
      cancelAnimationFrame(tick);
      gui.destroy();
      renderer.dispose();
    };
  }, []);

  const environmentMaps = [
 ['../../src/assets/environmentMaps/0/px.png',
    '../../src/assets/environmentMaps/0/nx.png',
    '../../src/assets/environmentMaps/0/py.png',
    '../../src/assets/environmentMaps/0/ny.png',
    '../../src/assets/environmentMaps/0/pz.png',
    '../../src/assets/environmentMaps/0/nz.png'],
    ['../../src/assets/environmentMaps/1/px.png',
    '../../src/assets/environmentMaps/1/nx.png',
    '../../src/assets/environmentMaps/1/py.png',
    '../../src/assets/environmentMaps/1/ny.png',
    '../../src/assets/environmentMaps/1/pz.png',
    '../../src/assets/environmentMaps/1/nz.png'],
    ['../../src/assets/environmentMaps/2/px.png',
    '../../src/assets/environmentMaps/2/nx.png',
    '../../src/assets/environmentMaps/2/py.png',
    '../../src/assets/environmentMaps/2/ny.png',
    '../../src/assets/environmentMaps/2/pz.png',
    '../../src/assets/environmentMaps/2/nz.png'],
]
  

   return (
    <div ref={containerRef} id="three-container">
      <div className="grid-container">
        {environmentMaps.map((mapUrls, index) => (
          <EnvironmentMap key={index} mapUrls={mapUrls} />
        ))}
      </div>
      <Marker label="1" text="Information text and linking will go here !!!!! Have to make other components" />
    </div>
  );
};

export default Room;


//notes to self about three container style: style={{ width: '100%', height: '100%' }}
