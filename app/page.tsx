"use client";

import React, { useEffect, useState } from "react";
import Rocket from "@/components/Rocket";
import HandRecogniser, { Result } from "@/components/HandRecogniser";

const Home = () => {
  const [degree, setDegree] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [isDetected, setIsDetected] = useState(false);

  const [rocketPosition, setRocketPosition] = useState(0);

  const setHandResult = ({ tilt, degree, isDetected }: Result) => {
    setIsDetected(isDetected);

    setDegree(degree);

    if (degree && degree !== 0) {
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
  };

  useEffect(() => {
    setRocketPosition(window.innerWidth / 2);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 sm:p-10 lg:p-24">
      <div className="absolute left-3 top-3 z-30 w-32">
        <HandRecogniser
          setHandResult={setHandResult}
          setIsLoading={setIsLoading}
        />
      </div>

      <div
        id="rocket-container"
        style={{
          position: "absolute",
          left: rocketPosition,
          transition: "all",
          animationDuration: "10ms",
        }}
      >
        <Rocket degree={degree} />
      </div>
    </main>
  );
};

export default Home;
