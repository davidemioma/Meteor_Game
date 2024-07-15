import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  isDetected?: boolean;
};

const Boulder = ({ isDetected }: Props) => {
  const [xState, setXState] = useState(0);

  const [yState, setYState] = useState(0);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setXState(Math.random() * (window.innerWidth - 80));

    setYState(-Math.random() * 100 - 100);

    setRotation(Math.random() * 360);
  }, []);

  return (
    <div
      className="animate-move-down boulder-shadow"
      style={{
        position: "absolute",
        top: yState,
        left: xState,
        animationPlayState: isDetected ? "running" : "paused",
      }}
    >
      <Image
        style={{
          rotate: `${rotation}deg`,
        }}
        src="/met.png"
        width={80}
        height={80}
        alt="boulder-img"
      />
    </div>
  );
};

export default Boulder;
