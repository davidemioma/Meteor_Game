import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

export type Result = {
  tilt: number;
  degree: number;
  isDetected: boolean;
};

type Props = {
  setHandResult: (result: Result) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const initVideo = async (videoElement: HTMLVideoElement) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoElement.srcObject = stream;

  videoElement.addEventListener("loadeddata", () => {
    videoElement.play();
  });
};

const initModel = async () => {
  const wasm = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
  );

  const handLandmarker = HandLandmarker.createFromOptions(wasm, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    numHands: 2,
    runningMode: "VIDEO",
  });

  return handLandmarker;
};

const processDetections = (
  detections: HandLandmarkerResult,
  setHandResult: (result: Result) => void,
) => {
  if (detections && detections.handedness.length > 1) {
    // Note 0 is left hand and 1 is right hand but it might change so
    const rightIndex =
      detections.handedness[0][0].categoryName === "Right" ? 0 : 1;

    const leftIndex = rightIndex === 0 ? 1 : 0;

    const { x: leftX, y: leftY } = detections.landmarks[leftIndex][6];

    const { x: rightX, y: rightY } = detections.landmarks[rightIndex][6];

    const tilt = (rightY - leftY) / (rightX - leftX);

    const degree = (Math.atan(tilt) * 180) / Math.PI;

    setHandResult({ tilt, degree, isDetected: true });
  } else {
    setHandResult({ tilt: 0, degree: 0, isDetected: false });
  }
};

const HandRecogniser = ({ setHandResult, setIsLoading }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  let detectionInterval: any;

  const initVideoAndModel = async () => {
    setIsLoading(true);

    const videoElement = videoRef.current;

    if (!videoElement) return;

    await initVideo(videoElement);

    const handLandmarker = await initModel();

    detectionInterval = setInterval(() => {
      const detections = handLandmarker.detectForVideo(
        videoElement,
        Date.now(),
      );

      processDetections(detections, setHandResult);
    }, 1000 / 30);

    setIsLoading(false);
  };

  useEffect(() => {
    initVideoAndModel();

    () => {
      clearInterval(detectionInterval);
    };
  }, []);

  return (
    <div>
      <video
        className="-scale-x-1 rounded-lg border-2 border-violet-500"
        ref={videoRef}
      />
    </div>
  );
};

export default HandRecogniser;
