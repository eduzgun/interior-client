import React from "react";
import "@lottiefiles/lottie-player";

const LottiePlayer = ({
  src,
  background,
  speed,
  style,
  loop,
  autoplay,
  direction,
  mode,
}) => {
  return (
    <lottie-player
      src={src}
      background={background}
      speed={speed}
      style={style}
      loop={loop}
      autoplay={autoplay}
      direction={direction}
      mode={mode}
    ></lottie-player>
  );
};

export default LottiePlayer;
