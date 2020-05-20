import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "../Slider/Slider";

const PlanePosition = ({
  setPlanePositions,
  selectedOrientation,
  orientationMaxIndex,
  planePosition,
}) => {
  const [handlePosition, setHandlePosition] = useState(0);

  const handleSliderClick = (plusOrMinus) => {
    const newValue =
      plusOrMinus === "plus" ? planePosition + 1 : planePosition - 1;

    if (newValue >= 0 && newValue <= orientationMaxIndex) {
      setPlanePositions((prev) => ({
        ...prev,
        [selectedOrientation]: newValue,
      }));
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

PlanePosition.propTypes = {
  planePosition: PropTypes.number.isRequired,
  selectedOrientation: PropTypes.string.isRequired,
  setPlanePositions: PropTypes.func.isRequired,
  orientationMaxIndex: PropTypes.number,
};

export default PlanePosition;
