import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import { Dimensions } from "../../../@types/types";

type PlanePositionProps = {
  setPlanePositions: (
    newVal: Dimensions | ((oldVal: Dimensions) => Dimensions)
  ) => void;
  selectedOrientation: string;
  orientationMaxIndex: number;
  planePosition: number;
};

const PlanePosition = ({
  setPlanePositions,
  selectedOrientation,
  orientationMaxIndex,
  planePosition,
}: PlanePositionProps) => {
  const [handlePosition, setHandlePosition] = useState(0);

  const handleSliderClick = (plusOrMinus: string) => {
    const newValue =
      plusOrMinus === "plus" ? planePosition + 1 : planePosition - 1;

    if (orientationMaxIndex) {
      if (newValue >= 0 && newValue <= orientationMaxIndex) {
        setPlanePositions((prev) => ({
          ...prev,
          [selectedOrientation]: newValue,
        }));
      }
    }
  };

  useEffect(() => {
    setPlanePositions((prev) => ({
      ...prev,
      [selectedOrientation]: handlePosition,
    }));
  }, [handlePosition]);

  return (
    <Slider
      title={"Slice"}
      setHandlePosition={setHandlePosition}
      maxHandlePosition={orientationMaxIndex}
      handlePosition={planePosition}
      handleClick={handleSliderClick}
    />
  );
};

export default PlanePosition;
