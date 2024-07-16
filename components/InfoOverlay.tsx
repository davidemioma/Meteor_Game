import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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

      {!isLoading && !isDetected && (
        <div className="animate-ping text-2xl font-extrabold">P A U S E D</div>
      )}

      <div className="fixed right-6 top-6 z-30 rounded-lg bg-violet-400 px-4 py-2 font-bold text-white">{`Distance: ${distance}`}</div>
    </div>
  );
};

export default InfoOverlay;
