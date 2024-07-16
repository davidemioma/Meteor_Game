"use client";

import React, { useEffect, useRef, useState } from "react";
import Rocket from "@/components/Rocket";
import Boulder from "@/components/Boulder";
import HandRecogniser, { Result } from "@/components/HandRecogniser";

let isInvincible = false;

const Home = () => {
  const rocketRef = useRef(null);

  const [degree, setDegree] = useState(0);

  const [rocket, setRocket] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const [isDetected, setIsDetected] = useState(false);

  const [rocketPosition, setRocketPosition] = useState(0);

  const [detectCollisionTrigger, setDetectCollisionTrigger] = useState(0);

  const [boulders, setBoulders] = useState<
    { key: string; timestamp: number }[]
  >([]);

  const setHandResult = ({ tilt, degree, isDetected }: Result) => {
    setIsDetected(isDetected);

    setDegree(degree);

    if (degree && degree !== 0) {
      setDetectCollisionTrigger(Math.random());

      setRocketPosition((prev) => {
        const position = prev - degree / 6;

        if (position < 20) {
          return prev;
        }

        if (position > window.innerWidth - 52) {
          return prev;
        }

        return position;
      });
    }

    setRocket((rocketRef.current as any).getBoundingClientRect());
  };

  useEffect(() => {
    setRocketPosition(window.innerWidth / 2);
  }, []);

  useEffect(() => {
    if (!isDetected) return;

    const boulderInterval = setInterval(() => {
      setBoulders((prev) => {
        let newBolder = [...prev];

        for (let i = 0; i < 4; i++) {
          const now = Date.now();

          newBolder = [
            ...newBolder,
            { key: `${now}-${Math.random()}`, timestamp: now },
          ];
        }

        return newBolder;
      });
    }, 1000);

    const removeInterval = setInterval(() => {
      const now = Date.now();

      setBoulders((prev) =>
        prev.filter((boulder) => now - boulder.timestamp < 5000),
      );
    }, 5000);

    return () => {
      clearInterval(boulderInterval);

      clearInterval(removeInterval);
    };
  }, [isDetected]);

  const collisionHandler = () => {
    if (!isInvincible) {
      // After Collision
      console.log("COLLISION...");

      isInvincible = true;

      setTimeout(() => {
        isInvincible = false;
      }, 1500);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 sm:p-10 lg:p-24">
      <div className="absolute left-3 top-3 z-30 w-32">
        <HandRecogniser
          setHandResult={setHandResult}
          setIsLoading={setIsLoading}
        />
      </div>

      <div id="meteor-container" className="absolute z-10 h-screen w-screen">
        {boulders.map((boulder, index) => (
          <Boulder
            key={boulder.key}
            isDetected={isDetected}
            rocket={rocket}
            collisonHandler={collisionHandler}
            when={detectCollisionTrigger}
          />
        ))}
      </div>

      <div
        id="rocket-container"
        ref={rocketRef}
        style={{
          position: "absolute",
          left: rocketPosition,
          transition: "all",
          animationDuration: "10ms",
          marginTop: "500px",
        }}
      >
        <Rocket degree={degree} />
      </div>
    </main>
  );
};

export default Home;
