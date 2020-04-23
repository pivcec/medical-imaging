import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { Rect } from "react-konva";
import {
  orientationKeys,
  sliderWidth,
  handleWidth,
} from "../../../../../constants/";

const Handle = ({
  setHandlePosition,
  orientation,
  orientationMaxIndex,
  planePositions,
}) => {
  const [pixelsFromLeft, setPixelsFromLeft] = useState(0);
  const orientationKey = orientationKeys[orientation];
  const planePosition = planePositions[orientationKey];

  const debouncedSetHandlePosition = useCallback(
    debounce(setHandlePosition, 500),
    []
  );

  const getNewHandlePosition = (newPositionX) => {
    const percentageOfSlider =
      (newPositionX / (sliderWidth - handleWidth)) * 100;
    return Math.round((percentageOfSlider / 100) * orientationMaxIndex);
  };

  const getNewPixelsFromLeft = (position) => {
    const limit = sliderWidth - handleWidth;

    if (position <= 0) {
      return 0;
    }

    if (position >= limit) {
      return limit;
    }

    return position;
  };

  const dragBoundFunc = (position) => {
    const newPixelsFromLeft = getNewPixelsFromLeft(position.x);
    const newHandlePosition = getNewHandlePosition(newPixelsFromLeft);

    debouncedSetHandlePosition(newHandlePosition);

    return {
      x: newPixelsFromLeft,
      y: 0,
    };
  };

  useEffect(() => {
    if (!orientationMaxIndex) return;

    const percentageOfMax = (planePosition / orientationMaxIndex) * 100;
    const pixelsFromLeft =
      (percentageOfMax / 100) * (sliderWidth - handleWidth);

    setPixelsFromLeft(pixelsFromLeft);
  }, [planePosition, sliderWidth, orientationMaxIndex]);

  return (
    <Rect
      x={pixelsFromLeft}
      y={0}
      draggable={true}
      width={handleWidth}
      height={50}
      dragBoundFunc={dragBoundFunc}
      strokeWidth={1}
      fill={"grey"}
    />
  );
};

Handle.propTypes = {
  setHandlePosition: PropTypes.func.isRequired,
  orientation: PropTypes.number.isRequired,
  orientationMaxIndex: PropTypes.number,
  planePositions: PropTypes.object.isRequired,
};

export default Handle;
