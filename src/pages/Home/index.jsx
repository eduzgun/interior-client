import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Environment from "../../components/Homepage/Environment";
import "./home.css";
import * as THREE from "three";
import { OrbitControls, useScroll } from "@react-three/drei";
import { House } from "../../components/Homepage";
import { Link } from "react-router-dom";
import gsap from "gsap";

const box = new THREE.BoxGeometry();
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20);
const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

const FLOOR_HEIGHT = 2.3;

export default function Home() {
  /*
  const animateHouseOnScroll = (houseRef, scroll) => {
  // Define your animation timeline using GSAP
  const tl = gsap.timeline();

  // Add animation steps to the timeline
  tl.to(houseRef.current.position, {
    duration: 1, // Animation duration in seconds
    y: -scroll * 2, // Adjust the animation based on scroll value
    ease: 'power3.out', // Easing function (optional)
  });

  // Optionally, you can add more animations to the timeline

  // Return the timeline
  return tl;
};

    const scroll = useScroll();
    const tl = useRef();
    const ref = useRef();

    useFrame(() => {
      tl.current.seek(scroll.offset * tl.current.duration())
    })

    useLayoutEffect(() => {
      tl.current = gsap.timeline();
    
      tl.current.to(
        ref.current.position,
        {
          duration: 2,
          y: -20,
        },
        0
      )
    }, []);

    const houseColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33'];
    //const colorIndex = Math.floor(scrollY / (window.innerHeight / houseColors.length));
    */

  const [scrollY, setScrollY] = useState(0);

  // Create a function to handle scroll events
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return (
      <div id='home-container'>
        <div id='left-content'>
          <div className="text-section">
            <h3>Welcome to Inspire My Space</h3>
            <p>Inspire My Space is a revolutionary interior design application designed to elevate your decision-making process when it comes to transforming your living spaces!</p>
              <Link to={`/explore`}>
                <button>Explore now</button>
              </Link>
          </div>
          <div className="text-section">
            <h3>About us</h3>
            <p>At Inspire My Space, we are passionate about transforming the way you envision and create your living spaces. With our visually engaging platform, we provide the inspiration and tools you need to bring your design visions to life. Join us on a journey where creativity meets functionality, and let Inspire My Space elevate your interior design experience.</p>
          </div>
          <div className="text-section">
            <h3>Demo</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia aspernatur eaque accusamus dicta accusantium 
              ab soluta ullam optio eius.</p>
          </div>
          
      </div>

      <div id="right-content">
        <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
          <House
            scale={0.9}
            boxGeometry={box}
            triGeometry={tri}
            clyGeometry={cyl}
            scrollY={scrollY}
          />
          <Environment />
          <OrbitControls makeDefault enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}
