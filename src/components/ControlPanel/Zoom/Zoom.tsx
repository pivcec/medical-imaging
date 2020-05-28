import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "../Slider/Slider";
import { defaultCameraPositions } from "../../../constants";
import { Dimensions, DimensionLabels } from "../../../types";

type ZoomProptypes = {
  zoomLevel: number;
  selectedView: DimensionLabels;
  setZoomLevels: (
    newVal: Dimensions | ((oldVal: Dimensions) => Dimensions)
  ) => void;
};

const Zoom = ({
  zoomLevel,
  selectedView,
  setZoomLevels,
}: // setCameraPosition,
ZoomProptypes) => {
  const [handlePosition, setHandlePosition] = useState(0);
  const originalZoomDistance =
    defaultCameraPositions[selectedView][selectedView];

  const handleSliderClick = (plusOrMinus: string) => {
    const newValue = plusOrMinus === "plus" ? zoomLevel + 1 : zoomLevel - 1;

    if (newValue >= 0 && newValue <= originalZoomDistance) {
      setZoomLevels((prev: Dimensions) => ({
        ...prev,
        [selectedView]: newValue,
      }));
    }
  };

  useEffect(() => {
    setZoomLevels((prev) => ({
      ...prev,
      [selectedView]: handlePosition,
    }));
  }, [handlePosition]);

  /*
  useEffect(() => {
    const newZoomDistance = originalZoomDistance - zoomLevel;
    setCameraPosition((prev) => ({
      ...prev,
      [selectedView]: newZoomDistance,
    }));
  }, [zoomLevel]);
  */

  return (
    <Slider
      title={"Zoom"}
      setHandlePosition={setHandlePosition}
      maxHandlePosition={originalZoomDistance}
      handlePosition={zoomLevel}
      handleClick={handleSliderClick}
    />
  );
};

export default Zoom;
