import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "../Slider/Slider";
import { defaultCameraPositions } from "../../../../constants/";

const Zoom = ({
  zoomLevel,
  selectedView,
  setZoomLevels,
  // setCameraPosition,
}) => {
  const [handlePosition, setHandlePosition] = useState(0);
  const originalZoomDistance =
    defaultCameraPositions[selectedView][selectedView];

  const handleSliderClick = (plusOrMinus) => {
    const newValue = plusOrMinus === "plus" ? zoomLevel + 1 : zoomLevel - 1;

    if (newValue >= 0 && newValue <= originalZoomDistance) {
      setZoomLevels((prev) => ({
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

Zoom.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
  selectedView: PropTypes.string.isRequired,
  setZoomLevels: PropTypes.func.isRequired,
  // setCameraPosition: PropTypes.func.isRequired,
};

export default Zoom;
