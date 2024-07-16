import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, RocketIcon } from "lucide-react";
import Socials from "./Socials";

type Props = {
  isLoading: boolean;
  isDetected: boolean;
  isColliding: boolean;
  distance: number;
  livesRemainingState: number;
  isGameOver: boolean;
};

const InfoOverlay = ({
  isLoading,
  isDetected,
  isColliding,
  distance,
  livesRemainingState,
  isGameOver,
}: Props) => {
  return (
    <div
      className={cn(
        "absolute z-30 flex h-screen w-screen items-center justify-center",
        isColliding && "border-[20px] border-red-500",
      )}
    >
      {isLoading && <Loader2 size={80} className="animate-spin" />}

      {!isLoading && !isDetected && !isGameOver && (
        <div className="animate-ping text-2xl font-extrabold">P A U S E D</div>
      )}

      {isGameOver && (
        <div className="animate-ping text-center text-2xl font-extrabold">
          GAME OVER. <br />
          REFRESH THE PAGE
        </div>
      )}

      {/* Small Devices */}
      <div className="fixed bottom-2 right-6 z-30 flex items-center gap-4 sm:hidden">
        <div className="rounded-lg bg-violet-400 px-4 py-2 font-bold text-white">{`Distance: ${distance}`}</div>

        <div className="flex gap-1">
          {new Array(livesRemainingState).fill("").map((_, i) => (
            <RocketIcon key={i} size={20} className="fill-red-500" />
          ))}
        </div>

        <Socials />
      </div>

      {/* Large Devices */}
      <div className="fixed right-6 top-6 z-30 hidden items-center gap-4 sm:flex">
        <div className="rounded-lg bg-violet-400 px-4 py-2 font-bold text-white">{`Distance: ${distance}`}</div>

        <div className="flex gap-1">
          {new Array(livesRemainingState).fill("").map((_, i) => (
            <RocketIcon key={i} size={20} className="fill-red-500" />
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 hidden sm:flex">
        <Socials />
      </div>
    </div>
  );
};

export default InfoOverlay;
