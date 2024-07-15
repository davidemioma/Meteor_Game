import React from "react";
import { RocketIcon } from "lucide-react";

type Props = {
  degree: number;
};

const Rocket = ({ degree }: Props) => {
  return (
    <div className="rocket-shadow">
      <RocketIcon
        style={{
          transform: `rotate(${-45 - degree / 3}deg)`,
          transition: "all",
          animationDuration: "10ms",
        }}
        className="h-8 w-8 fill-red-600"
      />
    </div>
  );
};

export default Rocket;
