import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { Rect } from "react-konva";
import {
  orientationKeys,
  sliderWidth,
  handleWidth,
} from "../../../../constants/";

let rect;

const Handle = ({
  setHandlePosition,
  axisIndex,
  maxHandlePosition,
  handlePositions,
}) => {
  const [pixelsFromLeft, setPixelsFromLeft] = useState(0);
  const orientationKey = orientationKeys[axisIndex];
  const handlePosition = handlePositions[orientationKey];

  const debouncedSetHandlePosition = useCallback(
    debounce(setHandlePosition, 500),
    []
  );

  const getNewHandlePosition = (newPositionX) => {
    const percentageOfSlider =
      (newPositionX / (sliderWidth - handleWidth)) * 100;
    return Math.round((percentageOfSlider / 100) * maxHandlePosition);
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
    if (!maxHandlePosition) return;

    const percentageOfMax = (handlePosition / maxHandlePosition) * 100;
    const pixelsFromLeft =
      (percentageOfMax / 100) * (sliderWidth - handleWidth);

    setPixelsFromLeft(pixelsFromLeft);
  }, [handlePosition, maxHandlePosition]);

  useEffect(() => {
    animatePosition();
  }, [pixelsFromLeft]);

  const animatePosition = () => {
    rect.to({
      x: pixelsFromLeft,
      duration: 0.2,
    });
  };

  return (
    <Rect
      ref={(node) => {
        rect = node;
      }}
      x={0}
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
  axisIndex: PropTypes.number.isRequired,
  maxHandlePosition: PropTypes.number,
  handlePositions: PropTypes.object.isRequired,
};

export default Handle;
