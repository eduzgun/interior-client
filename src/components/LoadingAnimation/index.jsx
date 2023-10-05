import React from "react";
import LottiePlayer from "../LottiePlayer";

const LoadingAnimation = () => {
  return (
    <>
      <LottiePlayer
        src="https://lottie.host/4cd236dd-5d17-4990-9ecd-232c446cad47/QDzlK9MFgU.json"
        //  background="#FFFFFF"
        speed="1"
        style={{ width: "auto", height: "400px" }}
       opacity='9'
        loop
        autoplay
        direction="1"
        mode="normal"
      />
    </>
  );
};

export default LoadingAnimation;
