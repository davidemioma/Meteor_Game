import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  isDetected?: boolean;
  rocket: any;
  collisonHandler: () => void;
  when: any;
};

const Boulder = ({ isDetected, rocket, collisonHandler, when }: Props) => {
  const boulderRef = useRef(null);

  const [xState, setXState] = useState(0);

  const [yState, setYState] = useState(0);

  const [rotation, setRotation] = useState(0);

  const detectCollision = () => {
    if (!boulderRef.current) return;

    const boulder = (boulderRef.current as any).getBoundingClientRect();

    const didCollide =
      boulder.left + 30 < rocket.right &&
      boulder.right - 30 > rocket.left &&
      boulder.bottom - 30 > rocket.top &&
      boulder.top + 30 < rocket.bottom;

    if (didCollide) {
      collisonHandler();
    }
  };

  useEffect(() => {
    setXState(Math.random() * (window.innerWidth - 80));

    setYState(-Math.random() * 100 - 100);

    setRotation(Math.random() * 360);
  }, []);

  useEffect(() => {
    detectCollision();
  }, [when]);

  return (
    <div
      className="boulder-shadow animate-move-down"
      ref={boulderRef}
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
