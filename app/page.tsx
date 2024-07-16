"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Rocket from "@/components/Rocket";
import Boulder from "@/components/Boulder";
import InfoOverlay from "@/components/InfoOverlay";
import HandRecogniser, { Result } from "@/components/HandRecogniser";

let isInvincible = false;

let livesRemaining: number;

const Home = () => {
  const rocketRef = useRef(null);

  const [degree, setDegree] = useState(0);

  const [distance, setDistance] = useState(0);

  const [rocket, setRocket] = useState<any>();

  const [gameOver, setGameOver] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isDetected, setIsDetected] = useState(false);

  const [isColliding, setIsColliding] = useState(false);

  const [rocketPosition, setRocketPosition] = useState(0);

  const [livesRemainingState, setLivesRemainingState] = useState(0);

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

  const collisionHandler = () => {
    if (!isInvincible && !gameOver) {
      // After Collision
      console.log("COLLISION...");

      isInvincible = true;

      setIsColliding(true);

      livesRemaining--;

      setLivesRemainingState(livesRemaining);

      if (livesRemaining < 1) {
        setGameOver(true);
      }

      setTimeout(() => {
        isInvincible = false;

        setIsColliding(false);
      }, 1500);
    }
  };

  useEffect(() => {
    setRocketPosition(window.innerWidth / 2);

    livesRemaining = 4;

    setLivesRemainingState(livesRemaining);
  }, []);

  useEffect(() => {
    if (!isDetected || gameOver) return;

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

    const counter = setInterval(() => {
      setDistance((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(boulderInterval);

      clearInterval(removeInterval);

      clearInterval(counter);
    };
  }, [isDetected, gameOver]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 sm:p-10 lg:p-24">
      <InfoOverlay
        isLoading={isLoading}
        isDetected={isDetected}
        isColliding={isColliding}
        distance={distance}
        livesRemainingState={livesRemainingState}
        isGameOver={gameOver}
      />

      <div
        className={cn(
          "absolute left-3 top-3 z-30 transition-all duration-500",
          isDetected ? "w-32" : "w-64",
        )}
      >
        <HandRecogniser
          setHandResult={setHandResult}
          setIsLoading={setIsLoading}
        />
      </div>

      <div
        id="meteor-container"
        className="absolute z-10 h-screen w-screen overflow-hidden"
      >
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
